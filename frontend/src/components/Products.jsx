import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaChevronDown, FaShoppingCart, FaCheckCircle, FaExclamationCircle, FaHeart } from 'react-icons/fa';
import API from '../../api';

const Products = () => {
    const navigate = useNavigate();
    const [filterDropdown, setFilterDropdown] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [addingToCart, setAddingToCart] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [wishlistItems, setWishlistItems] = useState([]);
    const [togglingWishlist, setTogglingWishlist] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchProducts();
        fetchWishlist();
        fetchCart();
    }, [selectedFilter, currentPage, searchQuery]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            let response;

            // Use search if query exists
            if (searchQuery.trim()) {
                response = await API.get(`/products/customer/search?q=${encodeURIComponent(searchQuery)}`);
                const productsData = Array.isArray(response.data) ? response.data : [];
                setProducts(productsData);
                setTotalPages(1); // Search doesn't have pagination
            }
            // Use category filter if not "All"
            else if (selectedFilter !== 'All') {
                response = await API.get(`/products/customer/category/${selectedFilter.toLowerCase()}`);
                const productsData = Array.isArray(response.data) ? response.data : [];
                setProducts(productsData);
                setTotalPages(1); // Category filter doesn't have pagination
            }
            // Use pagination for "All" products
            else {
                response = await API.get(`/products/customer/page?page=${currentPage}`);
                setProducts(response.data.products || []);
                setTotalPages(response.data.totalPages || 1);
            }

            setError('');
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products. Please try again later.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchWishlist = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await API.get('/wishlist');
            // Backend returns array directly, not wrapped in object
            const wishlistProductIds = (Array.isArray(response.data) ? response.data : []).map(item => item.productId._id);
            setWishlistItems(wishlistProductIds);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await API.get('/cart');
            setCartItems(response.data.items || []);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const toggleWishlist = async (e, productId) => {
        e.stopPropagation();

        const token = localStorage.getItem('token');
        if (!token) {
            showNotification('Please login to add items to wishlist', 'error');
            setTimeout(() => navigate('/Login'), 1500);
            return;
        }

        setTogglingWishlist(productId);

        try {
            const isInWishlist = wishlistItems.includes(productId);

            if (isInWishlist) {
                await API.delete(`/wishlist/remove/${productId}`);
                setWishlistItems(prev => prev.filter(id => id !== productId));
                showNotification('Removed from wishlist', 'success');
            } else {
                await API.post('/wishlist/add', { productId });
                setWishlistItems(prev => [...prev, productId]);
                showNotification('Added to wishlist!', 'success');
            }
        } catch (error) {
            console.error('Wishlist error:', error);
            if (error.response?.status === 401) {
                showNotification('Session expired. Please login again', 'error');
                setTimeout(() => navigate('/Login'), 1500);
            } else if (error.response?.status === 400 && error.response?.data?.message === 'Already in wishlist') {
                // Item already in wishlist, just update UI
                setWishlistItems(prev => [...prev, productId]);
                showNotification('Already in wishlist', 'success');
            } else {
                showNotification(error.response?.data?.message || 'Failed to update wishlist', 'error');
            }
        } finally {
            setTogglingWishlist(null);
        }
    };

    const filterOptions = ['All', 'Night', 'Day'];

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    const handleAddToCart = async (e, productId) => {
        e.stopPropagation();

        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            showNotification('Please login to add items to cart', 'error');
            setTimeout(() => navigate('/Login'), 1500);
            return;
        }

        setAddingToCart(productId);

        try {
            const response = await API.post('/cart/add', {
                productId: productId.toString(),
                quantity: 1
            });

            showNotification('Added to cart successfully!', 'success');
            fetchCart(); // Refresh cart to update UI
        } catch (error) {
            console.error('Add to cart error:', error);
            if (error.response?.status === 401) {
                showNotification('Session expired. Please login again', 'error');
                setTimeout(() => navigate('/Login'), 1500);
            } else {
                showNotification(error.response?.data?.message || 'Failed to add to cart', 'error');
            }
        } finally {
            setAddingToCart(null);
        }
    };

    return (
        <div className="flex-1 bg-gray-50 overflow-y-auto">
            {/* Notification Toast */}
            {notification.show && (
                <div className={`fixed top-20 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg transform transition-all ${notification.type === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                    }`}>
                    {notification.type === 'success' ? (
                        <FaCheckCircle className="w-5 h-5" />
                    ) : (
                        <FaExclamationCircle className="w-5 h-5" />
                    )}
                    <span className="font-medium">{notification.message}</span>
                </div>
            )}

            {/* Header Section */}
            <div className="bg-white px-6 py-2">
                <div className="flex items-center justify-between">
                    {/* Left - Title */}
                    <h1 className="text-xl font-bold text-gray-800">All Crackers</h1>

                    {/* Right - Action Buttons */}
                    <div className="flex items-center gap-3">
                        {/* Scan Barcode Button */}
                        {/* <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-full hover:border-gray-400 transition-all cursor-pointer">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                                <path d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01" strokeWidth="2" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Scan Barcode</span>
                        </button>

                        
                        <button className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-all cursor-pointer">
                            Slicedice
                        </button> */}

                        {/* Filter Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setFilterDropdown(!filterDropdown)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-full hover:border-gray-400 transition-all cursor-pointer"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 4h18M3 12h18M3 20h18" />
                                    <circle cx="7" cy="4" r="2" fill="currentColor" />
                                    <circle cx="17" cy="12" r="2" fill="currentColor" />
                                    <circle cx="7" cy="20" r="2" fill="currentColor" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">Filter</span>
                                <FaChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${filterDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {filterDropdown && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    {filterOptions.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSelectedFilter(option);
                                                setFilterDropdown(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer ${index === 0 ? 'rounded-t-lg' : ''
                                                } ${index === filterOptions.length - 1 ? 'rounded-b-lg' : ''
                                                } ${selectedFilter === option ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-700'
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Selected Filter Display */}
            {selectedFilter !== 'All' && (
                <div className="px-6 pt-4">
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full">
                        <span className="text-sm font-medium">Filter: {selectedFilter}</span>
                        <button
                            onClick={() => setSelectedFilter('All')}
                            className="hover:bg-orange-200 rounded-full p-1 transition-colors cursor-pointer"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Products Grid */}
            <div className="p-6">
                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1); // Reset to page 1 when searching
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    />
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <FaExclamationCircle className="w-16 h-16 text-red-500 mb-4" />
                        <p className="text-gray-600 text-lg">{error}</p>
                        <button
                            onClick={fetchProducts}
                            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
                        >
                            Retry
                        </button>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-gray-600 text-lg">No products found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                onClick={() => handleProductClick(product._id)}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
                            >
                                {/* Product Image */}
                                <div className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer">
                                    <img
                                        src={product.images?.[0] || 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000'}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Wishlist Heart Button */}
                                    <button
                                        onClick={(e) => toggleWishlist(e, product._id)}
                                        disabled={togglingWishlist === product._id}
                                        className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all group/heart"
                                    >
                                        {togglingWishlist === product._id ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                                        ) : (
                                            <FaHeart
                                                className={`w-5 h-5 transition-all ${wishlistItems.includes(product._id)
                                                    ? 'text-red-500 animate-pulse'
                                                    : 'text-gray-300 group-hover/heart:text-red-400'
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
                                    {/* Product Name and Rating */}
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-base font-semibold text-gray-800">{product.name}</h3>
                                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded cursor-pointer">
                                            <FaStar className="w-3 h-3 text-yellow-400" />
                                            <span className="text-sm font-medium text-gray-700">4.2</span>
                                            <span className="text-xs text-gray-500">(0)</span>
                                        </div>
                                    </div>

                                    {/* Category and Stock Row */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex flex-col">
                                            <span className="text-m text-gray-500 font-medium mb-1">Category</span>
                                            <span className="text-sm font-bold text-gray-800 capitalize">{product.category || 'General'}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-m text-gray-500 font-medium mb-1">Stock</span>
                                            <span className={`text-sm font-bold ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                                                {product.stock > 0 ? `${product.stock} units` : 'Out of stock'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price and Action Buttons */}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <span className="text-lg font-bold text-gray-800">₹{product.price?.toFixed(2) || '0.00'}</span>
                                        {(() => {
                                            const isInCart = cartItems.some(item =>
                                                (item.productId?._id || item.productId) === product._id
                                            );
                                            const cartItem = cartItems.find(item =>
                                                (item.productId?._id || item.productId) === product._id
                                            );

                                            if (isInCart) {
                                                return (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate('/cart');
                                                        }}
                                                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-orange-500 text-orange-600 rounded-lg transition-all shadow-sm hover:shadow-md hover:bg-orange-50 cursor-pointer"
                                                    >
                                                        <FaCheckCircle className="w-4 h-4" />
                                                        <span className="text-sm font-medium">
                                                            Go to Cart ({cartItem?.quantity || 1})
                                                        </span>
                                                    </button>
                                                );
                                            }

                                            return (
                                                <button
                                                    onClick={(e) => handleAddToCart(e, product._id)}
                                                    disabled={addingToCart === product._id || product.stock <= 0}
                                                    className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all shadow-sm hover:shadow-md ${addingToCart === product._id || product.stock <= 0
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 cursor-pointer'
                                                        }`}
                                                >
                                                    {addingToCart === product._id ? (
                                                        <>
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                            <span className="text-sm font-medium">Adding...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaShoppingCart className="w-4 h-4" />
                                                            <span className="text-sm font-medium">
                                                                {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                                                            </span>
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
                )}

                {/* Pagination Controls */}
                {!loading && !error && selectedFilter === 'All' && !searchQuery.trim() && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-6 py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-orange-500 hover:text-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-700"
                        >
                            Previous
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700 font-semibold">
                                Page {currentPage} of {totalPages}
                            </span>
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-6 py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-orange-500 hover:text-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-700"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
