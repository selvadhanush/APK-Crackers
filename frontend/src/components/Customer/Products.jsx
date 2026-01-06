import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import showToast from '../../utils/toast.jsx';
import { FaStar, FaClipboardList, FaCheckCircle, FaExclamationCircle, FaTag } from 'react-icons/fa';
import API from '../../../api';
import { SkeletonGrid } from '../Common/SkeletonLoaders';

const Products = ({ filters = {} }) => {
    const navigate = useNavigate();
    const [addingToCart, setAddingToCart] = useState(null);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [cartItems, setCartItems] = useState([]);

    const isLoggedIn = useMemo(() => {
        return !!localStorage.getItem('token');
    }, []);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                // Build query parameters from filters
                const queryParams = new URLSearchParams();
                queryParams.append('page', currentPage);

                // Check if any filters are active
                const hasActiveFilters =
                    (filters.priceRange && filters.priceRange[1] > 0) ||
                    (filters.selectedBrands && filters.selectedBrands.length > 0) ||
                    (filters.selectedAges && filters.selectedAges.length > 0) ||
                    (filters.selectedTags && filters.selectedTags.length > 0) ||
                    (filters.selectedRatings && filters.selectedRatings.length > 0) ||
                    filters.isEcoFriendly ||
                    filters.isGreenCrackers;

                let productsPromise;

                if (hasActiveFilters) {
                    // Use filter endpoint
                    if (filters.priceRange) {
                        queryParams.append('minPrice', filters.priceRange[0]);
                        if (filters.priceRange[1] > 0) {
                            queryParams.append('maxPrice', filters.priceRange[1]);
                        }
                    }

                    if (filters.selectedBrands && filters.selectedBrands.length > 0) {
                        queryParams.append('brands', filters.selectedBrands.join(','));
                    }

                    if (filters.selectedAges && filters.selectedAges.length > 0) {
                        queryParams.append('ageCategories', filters.selectedAges.join(','));
                    }

                    if (filters.selectedTags && filters.selectedTags.length > 0) {
                        queryParams.append('tags', filters.selectedTags.join(','));
                    }

                    if (filters.selectedRatings && filters.selectedRatings.length > 0) {
                        const minRating = Math.min(...filters.selectedRatings);
                        queryParams.append('minRating', minRating);
                    }

                    if (filters.isEcoFriendly) {
                        queryParams.append('isEcoFriendly', 'true');
                    }

                    if (filters.isGreenCrackers) {
                        queryParams.append('isGreenCrackers', 'true');
                    }

                    productsPromise = API.get(`/products/customer/filter?${queryParams.toString()}`);
                } else {
                    // Use regular pagination endpoint
                    productsPromise = API.get(`/products/customer/page?page=${currentPage}`);
                }

                const promises = [productsPromise];
                if (isLoggedIn) {
                    promises.push(API.get('/cart'));
                }

                const results = await Promise.allSettled(promises);

                if (results[0].status === 'fulfilled') {
                    setProducts(results[0].value.data.products || []);
                    setTotalPages(results[0].value.data.totalPages || 1);
                    setError('');
                } else {
                    setError('Failed to load products. Please try again later.');
                    setProducts([]);
                }

                if (results[1]?.status === 'fulfilled') {
                    setCartItems(results[1].value.data.items || []);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [currentPage, isLoggedIn, filters]);

    const isInCart = useCallback((productId) => {
        return cartItems.some(item =>
            (item.productId?._id || item.productId) === productId
        );
    }, [cartItems]);

    const getCartItem = useCallback((productId) => {
        return cartItems.find(item =>
            (item.productId?._id || item.productId) === productId
        );
    }, [cartItems]);



    const handleProductClick = useCallback((productId) => {
        navigate(`/product/${productId}`);
    }, [navigate]);

    const showNotification = useCallback((message, type) => {
        if (type === 'success') showToast.success(message);
        else if (type === 'error') showToast.error(message);
        else showToast.info(message);
    }, []);

    const handleAddToEnquiry = async (e, productId) => {
        e.stopPropagation();

        if (!isLoggedIn) {
            showNotification('Please login to add items to enquiry list', 'error');
            setTimeout(() => navigate('/Login'), 1500);
            return;
        }

        setAddingToCart(productId);

        try {
            await API.post('/cart/add', {
                productId: productId.toString(),
                quantity: 1
            });

            showNotification('Added to enquiry list successfully!', 'success');

            const response = await API.get('/cart');
            setCartItems(response.data.items || []);
        } catch (error) {
            console.error('Add to enquiry error:', error);
            if (error.response?.status === 401) {
                showNotification('Session expired. Please login again', 'error');
                setTimeout(() => navigate('/Login'), 1500);
            } else {
                showNotification(error.response?.data?.message || 'Failed to add to enquiry list', 'error');
            }
        } finally {
            setAddingToCart(null);
        }
    };

    const ProductCard = useCallback(({ product }) => {
        const inCart = isInCart(product._id);
        const cartItem = getCartItem(product._id);
        const availablePieces = product.stock_control?.available_pieces || 0;
        const sellingPrice = product.pricing?.selling_price || 0;
        const mrp = product.pricing?.mrp;
        const discount = product.discount_percentage;
        const brandName = product.brand || 'Standard';

        return (
            <div
                onClick={() => handleProductClick(product._id)}
                className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 cursor-pointer active:scale-98 flex flex-row sm:flex-col"
            >
                {/* Mobile: Details on Left, Image on Right | Desktop: Image on Top */}
                <div className="flex-1 sm:flex-none p-3 sm:p-4 order-1 sm:order-2">
                    <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 flex-1">{product.name}</h3>
                        <div className="flex items-center gap-1 bg-gray-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded cursor-pointer flex-shrink-0">
                            <FaStar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400" />
                            <span className="text-xs sm:text-sm font-medium text-gray-700">4.2</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <div className="flex flex-col">
                            <span className="text-[10px] sm:text-xs text-gray-500 font-medium mb-0.5 sm:mb-1">Category</span>
                            <span className="text-xs sm:text-sm font-bold text-gray-800 capitalize">{product.category?.main || 'General'}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] sm:text-xs text-gray-500 font-medium mb-0.5 sm:mb-1">Brand</span>
                            <span className="text-xs sm:text-sm font-bold text-orange-600 capitalize">
                                {brandName}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100 gap-2">
                        <div className="flex flex-col">
                            <span className="text-base sm:text-lg md:text-xl font-black text-gray-900 leading-none">
                                ₹{sellingPrice >= 1000
                                    ? Math.round(sellingPrice)
                                    : (sellingPrice % 1 === 0 ? Math.round(sellingPrice) : sellingPrice.toFixed(1))}
                            </span>
                            <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[8px] sm:text-[9px] font-bold text-orange-500 uppercase tracking-widest px-1.5 py-0.5 bg-orange-50 rounded border border-orange-100 whitespace-nowrap">
                                    E. Price
                                </span>
                                {mrp > sellingPrice && (
                                    <span className="text-[10px] sm:text-xs text-gray-400 line-through font-medium">
                                        ₹{mrp >= 1000
                                            ? Math.round(mrp)
                                            : (mrp % 1 === 0 ? Math.round(mrp) : mrp.toFixed(1))}
                                    </span>
                                )}
                            </div>
                        </div>

                        {inCart ? (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate('/enquiry-list');
                                }}
                                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white border-2 border-orange-500 text-orange-600 rounded-lg transition-all shadow-sm hover:shadow-md hover:bg-orange-50 cursor-pointer active:scale-95"
                            >
                                <FaCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                                    In List ({cartItem?.quantity || 1})
                                </span>
                            </button>
                        ) : (
                            <button
                                onClick={(e) => handleAddToEnquiry(e, product._id)}
                                disabled={addingToCart === product._id || availablePieces <= 0}
                                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-white rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 ${addingToCart === product._id || availablePieces <= 0
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
                                            {availablePieces <= 0 ? 'Out' : 'Add'}
                                        </span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile: Image on Right | Desktop: Image on Top */}
                <div className="relative w-32 sm:w-full aspect-square sm:aspect-[4/3] overflow-hidden cursor-pointer flex-shrink-0 order-2 sm:order-1">
                    <img
                        src={product.images?.[0] || '/images/placeholder.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = '/images/placeholder.jpg';
                            e.target.onerror = null; // Prevent infinite loop if placeholder also fails
                        }}
                    />

                    {discount > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                            <FaTag className="w-2 h-2" />
                            {discount}% OFF
                        </div>
                    )}
                    {availablePieces <= 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-bold text-sm sm:text-base md:text-lg">Out of Stock</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }, [addingToCart, isInCart, getCartItem, handleProductClick, handleAddToEnquiry, navigate]);

    return (
        <div className="w-full bg-gray-50 pb-20 md:pb-0 mt-10">


            <div className="p-3 sm:p-4 md:p-6">

                {loading ? (
                    <div className="py-4">
                        <SkeletonGrid items={8} columns={4} />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4">
                        <FaExclamationCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mb-4" />
                        <p className="text-gray-600 text-base sm:text-lg text-center">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-5 sm:px-6 py-2 sm:py-2.5 bg-orange-500 text-white text-sm sm:text-base rounded-lg hover:bg-orange-600 transition-all active:scale-95"
                        >
                            Retry
                        </button>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 sm:py-20">
                        <p className="text-gray-600 text-base sm:text-lg">No products found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}

                {!loading && !error && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold text-sm sm:text-base text-gray-700 hover:border-orange-500 hover:text-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-700 active:scale-95"
                        >
                            <span className="hidden sm:inline">Previous</span>
                            <span className="sm:hidden">Prev</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700 font-semibold text-sm sm:text-base">
                                Page {currentPage} of {totalPages}
                            </span>
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold text-sm sm:text-base text-gray-700 hover:border-orange-500 hover:text-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-700 active:scale-95"
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