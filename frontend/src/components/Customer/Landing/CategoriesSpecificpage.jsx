import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../../../api';
import Topbar from '../Topbar';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { FaArrowLeft, FaFilter, FaTimes, FaClipboardList, FaStar } from 'react-icons/fa';
import LegalDisclaimer from '../../Common/LegalDisclaimer';

// Memoized Product Card Component for better performance
const ProductCard = React.memo(({
    product,
    inCart,
    addingToCart,
    onProductClick,
    onAddToCart
}) => {
    return (
        <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 cursor-pointer active:scale-98 flex flex-row sm:flex-col">
            {/* Mobile: Details on Left | Desktop: Details on Bottom */}
            <div className="flex-1 sm:flex-none p-3 sm:p-4 order-1 sm:order-2">
                {/* Product Name */}
                <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                    <h3
                        className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 flex-1 cursor-pointer hover:text-orange-500 transition-colors"
                        onClick={() => onProductClick(product._id)}
                    >
                        {product.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-gray-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0">
                        <FaStar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700">4.2</span>
                    </div>
                </div>

                {/* Category and Brand */}
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="flex flex-col">
                        <span className="text-[10px] sm:text-xs text-gray-500 font-medium mb-0.5 sm:mb-1">Category</span>
                        <span className="text-xs sm:text-sm font-bold text-gray-800 capitalize">{product.category.main}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] sm:text-xs text-gray-500 font-medium mb-0.5 sm:mb-1">Brand</span>
                        <span className="text-xs sm:text-sm font-bold text-orange-600 capitalize">{product.brand}</span>
                    </div>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100 gap-2">
                    <div className="flex flex-col">
                        <span className="text-base sm:text-lg md:text-xl font-black text-gray-900 leading-none">
                            ₹{product.pricing.selling_price.toLocaleString('en-IN')}
                        </span>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[8px] sm:text-[9px] font-bold text-orange-500 uppercase tracking-widest px-1.5 py-0.5 bg-orange-50 rounded border border-orange-100 whitespace-nowrap">
                                E. Price
                            </span>
                            {product.pricing.mrp && product.pricing.mrp > product.pricing.selling_price && (
                                <span className="text-[10px] sm:text-xs text-gray-400 line-through font-medium">
                                    ₹{product.pricing.mrp.toLocaleString('en-IN')}
                                </span>
                            )}
                        </div>
                    </div>

                    {inCart ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(product);
                            }}
                            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white border-2 border-orange-500 text-orange-600 rounded-lg transition-all shadow-sm hover:shadow-md hover:bg-orange-50 cursor-pointer active:scale-95"
                        >
                            <FaClipboardList className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm font-medium whitespace-nowrap">In List</span>
                        </button>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(product);
                            }}
                            disabled={addingToCart === product._id || product.stock_control.available_pieces <= 0}
                            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-white rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 ${addingToCart === product._id || product.stock_control.available_pieces <= 0
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 cursor-pointer'
                                }`}
                        >
                            {addingToCart === product._id ? (
                                <>
                                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                                    <span className="text-xs sm:text-sm font-medium hidden sm:inline">Adding...</span>
                                </>
                            ) : (
                                <>
                                    <FaClipboardList className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                                        {product.stock_control.available_pieces <= 0 ? 'Out' : 'Add'}
                                    </span>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile: Image on Right | Desktop: Image on Top */}
            <div className="relative w-32 sm:w-full aspect-square sm:aspect-square overflow-hidden bg-gray-100 cursor-pointer flex-shrink-0 order-2 sm:order-1"
                onClick={() => onProductClick(product._id)}
            >
                <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                        e.target.onerror = null;
                    }}
                />
                {product.discount_percentage > 0 && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold z-20">
                        {product.discount_percentage}% OFF
                    </div>
                )}
            </div>
        </div>
    );
});

const CategoriesSpecificpage = () => {
    const { categorySlug } = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState('');
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Cart states
    const [cartItems, setCartItems] = useState([]);
    const [addingToCart, setAddingToCart] = useState(null);

    // Filter states
    const [filters, setFilters] = useState({
        priceRange: [0, 50000],
        selectedBrands: [],
        selectedAges: [],
        selectedTags: [],
        selectedRatings: [],
        isEcoFriendly: false,
        isGreenCrackers: false
    });

    // Fetch cart on mount
    useEffect(() => {
        fetchCart();
    }, []);

    // Fetch products for this category
    useEffect(() => {
        fetchProducts();
    }, [categorySlug, currentPage, filters]);

    // Update document title
    useEffect(() => {
        if (categoryName) {
            document.title = `${categoryName} - APK Crackers`;
        }
    }, [categoryName]);

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



    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: 50, // Show 50 products per page for better performance
                minPrice: filters.priceRange[0],
                maxPrice: filters.priceRange[1],
            };

            // Add category filter
            if (categorySlug) {
                params.mainCategory = categorySlug;
            }

            // Add brand filters
            if (filters.selectedBrands.length > 0) {
                params.brands = filters.selectedBrands.join(',');
            }

            // Add age filters
            if (filters.selectedAges.length > 0) {
                params.ageCategories = filters.selectedAges.join(',');
            }

            // Add tag filters
            if (filters.selectedTags.length > 0) {
                params.tags = filters.selectedTags.join(',');
            }

            // Add rating filter
            if (filters.selectedRatings.length > 0) {
                params.minRating = Math.min(...filters.selectedRatings);
            }

            // Add eco-friendly and green crackers filters
            if (filters.isEcoFriendly) {
                params.isEcoFriendly = 'true';
            }

            if (filters.isGreenCrackers) {
                params.isGreenCrackers = 'true';
            }

            const response = await API.get('/products/customer/filter', { params });

            setProducts(response.data.products || []);
            setTotalProducts(response.data.totalProducts || 0);
            setTotalPages(response.data.totalPages || 1);

            // Get category name from first product or format from slug
            if (response.data.products && response.data.products.length > 0) {
                setCategoryName(response.data.products[0].category.main);
            } else {
                // Format category name from slug
                const formattedName = categorySlug
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                setCategoryName(formattedName);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
            setTotalProducts(0);
            // Format category name from slug as fallback
            const formattedName = categorySlug
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            setCategoryName(formattedName);
        } finally {
            setLoading(false);
        }
    };

    const handleFiltersChange = useCallback((newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to first page when filters change
        setShowMobileFilters(false);
    }, []);

    const handleProductClick = useCallback((productId) => {
        navigate(`/product/${productId}`);
    }, [navigate]);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const addToCart = useCallback(async (product) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/Login');
            return;
        }

        // Check if product is already in cart
        const isInCart = cartItems.some(item =>
            (item.productId?._id || item.productId) === product._id
        );

        if (isInCart) {
            navigate('/enquiry-list');
            return;
        }

        setAddingToCart(product._id);
        try {
            await API.post('/cart/add', {
                productId: product._id,
                quantity: 1
            });
            fetchCart(); // Refresh cart items
        } catch (error) {
            console.error('Add to cart error:', error);
        } finally {
            setAddingToCart(null);
        }
    }, [cartItems, navigate]);



    // Memoize cart and wishlist checks for better performance
    const isInCart = useCallback((productId) => {
        return cartItems.some(item =>
            (item.productId?._id || item.productId) === productId
        );
    }, [cartItems]);



    return (
        <div className="flex w-full h-screen bg-gray-50 overflow-hidden">
            <Sidebar onFiltersChange={handleFiltersChange} />

            <div className="flex flex-col flex-1 overflow-y-auto">
                <Topbar />

                {/* Main Content */}
                <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                    {/* Header */}
                    <div className="mb-6">


                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                                    {categoryName}
                                </h1>
                                <p className="text-sm md:text-base text-gray-600 mt-1">
                                    {loading ? 'Loading...' : `${totalProducts} product${totalProducts !== 1 ? 's' : ''} found`}
                                </p>
                            </div>

                            {/* Mobile Filter Button */}
                            <button
                                onClick={() => setShowMobileFilters(true)}
                                className="md:hidden flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                <FaFilter />
                                <span>Filters</span>
                            </button>
                        </div>
                    </div>

                    {/* Legal Disclaimer */}
                    <div className="mb-6">
                        <LegalDisclaimer variant="compact" />
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                                    <div className="aspect-square bg-gray-200 animate-pulse"></div>
                                    <div className="p-4 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 md:py-24">
                            <div className="text-6xl md:text-8xl mb-4">🎆</div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">No Products Found</h2>
                            <p className="text-gray-600 text-center max-w-md mb-6">
                                We couldn't find any products in this category. Try adjusting your filters or check back later.
                            </p>
                            <button
                                onClick={() => navigate('/')}
                                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Browse All Products
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        inCart={isInCart(product._id)}
                                        addingToCart={addingToCart}
                                        onProductClick={handleProductClick}
                                        onAddToCart={addToCart}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-8">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>

                                    <div className="flex gap-2">
                                        {[...Array(totalPages)].map((_, index) => {
                                            const page = index + 1;
                                            // Show first page, last page, current page, and pages around current
                                            if (
                                                page === 1 ||
                                                page === totalPages ||
                                                (page >= currentPage - 1 && page <= currentPage + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`px-4 py-2 rounded-lg ${currentPage === page
                                                            ? 'bg-orange-500 text-white'
                                                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            } else if (
                                                page === currentPage - 2 ||
                                                page === currentPage + 2
                                            ) {
                                                return <span key={page} className="px-2">...</span>;
                                            }
                                            return null;
                                        })}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <Footer />
            </div>

            {/* Mobile Filters Modal */}
            {showMobileFilters && (
                <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
                    <div className="bg-white w-full max-h-[85vh] rounded-t-3xl overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between z-10">
                            <h3 className="text-lg font-bold text-gray-800">Filters</h3>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                                <FaTimes className="text-gray-600" />
                            </button>
                        </div>

                        <div className="p-4">
                            <p className="text-sm text-gray-600 mb-4">
                                Use the sidebar filters on desktop for a better filtering experience.
                            </p>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesSpecificpage;
