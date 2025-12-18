import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaArrowLeft, FaSearch } from 'react-icons/fa';
import API from '../../api';

const SearchResults = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [togglingWishlist, setTogglingWishlist] = useState(null);
    const [addingToCart, setAddingToCart] = useState(null);

    useEffect(() => {
        if (query) {
            fetchSearchResults();
            fetchWishlist();
        }
    }, [query, currentPage]);

    const fetchSearchResults = async () => {
        try {
            setLoading(true);
            const response = await API.get(`/search?q=${encodeURIComponent(query)}&page=${currentPage}`);
            setSearchResults(response.data.products || []);
            setTotalPages(response.data.totalPages || 1);
            setTotalResults(response.data.totalResults || 0);
            setError('');
        } catch (err) {
            console.error('Search error:', err);
            setError('Failed to fetch search results');
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchWishlist = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await API.get('/wishlist');
            const wishlistProductIds = (Array.isArray(response.data) ? response.data : []).map(item => item.productId._id);
            setWishlistItems(wishlistProductIds);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    const toggleWishlist = async (e, productId) => {
        e.stopPropagation();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to add items to wishlist');
            navigate('/Login');
            return;
        }

        setTogglingWishlist(productId);
        try {
            const isInWishlist = wishlistItems.includes(productId);
            if (isInWishlist) {
                await API.delete(`/wishlist/remove/${productId}`);
                setWishlistItems(prev => prev.filter(id => id !== productId));
            } else {
                await API.post('/wishlist/add', { productId });
                setWishlistItems(prev => [...prev, productId]);
            }
        } catch (error) {
            console.error('Wishlist error:', error);
            if (error.response?.status === 400 && error.response?.data?.message === 'Already in wishlist') {
                setWishlistItems(prev => [...prev, productId]);
            }
        } finally {
            setTogglingWishlist(null);
        }
    };

    const addToCart = async (e, product) => {
        e.stopPropagation();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to add items to cart');
            navigate('/Login');
            return;
        }

        setAddingToCart(product._id);
        try {
            await API.post('/cart/add', {
                productId: product._id,
                quantity: 1
            });
            alert('Added to cart successfully!');
        } catch (error) {
            console.error('Add to cart error:', error);
            alert(error.response?.data?.message || 'Failed to add to cart');
        } finally {
            setAddingToCart(null);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Searching...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-gray-50 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-white rounded-full transition-all cursor-pointer"
                    >
                        <FaArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Search Results
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {totalResults > 0 ? (
                                <>
                                    Found <span className="font-semibold text-orange-600">{totalResults}</span> {totalResults === 1 ? 'result' : 'results'} for "<span className="font-semibold">{query}</span>"
                                </>
                            ) : (
                                <>No results found for "<span className="font-semibold">{query}</span>"</>
                            )}
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                {/* Search Results Grid */}
                {searchResults.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                        <FaSearch className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600 mb-6">Try searching with different keywords</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg cursor-pointer"
                        >
                            Browse All Products
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {searchResults.map((product) => (
                                <div
                                    key={product._id}
                                    onClick={() => navigate(`/product/${product._id}`)}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 cursor-pointer group"
                                >
                                    {/* Product Image */}
                                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50">
                                        <img
                                            src={product.images?.[0] || 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000'}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        {/* Wishlist Heart Button */}
                                        <button
                                            onClick={(e) => toggleWishlist(e, product._id)}
                                            disabled={togglingWishlist === product._id}
                                            className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                                        >
                                            {togglingWishlist === product._id ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                                            ) : (
                                                <FaHeart
                                                    className={`w-5 h-5 transition-all ${wishlistItems.includes(product._id)
                                                            ? 'text-red-500 animate-pulse'
                                                            : 'text-gray-300 hover:text-red-400'
                                                        }`}
                                                />
                                            )}
                                        </button>
                                        {product.stock <= 0 && (
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">Out of Stock</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-4">
                                        <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
                                            {product.name}
                                        </h3>

                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, index) => (
                                                    <FaStar
                                                        key={index}
                                                        className={`w-3 h-3 ${index < Math.round(product.averageRating || 0)
                                                                ? 'text-yellow-400'
                                                                : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                ({product.totalReviews || 0})
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded font-bold capitalize">
                                                {product.category || 'General'}
                                            </span>
                                            <span className={`text-xs font-bold ${product.stock > 10 ? 'text-green-600' :
                                                    product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                                                }`}>
                                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                            <span className="text-xl font-bold text-gray-800">
                                                ₹{product.price?.toFixed(2) || '0.00'}
                                            </span>
                                            <button
                                                onClick={(e) => addToCart(e, product)}
                                                disabled={addingToCart === product._id || product.stock <= 0}
                                                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${addingToCart === product._id || product.stock <= 0
                                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 shadow-sm hover:shadow-md cursor-pointer'
                                                    }`}
                                            >
                                                {addingToCart === product._id ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                        Adding...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaShoppingCart className="w-4 h-4" />
                                                        Add
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-orange-500 hover:text-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 text-gray-700 font-semibold">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-orange-500 hover:text-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
