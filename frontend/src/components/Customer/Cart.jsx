import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaTimes, FaCheckCircle, FaTag } from 'react-icons/fa';
import { BsFillBagHeartFill } from 'react-icons/bs';
import API from '../../../api';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updatingItem, setUpdatingItem] = useState(null);

    useEffect(() => {
        fetchCart();
    }, []);

    const validCartItems = useMemo(() =>
        cartItems.filter(item => item?.productId?._id), [cartItems]
    );

    useEffect(() => {
        if (validCartItems.length > 0 && selectedItems.length === 0) {
            setSelectedItems(validCartItems.map(item => item.productId._id));
        }
    }, [validCartItems.length]);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/Login');
                return;
            }

            const response = await API.get('/cart');
            setCartItems(response.data.items || []);
        } catch (err) {
            console.error('Fetch cart error:', err);
            if (err.response?.status === 401) {
                navigate('/Login');
            } else {
                setError('Failed to load cart');
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleItemSelection = useCallback((productId) => {
        setSelectedItems(prev =>
            prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
        );
    }, []);

    const toggleSelectAll = useCallback(() => {
        setSelectedItems(selectedItems.length === validCartItems.length ? [] : validCartItems.map(item => item.productId._id));
    }, [selectedItems.length, validCartItems]);

    const updateQuantity = useCallback(async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        setUpdatingItem(productId);
        try {
            await API.put('/cart/update', { productId, quantity: newQuantity });
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item?.productId?._id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (err) {
            console.error('Update quantity error:', err);
            setError('Failed to update quantity');
        } finally {
            setUpdatingItem(null);
        }
    }, []);

    const removeItem = useCallback(async (productId) => {
        setUpdatingItem(productId);
        try {
            await API.delete(`/cart/remove/${productId}`);
            setCartItems(prevItems => prevItems.filter(item => item?.productId?._id !== productId));
            setSelectedItems(prev => prev.filter(id => id !== productId));
        } catch (err) {
            console.error('Remove item error:', err);
            setError('Failed to remove item');
        } finally {
            setUpdatingItem(null);
        }
    }, []);

    const selectedCartItems = useMemo(() =>
        validCartItems.filter(item => selectedItems.includes(item.productId._id)), [validCartItems, selectedItems]
    );

    const subtotal = useMemo(() =>
        selectedCartItems.reduce((total, item) => total + (item.productId.price * item.quantity), 0), [selectedCartItems]
    );

    const tax = useMemo(() => subtotal * 0.18, [subtotal]);
    const total = useMemo(() => subtotal + tax, [subtotal, tax]);

    const savings = useMemo(() =>
        selectedCartItems.reduce((total, item) => {
            const discount = item.productId.originalPrice ? (item.productId.originalPrice - item.productId.price) * item.quantity : 0;
            return total + discount;
        }, 0), [selectedCartItems]
    );

    const handleCheckout = useCallback(() => {
        if (selectedItems.length === 0) {
            setError('Please select at least one item to checkout');
            return;
        }
        localStorage.setItem('selectedCartItems', JSON.stringify(selectedItems));
        navigate('/checkout');
    }, [selectedItems, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500 mx-auto mb-4"></div>
                        <FaShoppingCart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-orange-500" />
                    </div>
                    <p className="text-gray-600 font-medium">Loading your cart...</p>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="text-center max-w-2xl w-full px-4">
                    {/* Professional Shopping Cart SVG Illustration */}
                    <div className="mb-8 sm:mb-10 md:mb-12">
                        <svg
                            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto"
                            viewBox="0 0 280 280"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Background Circle with Gradient */}
                            <defs>
                                <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FFF7ED" />
                                    <stop offset="100%" stopColor="#FEF3C7" />
                                </linearGradient>
                                <linearGradient id="cartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#F97316" />
                                    <stop offset="100%" stopColor="#FB923C" />
                                </linearGradient>
                            </defs>

                            <circle cx="140" cy="140" r="120" fill="url(#bgGradient)" />

                            {/* Shopping Cart Body */}
                            <path
                                d="M80 100 L90 100 L110 180 L200 180 L220 120 L100 120"
                                stroke="url(#cartGradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="white"
                            />

                            {/* Cart Handle */}
                            <path
                                d="M90 100 L85 80 C85 75 88 70 95 70 L105 70"
                                stroke="url(#cartGradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                fill="none"
                            />

                            {/* Cart Grid Lines */}
                            <line x1="120" y1="130" x2="120" y2="170" stroke="#FDBA74" strokeWidth="2" opacity="0.4" />
                            <line x1="140" y1="130" x2="140" y2="170" stroke="#FDBA74" strokeWidth="2" opacity="0.4" />
                            <line x1="160" y1="130" x2="160" y2="170" stroke="#FDBA74" strokeWidth="2" opacity="0.4" />
                            <line x1="180" y1="130" x2="180" y2="170" stroke="#FDBA74" strokeWidth="2" opacity="0.4" />

                            <line x1="110" y1="140" x2="195" y2="140" stroke="#FDBA74" strokeWidth="2" opacity="0.4" />
                            <line x1="110" y1="160" x2="195" y2="160" stroke="#FDBA74" strokeWidth="2" opacity="0.4" />

                            {/* Cart Wheels */}
                            <circle cx="130" cy="195" r="8" fill="white" stroke="#F97316" strokeWidth="3" />
                            <circle cx="130" cy="195" r="3" fill="#F97316" />

                            <circle cx="185" cy="195" r="8" fill="white" stroke="#F97316" strokeWidth="3" />
                            <circle cx="185" cy="195" r="3" fill="#F97316" />

                            {/* Floating Product Icons */}
                            {/* Box 1 */}
                            <g opacity="0.6">
                                <rect x="50" y="60" width="25" height="25" rx="3" fill="#FB923C" stroke="#F97316" strokeWidth="2">
                                    <animateTransform
                                        attributeName="transform"
                                        type="translate"
                                        values="0,0; 0,-10; 0,0"
                                        dur="3s"
                                        repeatCount="indefinite"
                                    />
                                </rect>
                                <line x1="50" y1="72.5" x2="75" y2="72.5" stroke="white" strokeWidth="2" />
                                <line x1="62.5" y1="60" x2="62.5" y2="85" stroke="white" strokeWidth="2" />
                            </g>

                            {/* Box 2 */}
                            <g opacity="0.5">
                                <rect x="210" y="80" width="30" height="30" rx="4" fill="#FDBA74" stroke="#FB923C" strokeWidth="2">
                                    <animateTransform
                                        attributeName="transform"
                                        type="translate"
                                        values="0,0; 0,-15; 0,0"
                                        dur="4s"
                                        repeatCount="indefinite"
                                    />
                                </rect>
                                <path d="M215 95 L235 95 L225 105 Z" fill="white" opacity="0.7" />
                            </g>

                            {/* Box 3 */}
                            <g opacity="0.4">
                                <circle cx="65" cy="160" r="15" fill="#FED7AA" stroke="#FDBA74" strokeWidth="2">
                                    <animateTransform
                                        attributeName="transform"
                                        type="translate"
                                        values="0,0; 0,-12; 0,0"
                                        dur="3.5s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                                <path d="M60 160 L70 160 M65 155 L65 165" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </g>

                            {/* Sparkles */}
                            <g opacity="0.6">
                                <path d="M230 140 L232 145 L237 147 L232 149 L230 154 L228 149 L223 147 L228 145 Z" fill="#F97316">
                                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                                </path>
                            </g>

                            <g opacity="0.5">
                                <path d="M45 120 L47 124 L51 126 L47 128 L45 132 L43 128 L39 126 L43 124 Z" fill="#FB923C">
                                    <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
                                </path>
                            </g>

                            {/* Dashed Circle Around Cart */}
                            <circle
                                cx="140"
                                cy="140"
                                r="100"
                                stroke="#FDBA74"
                                strokeWidth="2"
                                strokeDasharray="8,8"
                                fill="none"
                                opacity="0.3"
                            >
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 140 140"
                                    to="360 140 140"
                                    dur="20s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </svg>
                    </div>

                    {/* Professional Text Content */}
                    <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-8 sm:mb-10 md:mb-12">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent leading-tight px-2">
                            Your Cart is Empty
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto px-4">
                            Looks like you haven't added anything to your cart yet. Start shopping and discover amazing products!
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-lg mx-auto px-4">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base sm:text-lg rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transform"
                        >
                            <FaShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                            Start Shopping
                        </button>

                        <button
                            onClick={() => navigate('/Wishlist')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-white border-2 border-orange-500 text-orange-600 font-bold text-base sm:text-lg rounded-xl hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl"
                        >
                            <BsFillBagHeartFill className="w-4 h-4 sm:w-5 sm:h-5" />
                            View Wishlist
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-6">
            {error && (
                <div className="max-w-7xl mx-auto px-4 mb-4">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
                        <FaTimes className="w-4 h-4 p-0 flex-shrink-0" />
                        <p className="font-medium flex-1">{error}</p>
                        <button onClick={() => setError('')} className="text-red-500 hover:text-red-700">
                            <FaTimes className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-8xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                                <label className="flex items-center gap-4 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.length === validCartItems.length}
                                        onChange={toggleSelectAll}
                                        className="w-6 h-6 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                    />
                                    <span className="text-lg font-semibold text-gray-900">
                                        Select All ({validCartItems.length} items)
                                    </span>
                                </label>
                                {selectedItems.length > 0 && (
                                    <span className="text-base text-orange-600 font-semibold">
                                        {selectedItems.length} selected
                                    </span>
                                )}
                            </div>

                            <div className="space-y-6 pt-6">
                                {validCartItems.map((item) => {
                                    const isSelected = selectedItems.includes(item.productId._id);
                                    return (
                                        <div
                                            key={item.productId._id}
                                            className={`rounded-xl p-6 border-2 transition-all ${isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'
                                                }`}
                                        >
                                            <div className="flex gap-6">
                                                <div className="flex-shrink-0">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggleItemSelection(item.productId._id)}
                                                        className="w-6 h-6 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                                    />
                                                </div>

                                                <div
                                                    className="w-40 h-40 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                                                    onClick={() => navigate(`/product/${item.productId._id}`)}
                                                >
                                                    <img
                                                        src={item.productId.images?.[0] || 'https://via.placeholder.com/150'}
                                                        alt={item.productId.name}
                                                        loading="lazy"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h3
                                                                className="text-xl font-bold text-gray-900 cursor-pointer hover:text-orange-600 transition-colors line-clamp-2"
                                                                onClick={() => navigate(`/product/${item.productId._id}`)}
                                                            >
                                                                {item.productId.name}
                                                            </h3>
                                                            <div className="flex items-center gap-3 pt-3">
                                                                <p className="text-2xl font-bold text-orange-600">
                                                                    ₹{item.productId.price?.toFixed(2) || '0.00'}
                                                                </p>
                                                                {item.productId.originalPrice && (
                                                                    <span className="text-base text-gray-400 line-through">
                                                                        ₹{item.productId.originalPrice.toFixed(2)}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(item.productId._id)}
                                                            disabled={updatingItem === item.productId._id}
                                                            className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                                                        >
                                                            <FaTrash className="w-5 h-5" />
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center justify-between pt-6">
                                                        <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-2">
                                                            <button
                                                                onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                                                                disabled={updatingItem === item.productId._id || item.quantity <= 1}
                                                                className="w-10 h-10 rounded-lg bg-white hover:bg-orange-500 hover:text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                                            >
                                                                <FaMinus className="w-4 h-4" />
                                                            </button>
                                                            <span className="w-16 text-center font-bold text-lg text-gray-900">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                                                                disabled={updatingItem === item.productId._id}
                                                                className="w-10 h-10 rounded-lg bg-white hover:bg-orange-500 hover:text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                                            >
                                                                <FaPlus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-500 font-medium">Subtotal</p>
                                                            <p className="text-2xl font-bold text-gray-900 pt-1">
                                                                ₹{(item.productId.price * item.quantity).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>


                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 lg:sticky lg:top-24">
                            <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                                <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center">
                                    <FaShoppingCart className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
                            </div>

                            {selectedItems.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-base">
                                        No items selected. Please select items to checkout.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4 pt-6">
                                        <div className="flex justify-between text-gray-600 text-base">
                                            <span className="font-medium">Items ({selectedItems.length})</span>
                                            <span className="font-bold text-gray-900">₹{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 text-base">
                                            <span className="font-medium">Tax (GST 18%)</span>
                                            <span className="font-bold text-gray-900">₹{tax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 text-base">
                                            <span className="font-medium">Shipping</span>
                                            <div className="flex items-center gap-2">
                                                <FaCheckCircle className="w-5 h-5 text-green-500" />
                                                <span className="font-bold text-green-600">FREE</span>
                                            </div>
                                        </div>
                                        {savings > 0 && (
                                            <div className="flex justify-between items-center bg-green-50 p-4 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <FaTag className="w-5 h-5 text-green-600" />
                                                    <span className="font-semibold text-green-700 text-base">You Save</span>
                                                </div>
                                                <span className="font-bold text-green-600 text-lg">₹{savings.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="border-t border-gray-200 pt-6 mt-6">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xl font-bold text-gray-900">Total</span>
                                                <span className="text-3xl font-bold text-orange-600">
                                                    ₹{total.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        disabled={selectedItems.length === 0}
                                        className="w-full py-4 bg-orange-500 text-white font-bold text-lg rounded-xl hover:bg-orange-600 transition-all shadow-md hover:shadow-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Proceed to Checkout
                                    </button>

                                    <button
                                        onClick={() => navigate('/')}
                                        className="w-full py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold text-base rounded-xl hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-all mt-4"
                                    >
                                        Continue Shopping
                                    </button>

                                    <div className="pt-6 mt-6 border-t border-gray-200">
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <FaCheckCircle className="w-5 h-5 text-green-500" />
                                            <p>Secure checkout with SSL encryption</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
