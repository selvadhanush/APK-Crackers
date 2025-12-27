import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaSearch, FaFilter, FaTimes, FaCheckCircle, FaExclamationCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import API from '../../api';
import Topbar from '../components/Customer/Topbar';
import Footer from '../components/Customer/Footer';

// Add custom styles for range sliders
const rangeSliderStyles = `
    input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        pointer-events: auto !important;
    }
    
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: linear-gradient(135deg, #f97316, #fb923c);
        cursor: pointer;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        pointer-events: auto;
    }
    
    input[type="range"]::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: linear-gradient(135deg, #f97316, #fb923c);
        cursor: pointer;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        pointer-events: auto;
    }
    
    input[type="range"]::-webkit-slider-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 3px 8px rgba(0,0,0,0.3);
    }
    
    input[type="range"]::-moz-range-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 3px 8px rgba(0,0,0,0.3);
    }
`;

const SearchResults = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const [searchResults, setSearchResults] = useState([]);
    const [allResults, setAllResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [wishlistItems, setWishlistItems] = useState([]);
    const [togglingWishlist, setTogglingWishlist] = useState(null);
    const [addingToCart, setAddingToCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [expandedSections, setExpandedSections] = useState({
        sort: true,
        category: true,
        price: true,
        stock: true
    });

    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        inStock: false,
        sortBy: 'relevance'
    });

    // Debounced filters for typing inputs
    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    const categories = ['Sparklers', 'Rockets', 'Fountains', 'Gift Boxes', 'Chakras', 'Bombs', 'Flower Pots', 'Ground Chakkars'];

    useEffect(() => {
        if (query) {
            fetchSearchResults();
            fetchWishlist();
            fetchCart();
        }
    }, [query]);

    // Debounce filter changes - wait 800ms after user stops typing (but NOT for price slider)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 800);

        return () => clearTimeout(timer);
    }, [filters.category, filters.inStock, filters.sortBy]); // Only debounce these, not maxPrice

    // Apply price filter immediately without debouncing
    useEffect(() => {
        setDebouncedFilters(prev => ({ ...prev, maxPrice: filters.maxPrice }));
    }, [filters.maxPrice]);

    useEffect(() => {
        applyFilters();
    }, [debouncedFilters, allResults]);

    const fetchSearchResults = async () => {
        try {
            setLoading(true);
            const response = await API.get(`/search?q=${encodeURIComponent(query)}`);
            setAllResults(response.data.products || []);
            setSearchResults(response.data.products || []);
            setError('');
        } catch (err) {
            console.error('Search error:', err);
            setError('Failed to fetch search results');
            setAllResults([]);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...allResults];

        if (debouncedFilters.category) {
            filtered = filtered.filter(p =>
                p.category?.toLowerCase() === debouncedFilters.category.toLowerCase()
            );
        }

        if (debouncedFilters.maxPrice) {
            filtered = filtered.filter(p => p.price <= parseFloat(debouncedFilters.maxPrice));
        }

        if (debouncedFilters.inStock) {
            filtered = filtered.filter(p => p.stock > 0);
        }

        switch (debouncedFilters.sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'rating':
                filtered.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
                break;
            default:
                break;
        }

        setSearchResults(filtered);
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
            showNotification(error.response?.data?.message || 'Failed to update wishlist', 'error');
        } finally {
            setTogglingWishlist(null);
        }
    };

    const addToCart = async (e, product) => {
        e.stopPropagation();
        const token = localStorage.getItem('token');
        if (!token) {
            showNotification('Please login to add items to cart', 'error');
            setTimeout(() => navigate('/Login'), 1500);
            return;
        }

        setAddingToCart(product._id);
        try {
            await API.post('/cart/add', {
                productId: product._id,
                quantity: 1
            });
            showNotification('Added to cart successfully!', 'success');
            fetchCart();
        } catch (error) {
            console.error('Add to cart error:', error);
            showNotification(error.response?.data?.message || 'Failed to add to cart', 'error');
        } finally {
            setAddingToCart(null);
        }
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            minPrice: '',
            maxPrice: '',
            inStock: false,
            sortBy: 'relevance'
        });
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const FilterSection = ({ title, section, children }) => (
        <div className="border-b border-gray-100 pb-4">
            <button
                onClick={() => toggleSection(section)}
                className="w-full flex items-center justify-between py-2 hover:bg-gray-50 rounded px-2 transition-colors"
            >
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">{title}</h3>
                {expandedSections[section] ? (
                    <FaChevronUp className="w-3 h-3 text-gray-500" />
                ) : (
                    <FaChevronDown className="w-3 h-3 text-gray-500" />
                )}
            </button>
            {expandedSections[section] && (
                <div className="mt-3 px-2">
                    {children}
                </div>
            )}
        </div>
    );

    const FilterContent = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b-2 border-orange-500">
                <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">Filters</h2>
                <button
                    onClick={clearFilters}
                    className="text-xs text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide hover:underline"
                >
                    Clear All
                </button>
            </div>

            <FilterSection title="Sort By" section="sort">
                <div className="space-y-2">
                    {[
                        { value: 'relevance', icon: '🎯', label: 'Best Match', desc: 'Most relevant products' },
                        { value: 'price-low', icon: '💰', label: 'Price: Low to High', desc: 'Cheapest first' },
                        { value: 'price-high', icon: '💎', label: 'Price: High to Low', desc: 'Most expensive first' },
                        { value: 'newest', icon: '✨', label: 'Newest Arrivals', desc: 'Recently added' },
                        { value: 'rating', icon: '⭐', label: 'Top Rated', desc: 'Highest ratings first' }
                    ].map((option) => (
                        <label
                            key={option.value}
                            className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${filters.sortBy === option.value
                                ? 'border-orange-500 bg-orange-50 shadow-sm'
                                : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                                }`}
                        >
                            <input
                                type="radio"
                                name="sortBy"
                                value={option.value}
                                checked={filters.sortBy === option.value}
                                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                                className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                            />
                            <span className="text-2xl">{option.icon}</span>
                            <div className="flex-1">
                                <div className={`text-sm font-semibold ${filters.sortBy === option.value ? 'text-orange-700' : 'text-gray-800'
                                    }`}>
                                    {option.label}
                                </div>
                                <div className="text-xs text-gray-500">{option.desc}</div>
                            </div>
                            {filters.sortBy === option.value && (
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                            )}
                        </label>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Category" section="category">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                    <label className="flex items-center cursor-pointer hover:bg-orange-50 p-2 rounded-lg transition-colors group">
                        <input
                            type="radio"
                            name="category"
                            checked={filters.category === ''}
                            onChange={() => setFilters({ ...filters, category: '' })}
                            className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 font-medium">All Categories</span>
                        <span className="ml-auto text-xs text-gray-500">({allResults.length})</span>
                    </label>
                    {categories.map(cat => {
                        const count = allResults.filter(p => p.category?.toLowerCase() === cat.toLowerCase()).length;
                        return (
                            <label key={cat} className="flex items-center cursor-pointer hover:bg-orange-50 p-2 rounded-lg transition-colors group">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={filters.category === cat}
                                    onChange={() => setFilters({ ...filters, category: cat })}
                                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                                />
                                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 font-medium">{cat}</span>
                                <span className="ml-auto text-xs text-gray-500">({count})</span>
                            </label>
                        );
                    })}
                </div>
            </FilterSection>

            <FilterSection title="Price Range" section="price">
                <div className="space-y-4">
                    <div className="p-4">
                        <div className="flex justify-between text-sm text-gray-700 mb-3">
                            <span className="font-medium">Price Range</span>
                            <span className="font-bold text-orange-600 text-base">
                                ₹{(filters.maxPrice || 10000).toLocaleString('en-IN')}
                            </span>
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="10000"
                            step="100"
                            value={filters.maxPrice || 10000}
                            onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                            className="w-full h-2 bg-transparent appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, #fb923c 0%, #fb923c ${((filters.maxPrice || 10000) / 10000) * 100}%, #e5e7eb ${((filters.maxPrice || 10000) / 10000) * 100}%, #e5e7eb 100%)`,
                            }}
                        />

                        <div className="text-xs text-gray-600 mt-2 text-center font-medium">
                            ₹0 - ₹{(filters.maxPrice || 10000).toLocaleString('en-IN')} of ₹10,000
                        </div>
                    </div>
                </div>
            </FilterSection>

            <FilterSection title="Availability" section="stock">
                <label className="flex items-center cursor-pointer hover:bg-orange-50 p-3 rounded-lg transition-colors group">
                    <input
                        type="checkbox"
                        checked={filters.inStock}
                        onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                        className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                    />
                    <div className="ml-3 flex-1">
                        <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">In Stock Only</span>
                        <p className="text-xs text-gray-500 mt-0.5">Show only available products</p>
                    </div>
                </label>
            </FilterSection>

            <div className="pt-4">
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Active Filters:</p>
                    <div className="flex flex-wrap gap-2">
                        {filters.category && (
                            <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-700 border border-orange-300">
                                {filters.category}
                            </span>
                        )}
                        {filters.maxPrice && filters.maxPrice < 10000 && (
                            <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-700 border border-orange-300">
                                Up to ₹{parseInt(filters.maxPrice).toLocaleString('en-IN')}
                            </span>
                        )}
                        {filters.inStock && (
                            <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-700 border border-orange-300">
                                In Stock
                            </span>
                        )}
                        {filters.sortBy !== 'relevance' && (
                            <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-700 border border-orange-300">
                                {filters.sortBy === 'price-low' ? 'Price ↑' : filters.sortBy === 'price-high' ? 'Price ↓' : filters.sortBy === 'newest' ? 'Newest' : 'Top Rated'}
                            </span>
                        )}
                        {!filters.category && (!filters.maxPrice || filters.maxPrice >= 10000) && !filters.inStock && filters.sortBy === 'relevance' && (
                            <span className="text-xs text-gray-500 italic">No filters applied</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <style>{rangeSliderStyles}</style>
            <Topbar />

            {notification.show && (
                <div className={`fixed top-20 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg transform transition-all ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                    {notification.type === 'success' ? <FaCheckCircle className="w-5 h-5" /> : <FaExclamationCircle className="w-5 h-5" />}
                    <span className="font-medium">{notification.message}</span>
                </div>
            )}

            {showMobileFilters && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" onClick={() => setShowMobileFilters(false)}>
                    <div className="w-80 h-full bg-white overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                            <h2 className="font-bold text-lg text-gray-900">Filters</h2>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <FaTimes className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                        <div className="p-4">
                            <FilterContent />
                        </div>
                    </div>
                </div>
            )}

            <div className="flex">
                <aside className="hidden lg:block w-72 bg-white h-[calc(100vh-64px)] sticky top-16 overflow-y-auto shadow-sm">
                    <div className="p-5">
                        <FilterContent />
                    </div>
                </aside>

                <main className="flex-1 bg-gray-50">
                    <div className="max-w-[1400px] mx-auto p-6">
                        <div className=" px-2 py-2 mb-6 flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">
                                    Search Results for "{query}"
                                </h1>
                                <p className="text-sm text-gray-600 mt-1">
                                    Showing {searchResults.length} of {allResults.length} products
                                </p>
                            </div>
                            <button
                                onClick={() => setShowMobileFilters(true)}
                                className="lg:hidden px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold text-sm flex items-center gap-2 hover:shadow-md transition-all"
                            >
                                <FaFilter />
                                Filters
                            </button>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                                    <p className="text-gray-600">Searching products...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-20">
                                <FaExclamationCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                                <p className="text-gray-800 text-lg mb-4">{error}</p>
                                <button
                                    onClick={fetchSearchResults}
                                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:shadow-md transition-all font-semibold"
                                >
                                    Retry Search
                                </button>
                            </div>
                        ) : searchResults.length === 0 ? (
                            <div className="text-center py-20">
                                <FaSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-800 text-xl font-semibold mb-2">No products found for "{query}"</p>
                                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                                <button
                                    onClick={() => navigate('/')}
                                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:shadow-md transition-all font-semibold"
                                >
                                    Browse All Products
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {searchResults.map((product) => {
                                    const isInCart = cartItems.some(item => (item.productId?._id || item.productId) === product._id);
                                    const cartItem = cartItems.find(item => (item.productId?._id || item.productId) === product._id);

                                    return (
                                        <div
                                            key={product._id}
                                            onClick={() => navigate(`/product/${product._id}`)}
                                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
                                        >
                                            <div className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer">
                                                <img
                                                    src={product.images?.[0] || 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000'}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    onClick={(e) => toggleWishlist(e, product._id)}
                                                    disabled={togglingWishlist === product._id}
                                                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                                                >
                                                    {togglingWishlist === product._id ? (
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                                                    ) : (
                                                        <FaHeart
                                                            className={`w-5 h-5 transition-colors ${wishlistItems.includes(product._id)
                                                                ? 'text-red-500'
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

                                            <div className="p-4">
                                                <div className="flex items-start justify-between mb-3">
                                                    <h3 className="text-base font-semibold text-gray-800">{product.name}</h3>
                                                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded cursor-pointer">
                                                        <FaStar className="w-3 h-3 text-yellow-400" />
                                                        <span className="text-sm font-medium text-gray-700">4.2</span>
                                                        <span className="text-xs text-gray-500">(0)</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-gray-500 font-medium mb-1">Category</span>
                                                        <span className="text-sm font-bold text-gray-800 capitalize">{product.category || 'General'}</span>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-xs text-gray-500 font-medium mb-1">Stock</span>
                                                        <span className={`text-sm font-bold ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                                                            }`}>
                                                            {product.stock > 0 ? `${product.stock} units` : 'Out of stock'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                    <span className="text-lg font-bold text-gray-800">
                                                        ₹{product.price?.toFixed(2) || '0.00'}
                                                    </span>
                                                    {isInCart ? (
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
                                                    ) : (
                                                        <button
                                                            onClick={(e) => addToCart(e, product)}
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
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default SearchResults;
