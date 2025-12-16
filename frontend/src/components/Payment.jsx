import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCreditCard, FaMoneyBillWave, FaLock, FaCheckCircle, FaArrowLeft, FaExclamationCircle } from 'react-icons/fa';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { SiVisa, SiMastercard, SiAmericanexpress, SiPaytm, SiGooglepay, SiPhonepe } from 'react-icons/si';
import API from '../../api';

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

    useEffect(() => {
        if (!shippingAddress) {
            // Redirect to checkout if no address is provided
            navigate('/checkout');
            return;
        }
        createOrder();
    }, [shippingAddress, navigate]);

    const createOrder = async () => {
        try {
            setLoading(true);
            const response = await API.post('/orders/create', { shippingAddress });
            setOrder(response.data.order);
            setError('');
        } catch (error) {
            console.error('Error creating order:', error);
            setError(error.response?.data?.message || 'Failed to create order. Please try again.');
        } finally {
            setLoading(false);
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

            // Load Razorpay script
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                alert('Failed to load Razorpay. Please check your internet connection.');
                setProcessing(false);
                return;
            }

            // Create Razorpay order
            const { data } = await API.post('/payment/create', { orderId: order._id });

            const options = {
                key: data.razorpayKey,
                amount: data.paymentOrder.amount,
                currency: data.paymentOrder.currency,
                name: 'APK Crackers',
                description: 'Order Payment',
                order_id: data.paymentOrder.id,
                handler: async function (response) {
                    try {
                        // Verify payment
                        await API.post('/payment/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: order._id
                        });

                        alert('Payment successful!');
                        navigate('/');
                    } catch (error) {
                        console.error('Payment verification failed:', error);
                        alert('Payment verification failed. Please contact support.');
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
                            await API.post('/payment/failed', { orderId: order._id });
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
            // For COD, order is already created with status "pending_payment"
            // Just navigate to success page
            alert('Order placed successfully! You can pay on delivery.');
            navigate('/');
        } catch (error) {
            console.error('COD order error:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    const handlePayment = () => {
        if (selectedMethod === 'cod') {
            handleCODPayment();
        } else {
            handleRazorpayPayment();
        }
    };

    // Calculate totals from order
    const subtotal = order ? order.totalAmount : 0;
    const shipping = 0; // Free shipping
    const tax = subtotal * 0.18; // 18% GST (already included in totalAmount)
    const total = order ? order.totalAmount : 0;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Creating your order...</p>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <FaExclamationCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">{error || 'No order found'}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back Button Bar */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-screen-2xl mx-auto px-6 py-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium"
                    >
                        <FaArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    {/* Left - Payment Methods (2 columns) */}
                    <div className="lg:col-span-2 bg-gray-50 p-6 space-y-6">
                        {/* Header */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <FaLock className="w-5 h-5 text-green-600" />
                                <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
                            </div>
                            <p className="text-sm text-gray-600">Choose your preferred payment method</p>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h2>

                            <div className="space-y-3">
                                {/* Cash on Delivery */}
                                <div
                                    onClick={() => setSelectedMethod('cod')}
                                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedMethod === 'cod'
                                        ? 'border-orange-500 bg-orange-50'
                                        : 'border-gray-200 hover:border-gray-300'
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
                                            <FaMoneyBillWave className="w-6 h-6 text-green-600" />
                                            <div>
                                                <p className="font-bold text-gray-900">Cash on Delivery</p>
                                                <p className="text-sm text-gray-600">Pay when you receive</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Online Payment (UPI/Wallets) */}
                                <div
                                    onClick={() => setSelectedMethod('online')}
                                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedMethod === 'online'
                                        ? 'border-orange-500 bg-orange-50'
                                        : 'border-gray-200 hover:border-gray-300'
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
                                            <MdAccountBalanceWallet className="w-6 h-6 text-blue-600" />
                                            <div>
                                                <p className="font-bold text-gray-900">UPI / Wallets</p>
                                                <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</p>
                                            </div>
                                        </div>
                                    </div>

                                    {selectedMethod === 'online' && (
                                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                                            {/* Wallet Options */}
                                            <div>
                                                <p className="text-sm font-semibold text-gray-700 mb-3">Select Wallet</p>
                                                <div className="grid grid-cols-3 gap-3">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedWallet('googlepay');
                                                        }}
                                                        className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${selectedWallet === 'googlepay'
                                                            ? 'border-orange-500 bg-orange-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        <SiGooglepay className="w-8 h-8 text-blue-600" />
                                                        <span className="text-xs font-semibold">Google Pay</span>
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedWallet('phonepe');
                                                        }}
                                                        className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${selectedWallet === 'phonepe'
                                                            ? 'border-orange-500 bg-orange-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        <SiPhonepe className="w-8 h-8 text-purple-600" />
                                                        <span className="text-xs font-semibold">PhonePe</span>
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedWallet('paytm');
                                                        }}
                                                        className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${selectedWallet === 'paytm'
                                                            ? 'border-orange-500 bg-orange-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        <SiPaytm className="w-8 h-8 text-blue-700" />
                                                        <span className="text-xs font-semibold">Paytm</span>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* UPI ID Input */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Enter UPI ID
                                                </label>
                                                <input
                                                    type="text"
                                                    value={upiId}
                                                    onChange={(e) => setUpiId(e.target.value)}
                                                    placeholder="yourname@upi"
                                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Credit/Debit Card */}
                                <div
                                    onClick={() => setSelectedMethod('card')}
                                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedMethod === 'card'
                                        ? 'border-orange-500 bg-orange-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'card' ? 'border-orange-500' : 'border-gray-300'
                                                }`}>
                                                {selectedMethod === 'card' && (
                                                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                                )}
                                            </div>
                                            <FaCreditCard className="w-6 h-6 text-purple-600" />
                                            <div>
                                                <p className="font-bold text-gray-900">Credit / Debit Card</p>
                                                <p className="text-sm text-gray-600">Visa, Mastercard, Amex</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <SiVisa className="w-8 h-8 text-blue-600" />
                                            <SiMastercard className="w-8 h-8 text-red-600" />
                                            <SiAmericanexpress className="w-8 h-8 text-blue-500" />
                                        </div>
                                    </div>

                                    {selectedMethod === 'card' && (
                                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                                            {/* Card Number */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Card Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    value={cardDetails.cardNumber}
                                                    onChange={handleCardInputChange}
                                                    placeholder="1234 5678 9012 3456"
                                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none font-mono"
                                                />
                                            </div>

                                            {/* Cardholder Name */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Cardholder Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardName"
                                                    value={cardDetails.cardName}
                                                    onChange={handleCardInputChange}
                                                    placeholder="JOHN DOE"
                                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none uppercase"
                                                />
                                            </div>

                                            {/* Expiry & CVV */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Expiry Date
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="expiryDate"
                                                        value={cardDetails.expiryDate}
                                                        onChange={handleCardInputChange}
                                                        placeholder="MM/YY"
                                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none font-mono"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        CVV
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="cvv"
                                                        value={cardDetails.cvv}
                                                        onChange={handleCardInputChange}
                                                        placeholder="123"
                                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none font-mono"
                                                    />
                                                </div>
                                            </div>

                                            {/* Save Card Option */}
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id="saveCard"
                                                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                                                />
                                                <label htmlFor="saveCard" className="text-sm text-gray-700">
                                                    Save this card for future purchases
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Security Badge */}
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <FaLock className="w-5 h-5 text-green-600" />
                                <div>
                                    <p className="font-semibold text-green-900">Secure Payment</p>
                                    <p className="text-sm text-green-700">Your payment information is encrypted and secure</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Order Summary (1 column) */}
                    <div className="lg:col-span-1 bg-white border-l border-gray-200">
                        <div className="p-6 sticky top-0">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                            {/* Order Items */}
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <p className="text-sm text-gray-600 mb-3">{order.items?.length || 0} item(s) in your order</p>
                                <div className="space-y-3">
                                    {order.items?.map((item, index) => (
                                        <div key={index} className="flex gap-3 text-sm">
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">Product #{index + 1}</p>
                                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                            </div>
                                            <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold text-gray-900">₹{total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax (Included)</span>
                                    <span className="font-semibold text-gray-900">Included</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-2xl font-bold text-orange-600">₹{total.toFixed(2)}</span>
                            </div>

                            {/* Pay Button */}
                            <button
                                onClick={handlePayment}
                                disabled={processing}
                                className={`w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 flex items-center justify-center gap-2 ${processing ? 'opacity-50 cursor-not-allowed' : 'hover:from-orange-600 hover:to-orange-700'
                                    }`}
                            >
                                {processing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <FaCheckCircle className="w-5 h-5" />
                                        Complete Payment
                                    </>
                                )}
                            </button>

                            {/* Trust Indicators */}
                            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
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
                                    <span>Free Shipping</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
