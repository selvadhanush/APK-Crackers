import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCreditCard, FaMoneyBillWave, FaLock, FaCheckCircle, FaArrowLeft, FaExclamationCircle, FaShoppingBag } from 'react-icons/fa';
import { MdAccountBalanceWallet, MdLocationOn, MdEdit } from 'react-icons/md';
import { SiVisa, SiMastercard, SiAmericanexpress, SiPaytm, SiGooglepay, SiPhonepe } from 'react-icons/si';
import API from '../../../api';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { shippingAddress } = location.state || {};

    const [selectedMethod, setSelectedMethod] = useState('cod');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });
    const [upiId, setUpiId] = useState('');
    const [selectedWallet, setSelectedWallet] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [orderCreated, setOrderCreated] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [shippingAddressString, setShippingAddressString] = useState('');
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [toast, setToast] = useState({ show: false, type: '', message: '', subMessage: '' });
    const [acceptPolicy, setAcceptPolicy] = useState(false);

    useEffect(() => {
        verifyCartAndPrepareAddress();
    }, []);

    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                setToast({ ...toast, show: false });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast.show]);

    const verifyCartAndPrepareAddress = async () => {
        try {
            const response = await API.get('/cart');
            const items = response.data.items || [];

            if (items.length === 0) {
                alert('Your cart is empty. Please add items before checkout.');
                navigate('/Cart');
                return;
            }

            setCartItems(items);

            if (!shippingAddress) {
                await fetchAddresses();
            } else {
                setShippingAddressString(shippingAddress);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error verifying cart:', error);
            setError('Failed to verify cart. Please try again.');
            setLoading(false);
        }
    };

    const fetchAddresses = async () => {
        try {
            const response = await API.get('/address');
            const userAddresses = response.data || [];
            setAddresses(userAddresses);

            if (userAddresses.length === 0) {
                setError('Please add a delivery address in Settings before placing an order.');
                setLoading(false);
                return;
            }

            const defaultAddr = userAddresses.find(addr => addr.isDefault);
            const addressToUse = defaultAddr || userAddresses[0];
            setSelectedAddressId(addressToUse._id);

            const formattedAddress = `${addressToUse.addressLine}, ${addressToUse.landmark ? addressToUse.landmark + ', ' : ''}${addressToUse.city}, ${addressToUse.state} - ${addressToUse.pincode}. Contact: ${addressToUse.fullname}, ${addressToUse.phone}`;

            setShippingAddressString(formattedAddress);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching addresses:', error);
            setError('Failed to fetch addresses. Please try again.');
            setLoading(false);
        }
    };

    const handleSelectAddress = (address) => {
        setSelectedAddressId(address._id);
        const formattedAddress = `${address.addressLine}, ${address.landmark ? address.landmark + ', ' : ''}${address.city}, ${address.state} - ${address.pincode}. Contact: ${address.fullname}, ${address.phone}`;
        setShippingAddressString(formattedAddress);
        setShowAddressModal(false);
    };

    const createOrder = async (addressString) => {
        if (orderCreated) {
            console.log('Order already created, skipping...');
            return order;
        }

        try {
            setProcessing(true);
            console.log('Creating order with address:', addressString);
            const response = await API.post('/orders/create', {
                shippingAddress: addressString,
                paymentMethod: selectedMethod === 'cod' ? 'cod' : 'online'
            });
            setOrder(response.data.order);
            setOrderCreated(true);
            setError('');
            return response.data.order;
        } catch (error) {
            console.error('Error creating order:', error);
            console.error('Error response:', error.response?.data);
            const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to create order. Please try again.';
            setError(errorMessage);
            throw error;
        } finally {
            setProcessing(false);
        }
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleCardInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'cardNumber') {
            formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
            if (formattedValue.length > 19) return;
        } else if (name === 'expiryDate') {
            formattedValue = value.replace(/\D/g, '');
            if (formattedValue.length >= 2) {
                formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
            }
            if (formattedValue.length > 5) return;
        } else if (name === 'cvv') {
            formattedValue = value.replace(/\D/g, '').slice(0, 3);
        }

        setCardDetails({ ...cardDetails, [name]: formattedValue });
    };

    const handleRazorpayPayment = async () => {
        try {
            setProcessing(true);

            let currentOrder = order;
            if (!orderCreated) {
                currentOrder = await createOrder(shippingAddressString);
            }

            if (!currentOrder) {
                alert('Failed to create order. Please try again.');
                setProcessing(false);
                return;
            }

            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                alert('Failed to load Razorpay. Please check your internet connection.');
                setProcessing(false);
                return;
            }

            const { data } = await API.post('/payment/order', { orderId: currentOrder._id });

            const options = {
                key: data.razorpayKey,
                amount: data.paymentOrder.amount,
                currency: data.paymentOrder.currency,
                name: 'APK Crackers',
                description: 'Order Payment',
                order_id: data.paymentOrder.id,
                handler: async function (response) {
                    try {
                        await API.post('/payment/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: currentOrder._id
                        });

                        setToast({
                            show: true,
                            type: 'success',
                            message: 'Payment Successful!',
                            subMessage: 'Order Confirmed'
                        });

                        setTimeout(() => {
                            navigate('/');
                        }, 2000);
                    } catch (error) {
                        console.error('Payment verification failed:', error);
                        setToast({
                            show: true,
                            type: 'error',
                            message: 'Payment Verification Failed',
                            subMessage: 'Please contact support'
                        });
                    }
                },
                prefill: {
                    name: '',
                    email: '',
                    contact: ''
                },
                theme: {
                    color: '#f97316'
                },
                modal: {
                    ondismiss: async function () {
                        try {
                            await API.post('/payment/failed', { orderId: currentOrder._id });
                        } catch (error) {
                            console.error('Failed to update payment status:', error);
                        }
                        setProcessing(false);
                    }
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error('Payment error:', error);
            alert('Failed to initiate payment. Please try again.');
            setProcessing(false);
        }
    };

    const handleCODPayment = async () => {
        try {
            setProcessing(true);

            let currentOrder = order;
            if (!orderCreated) {
                currentOrder = await createOrder(shippingAddressString);
            }

            if (!currentOrder) {
                setToast({
                    show: true,
                    type: 'error',
                    message: 'Failed to Create Order',
                    subMessage: 'Please try again'
                });
                setProcessing(false);
                return;
            }

            setToast({
                show: true,
                type: 'success',
                message: 'Order Placed Successfully!',
                subMessage: 'Order Confirmed - Pay on Delivery'
            });

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('COD order error:', error);
            setToast({
                show: true,
                type: 'error',
                message: 'Failed to Place Order',
                subMessage: 'Please try again'
            });
            setProcessing(false);
        }
    };

    const handlePayment = () => {
        if (processing || orderCreated) {
            console.log('Payment already in progress or order already created');
            return;
        }

        if (!acceptPolicy) {
            setToast({
                show: true,
                type: 'error',
                message: 'Policy Acceptance Required',
                subMessage: 'Please accept the policies to continue'
            });
            return;
        }

        if (selectedMethod === 'cod') {
            handleCODPayment();
        } else {
            handleRazorpayPayment();
        }
    };

    const calculateTotal = () => {
        if (order) return order.totalAmount || 0;
        if (cartItems.length === 0) return 0;

        return cartItems.reduce((sum, item) => {
            const itemPrice = item.price || item.productId?.price || 0;
            const itemQuantity = item.quantity || 1;
            return sum + (itemPrice * itemQuantity);
        }, 0);
    };

    const subtotal = calculateTotal();
    const shipping = 0;
    const tax = subtotal * 0.18;
    const total = calculateTotal();

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Preparing checkout...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center max-w-md px-6">
                    <FaExclamationCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-800 font-semibold text-lg mb-2">{error}</p>
                    {error && error.includes('address') ? (
                        <>
                            <p className="text-gray-600 mb-6 text-sm">Add a delivery address to continue with your order</p>
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => navigate('/Settings')}
                                    className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all shadow-md"
                                >
                                    Go to Settings
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-orange-500 hover:text-orange-500 transition-all"
                                >
                                    Go to Home
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                        >
                            Go to Home
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {toast.show && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
                    <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border ${toast.type === 'success' ? 'bg-white border-green-500' : 'bg-white border-red-500'
                        }`}>
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                            }`}>
                            {toast.type === 'success' ? (
                                <FaCheckCircle className="w-5 h-5 text-white" />
                            ) : (
                                <FaExclamationCircle className="w-5 h-5 text-white" />
                            )}
                        </div>
                        <div className="flex-1">
                            <p className={`font-bold text-sm ${toast.type === 'success' ? 'text-green-900' : 'text-red-900'}`}>
                                {toast.message}
                            </p>
                            <p className={`text-xs mt-0.5 ${toast.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                                {toast.subMessage}
                            </p>
                        </div>
                        <button
                            onClick={() => setToast({ ...toast, show: false })}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <span className="text-2xl">×</span>
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="px-8 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium transition-colors"
                        >
                            <FaArrowLeft className="w-4 h-4" />
                            Back to Cart
                        </button>
                        <div className="flex items-center gap-2">
                            <FaLock className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-semibold text-gray-700">Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Order</h1>
                        <p className="text-gray-600 mb-6">Review your items and choose your payment method</p>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b border-orange-200">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                        <FaShoppingBag className="w-4 h-4 text-white" />
                                    </div>
                                    Order Items ({(order?.items?.length || cartItems.length)})
                                </h2>
                            </div>

                            <div className="p-6 space-y-4">
                                {(order?.items || cartItems)?.map((item, index) => (
                                    <div key={index} className="flex gap-5 p-5 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all">
                                        <div className="w-24 h-24 bg-gray-50 rounded-xl border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                                            {item.productId?.images?.[0] || item.images?.[0] ? (
                                                <img
                                                    src={item.productId?.images?.[0] || item.images?.[0]}
                                                    alt={item.productId?.name || item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-3xl">🎆</div>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 text-base mb-1">
                                                {item.productId?.name || item.name || `Product #${index + 1}`}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-3">
                                                {item.productId?.category || item.category || 'Crackers'}
                                            </p>
                                            <div className="flex items-center gap-5">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-xs text-gray-500">Qty:</span>
                                                    <span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">{item.quantity}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-xs text-gray-500">Price:</span>
                                                    <span className="font-bold text-gray-900">₹{(item.price || item.productId?.price || 0).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 mb-1.5">Subtotal</p>
                                            <p className="text-xl font-bold text-orange-600">
                                                ₹{((item.price || item.productId?.price || 0) * (item.quantity || 1)).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <MdLocationOn className="w-4 h-4 text-white" />
                                    </div>
                                    Delivery Address
                                </h2>
                            </div>

                            <div className="p-6">
                                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
                                    <p className="text-gray-800 leading-relaxed">
                                        {shippingAddressString || shippingAddress || 'No address provided'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowAddressModal(true)}
                                    className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold flex items-center gap-2 rounded-lg transition-colors"
                                >
                                    <MdEdit className="w-4 h-4" />
                                    Change Address
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-purple-200">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                        <FaCreditCard className="w-4 h-4 text-white" />
                                    </div>
                                    Payment Method
                                </h2>
                            </div>

                            <div className="p-6 space-y-4">
                                <div
                                    onClick={() => setSelectedMethod('cod')}
                                    className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${selectedMethod === 'cod' ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-gray-200 hover:border-orange-200 hover:shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'cod' ? 'border-orange-500' : 'border-gray-300'
                                                }`}>
                                                {selectedMethod === 'cod' && (
                                                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                                )}
                                            </div>
                                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <FaMoneyBillWave className="w-5 h-5 text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">Cash on Delivery</p>
                                                <p className="text-sm text-gray-600">Pay when you receive your order</p>
                                            </div>
                                        </div>
                                        {selectedMethod === 'cod' && (
                                            <FaCheckCircle className="w-5 h-5 text-orange-500" />
                                        )}
                                    </div>
                                </div>

                                <div
                                    onClick={() => setSelectedMethod('online')}
                                    className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${selectedMethod === 'online' ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-gray-200 hover:border-orange-200 hover:shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'online' ? 'border-orange-500' : 'border-gray-300'
                                                }`}>
                                                {selectedMethod === 'online' && (
                                                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                                )}
                                            </div>
                                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <MdAccountBalanceWallet className="w-5 h-5 text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">UPI / Wallets / Cards</p>
                                                <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm, Cards</p>
                                            </div>
                                        </div>
                                        {selectedMethod === 'online' && (
                                            <FaCheckCircle className="w-5 h-5 text-orange-500" />
                                        )}
                                    </div>

                                    {selectedMethod === 'online' && (
                                        <div className="mt-3 pt-3 border-t border-gray-200">
                                            <div className="flex items-center gap-2 flex-wrap mb-2">
                                                <SiGooglepay className="w-8 h-8 text-blue-600" />
                                                <SiPhonepe className="w-8 h-8 text-purple-600" />
                                                <SiPaytm className="w-8 h-8 text-blue-700" />
                                                <SiVisa className="w-8 h-8 text-blue-600" />
                                                <SiMastercard className="w-8 h-8 text-red-600" />
                                                <SiAmericanexpress className="w-8 h-8 text-blue-500" />
                                            </div>
                                            <p className="text-xs text-gray-600">
                                                You'll be redirected to secure payment gateway
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm lg:sticky lg:top-24">
                            <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                        <FaShoppingBag className="w-4 h-4 text-white" />
                                    </div>
                                    Order Summary
                                </h2>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="space-y-3 pb-4 border-b border-gray-200">
                                    <div className="flex justify-between text-gray-700 text-sm">
                                        <span>Subtotal ({(order?.items?.length || cartItems.length)} items)</span>
                                        <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700 text-sm">
                                        <span>Shipping</span>
                                        <span className="font-semibold text-green-600">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700 text-sm">
                                        <span>Tax (Included)</span>
                                        <span className="font-semibold">Included</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                                    <span className="text-2xl font-bold text-orange-600">₹{total.toFixed(2)}</span>
                                </div>

                                <div className="pb-4 border-b border-gray-200">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={acceptPolicy}
                                            onChange={(e) => setAcceptPolicy(e.target.checked)}
                                            className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 mt-0.5"
                                        />
                                        <span className="text-sm text-gray-600">
                                            I agree to the{' '}
                                            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-500 underline">Privacy Policy</a>
                                            {' and '}
                                            <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-500 underline">Terms & Conditions</a>
                                        </span>
                                    </label>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={processing}
                                    className={`w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${processing ? 'opacity-50 cursor-not-allowed' : 'hover:from-orange-600 hover:to-orange-700 transform hover:scale-[1.02]'
                                        }`}
                                >
                                    {processing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <FaLock className="w-4 h-4" />
                                            Complete Payment
                                        </>
                                    )}
                                </button>

                                <div className="pt-4 space-y-2 border-t border-gray-200">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <FaCheckCircle className="w-4 h-4 text-green-600" />
                                        <span>100% Secure Payment</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <FaCheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Easy Returns & Refunds</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <FaCheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Free Shipping on All Orders</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showAddressModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Select Delivery Address</h2>
                            <button
                                onClick={() => setShowAddressModal(false)}
                                className="text-gray-600 hover:text-gray-800 text-3xl font-bold w-8 h-8 flex items-center justify-center"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {addresses.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-600 mb-4">No addresses found</p>
                                    <button
                                        onClick={() => navigate('/Settings')}
                                        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
                                    >
                                        Add Address in Settings
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {addresses.map((address) => (
                                        <div
                                            key={address._id}
                                            onClick={() => handleSelectAddress(address)}
                                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedAddressId === address._id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="font-bold text-gray-900">{address.fullname}</h3>
                                                        {address.isDefault && (
                                                            <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded">Default</span>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-700 mb-1 text-sm">{address.addressLine}</p>
                                                    {address.landmark && (
                                                        <p className="text-gray-600 text-sm mb-1">Landmark: {address.landmark}</p>
                                                    )}
                                                    <p className="text-gray-700 mb-1 text-sm">
                                                        {address.city}, {address.state} - {address.pincode}
                                                    </p>
                                                    <p className="text-gray-600 text-sm">Phone: {address.phone}</p>
                                                </div>
                                                {selectedAddressId === address._id && (
                                                    <FaCheckCircle className="w-6 h-6 text-orange-500" />
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => navigate('/Settings')}
                                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-all font-semibold"
                                    >
                                        + Add New Address
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;
