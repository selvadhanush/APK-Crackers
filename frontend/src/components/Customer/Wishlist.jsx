import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaArrowLeft, FaHeartBroken, FaTimes, FaCheckCircle, FaTag } from 'react-icons/fa';
import { BsFillBagHeartFill } from 'react-icons/bs';
import API from '../../../api';

const Wishlist = () => {
    const navigate = useNavigate();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [removingItem, setRemovingItem] = useState(null);
    const [addingToCart, setAddingToCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchWishlist();
        fetchCart();
    }, []);

    const fetchWishlist = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/Login');
                return;
            }

            setLoading(true);
            const response = await API.get('/wishlist');
            setWishlistItems(Array.isArray(response.data) ? response.data : []);
            setError('');
        } catch (err) {
            console.error('Fetch wishlist error:', err);
            if (err.response?.status === 401) {
                navigate('/Login');
            } else {
                setError('Failed to load wishlist');
            }
        } finally {
            setLoading(false);
        }
    };

    // Memoize valid wishlist items to avoid recalculating on every render
    const validWishlistItems = useMemo(() => {
        return wishlistItems.filter(item => item && item.productId && item.productId._id);
    }, [wishlistItems]);

    const removeFromWishlist = useCallback(async (productId) => {
        setRemovingItem(productId);
        try {
            await API.delete(`/wishlist/remove/${productId}`);
            setWishlistItems(prevItems => prevItems.filter(item => item && item.productId && item.productId._id !== productId));
        } catch (err) {
            console.error('Remove from wishlist error:', err);
            setError(err.response?.data?.message || 'Failed to remove from wishlist');
        } finally {
            setRemovingItem(null);
        }
    }, []);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await API.get('/cart');
            setCartItems(response.data.items || []);
        } catch (err) {
            console.error('Error fetching cart:', err);
        }
    };

    const addToCart = useCallback(async (product) => {
        // Check if product is already in cart
        const isInCart = cartItems.some(item =>
            (item.productId?._id || item.productId) === product._id
        );

        if (isInCart) {
            navigate('/Cart');
            return;
        }

        setAddingToCart(product._id);
        try {
            await API.post('/cart/add', {
                productId: product._id,
                quantity: 1
            });
            setError('');
            fetchCart(); // Refresh cart items
        } catch (err) {
            console.error('Add to cart error:', err);
            setError(err.response?.data?.message || 'Failed to add to cart');
        } finally {
            setAddingToCart(null);
        }
    }, [cartItems, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-orange-500 mx-auto mb-6"></div>
                        <BsFillBagHeartFill className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-orange-500" />
                    </div>
                    <p className="text-gray-700 font-semibold text-lg">Loading your wishlist...</p>
                </div>
            </div>
        );
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="text-center max-w-lg w-full">
                    {/* Professional SVG Illustration */}
                    <div className="mb-12">
                        <svg
                            className="w-80 h-80 mx-auto"
                            viewBox="0 0 240 240"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Background Circle */}
                            <circle cx="120" cy="120" r="100" fill="#FFF7ED" />

                            {/* Clipboard/List Icon */}
                            <rect x="70" y="60" width="100" height="120" rx="8" fill="white" stroke="#FB923C" strokeWidth="3" />

                            {/* Clipboard Top */}
                            <rect x="95" y="50" width="50" height="20" rx="4" fill="#F97316" />
                            <rect x="100" y="55" width="40" height="10" rx="2" fill="white" />

                            {/* List Items - Checkboxes with lines */}
                            <rect x="85" y="85" width="12" height="12" rx="2" stroke="#FB923C" strokeWidth="2" fill="white" />
                            <line x1="105" y1="91" x2="145" y2="91" stroke="#FDBA74" strokeWidth="2.5" strokeLinecap="round" />

                            <rect x="85" y="110" width="12" height="12" rx="2" stroke="#FB923C" strokeWidth="2" fill="white" />
                            <line x1="105" y1="116" x2="145" y2="116" stroke="#FDBA74" strokeWidth="2.5" strokeLinecap="round" />

                            <rect x="85" y="135" width="12" height="12" rx="2" stroke="#FB923C" strokeWidth="2" fill="white" />
                            <line x1="105" y1="141" x2="145" y2="141" stroke="#FDBA74" strokeWidth="2.5" strokeLinecap="round" />

                            {/* Dashed lines indicating empty */}
                            <line x1="105" y1="160" x2="145" y2="160" stroke="#FB923C" strokeWidth="2" strokeDasharray="4,4" opacity="0.4">
                                <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1.5s" repeatCount="indefinite" />
                            </line>

                            {/* Bookmark ribbon */}
                            <path d="M155 60 L155 100 L145 90 L135 100 L135 60 Z" fill="#F97316" opacity="0.8" />

                            {/* Floating Stars/Sparkles */}
                            <circle cx="50" cy="80" r="4" fill="#FDBA74" opacity="0.5">
                                <animate attributeName="cy" values="80;70;80" dur="3s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="190" cy="100" r="5" fill="#FB923C" opacity="0.4">
                                <animate attributeName="cy" values="100;90;100" dur="2.5s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="60" cy="150" r="6" fill="#FED7AA" opacity="0.4">
                                <animate attributeName="cy" values="150;140;150" dur="3.5s" repeatCount="indefinite" />
                            </circle>

                            {/* Small plus icons */}
                            <g opacity="0.5">
                                <line x1="180" y1="140" x2="180" y2="150" stroke="#FB923C" strokeWidth="2" strokeLinecap="round">
                                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
                                </line>
                                <line x1="175" y1="145" x2="185" y2="145" stroke="#FB923C" strokeWidth="2" strokeLinecap="round">
                                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
                                </line>
                            </g>
                        </svg>
                    </div>

                    {/* Professional Text Content */}
                    <div className="space-y-4 mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                            Your Wishlist is Empty
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto">
                            Save your favorite items and never lose track of what you love
                        </p>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-lg rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <BsFillBagHeartFill className="w-5 h-5" />
                        Explore Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex flex-col">
            {/* Header - Full Width */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
                            <button
                                onClick={() => navigate('/')}
                                className="p-2 hover:bg-red-50 rounded-full transition-all group flex-shrink-0"
                            >
                                <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-red-600" />
                            </button>
                            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                                    <BsFillBagHeartFill className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent truncate">
                                        My Wishlist
                                    </h1>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                                        {validWishlistItems.length} {validWishlistItems.length === 1 ? 'item' : 'items'} saved
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full flex-shrink-0">
                            <BsFillBagHeartFill className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                            <span className="font-bold text-orange-600 text-sm sm:text-base">{validWishlistItems.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 mt-3 sm:mt-4 md:mt-6">
                    <div className="bg-orange-50 border-2 border-orange-200 text-orange-700 px-3 sm:px-4 py-2 sm:py-3 rounded-xl flex items-center gap-2 sm:gap-3">
                        <FaTimes className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <p className="font-medium text-sm sm:text-base">{error}</p>
                    </div>
                </div>
            )}

            {/* Wishlist Grid */}
            <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8 flex-1 flex items-center justify-center md:items-start">
                <div className="w-full max-w-7xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                        {validWishlistItems.map((item) => (
                            <div
                                key={item.productId._id}
                                className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-orange-200 group relative"
                            >
                                {/* Product Image */}
                                <div
                                    onClick={() => navigate(`/product/${item.productId._id}`)}
                                    className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100"
                                >
                                    <img
                                        src={item.productId.images?.[0] || 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000'}
                                        alt={item.productId.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />

                                    {/* Gradient Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    {/* Remove Button - Top Right */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFromWishlist(item.productId._id);
                                        }}
                                        disabled={removingItem === item.productId._id}
                                        className="absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-all group/btn disabled:opacity-50"
                                    >
                                        {removingItem === item.productId._id ? (
                                            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-orange-500"></div>
                                        ) : (
                                            <BsFillBagHeartFill className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 group-hover/btn:scale-110 transition-transform" />
                                        )}
                                    </button>

                                    {/* Stock Badge */}
                                    {item.productId.stock <= 0 && (
                                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 px-2 sm:px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                            Out of Stock
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="p-3 sm:p-4">
                                    <h3
                                        onClick={() => navigate(`/product/${item.productId._id}`)}
                                        className="text-sm sm:text-base font-bold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-red-600 transition-colors min-h-[2.5rem] sm:min-h-[3rem]"
                                    >
                                        {item.productId.name}
                                    </h3>

                                    <div className="flex items-center justify-between mb-3 gap-2">
                                        <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-lg font-bold capitalize truncate">
                                            {item.productId.category || 'General'}
                                        </span>
                                        <span className={`text-xs font-bold whitespace-nowrap ${item.productId.stock > 10 ? 'text-green-600' :
                                            item.productId.stock > 0 ? 'text-orange-600' : 'text-red-600'
                                            }`}>
                                            {item.productId.stock > 0 ? `${item.productId.stock} left` : 'Out'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-2">
                                        <div>
                                            <p className="text-xs text-gray-500">Price</p>
                                            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                                                ₹{item.productId.price?.toFixed(2) || '0.00'}
                                            </span>
                                        </div>
                                        {(() => {
                                            const isInCart = cartItems.some(cartItem =>
                                                (cartItem.productId?._id || cartItem.productId) === item.productId._id
                                            );

                                            return (
                                                <button
                                                    onClick={() => addToCart(item.productId)}
                                                    disabled={addingToCart === item.productId._id || item.productId.stock <= 0}
                                                    className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${addingToCart === item.productId._id || item.productId.stock <= 0
                                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 shadow-md hover:shadow-lg hover:scale-105 transform'
                                                        }`}
                                                >
                                                    {addingToCart === item.productId._id ? (
                                                        <>
                                                            <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                                                            <span className="hidden sm:inline">Adding...</span>
                                                        </>
                                                    ) : isInCart ? (
                                                        <>
                                                            <FaCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                                            <span className="hidden sm:inline">Go to Cart</span>
                                                            <span className="sm:hidden">Cart</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                                                            <span className="hidden sm:inline">Add to Cart</span>
                                                            <span className="sm:hidden">Add</span>
                                                        </>
                                                    )}
                                                </button>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
