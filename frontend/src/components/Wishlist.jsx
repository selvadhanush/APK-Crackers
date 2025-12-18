import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTrash, FaArrowLeft, FaHeartBroken } from 'react-icons/fa';
import API from '../../api';

const Wishlist = () => {
    const navigate = useNavigate();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [removingItem, setRemovingItem] = useState(null);
    const [addingToCart, setAddingToCart] = useState(null);

    useEffect(() => {
        fetchWishlist();
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
            // Backend returns array directly, not wrapped in object
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

    const removeFromWishlist = async (productId) => {
        setRemovingItem(productId);
        try {
            await API.delete(`/wishlist/remove/${productId}`);
            setWishlistItems(prevItems => prevItems.filter(item => item.productId._id !== productId));
        } catch (err) {
            console.error('Remove from wishlist error:', err);
            alert(err.response?.data?.message || 'Failed to remove from wishlist');
        } finally {
            setRemovingItem(null);
        }
    };

    const addToCart = async (product) => {
        setAddingToCart(product._id);
        try {
            await API.post('/cart/add', {
                productId: product._id,
                quantity: 1
            });
            alert('Added to cart successfully!');
            // Keep item in wishlist - don't remove it
        } catch (err) {
            console.error('Add to cart error:', err);
            alert(err.response?.data?.message || 'Failed to add to cart');
        } finally {
            setAddingToCart(null);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading your wishlist...</p>
                </div>
            </div>
        );
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="flex-1 bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md px-6">
                    <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaHeartBroken className="w-16 h-16 text-orange-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Wishlist is Empty</h2>
                    <p className="text-gray-600 mb-6">Save your favorite crackers here and buy them later!</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg cursor-pointer"
                    >
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-gray-50 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 hover:bg-white rounded-full transition-all cursor-pointer"
                        >
                            <FaArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                                <FaHeart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
                                <p className="text-sm text-gray-500">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved</p>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                {/* Wishlist Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlistItems.map((item) => (
                        <div
                            key={item.productId._id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 group"
                        >
                            {/* Product Image */}
                            <div
                                onClick={() => navigate(`/product/${item.productId._id}`)}
                                className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer bg-gray-50"
                            >
                                <img
                                    src={item.productId.images?.[0] || 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000'}
                                    alt={item.productId.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                {/* Remove Button - Top Right */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromWishlist(item.productId._id);
                                    }}
                                    disabled={removingItem === item.productId._id}
                                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-all group/btn"
                                >
                                    {removingItem === item.productId._id ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
                                    ) : (
                                        <FaHeart className="w-5 h-5 text-red-500 group-hover/btn:scale-110 transition-transform" />
                                    )}
                                </button>
                            </div>

                            {/* Product Info */}
                            <div className="p-4">
                                <h3
                                    onClick={() => navigate(`/product/${item.productId._id}`)}
                                    className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-orange-600 transition-colors"
                                >
                                    {item.productId.name}
                                </h3>

                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded font-bold capitalize">
                                        {item.productId.category || 'General'}
                                    </span>
                                    <span className={`text-xs font-bold ${item.productId.stock > 10 ? 'text-green-600' :
                                        item.productId.stock > 0 ? 'text-orange-600' : 'text-red-600'
                                        }`}>
                                        {item.productId.stock > 0 ? `${item.productId.stock} in stock` : 'Out of stock'}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <span className="text-xl font-bold text-gray-800">
                                        ₹{item.productId.price?.toFixed(2) || '0.00'}
                                    </span>
                                    <button
                                        onClick={() => addToCart(item.productId)}
                                        disabled={addingToCart === item.productId._id || item.productId.stock <= 0}
                                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${addingToCart === item.productId._id || item.productId.stock <= 0
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 shadow-sm hover:shadow-md cursor-pointer'
                                            }`}
                                    >
                                        {addingToCart === item.productId._id ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Adding...
                                            </>
                                        ) : (
                                            <>
                                                <FaShoppingCart className="w-4 h-4" />
                                                Add to Cart
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
