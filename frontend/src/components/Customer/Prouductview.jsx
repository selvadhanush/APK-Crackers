import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaMinus, FaPlus, FaShare } from 'react-icons/fa';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { MdLocalShipping, MdSecurity, MdVerified } from 'react-icons/md';
import API from '../../../api';
import Topbar from './Topbar';
import Footer from './Footer';

const Productview = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [togglingWishlist, setTogglingWishlist] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewForm, setReviewForm] = useState({ rating: 5, reviewText: '' });
    const [editingReview, setEditingReview] = useState(null);
    const [submittingReview, setSubmittingReview] = useState(false);
    const [userReview, setUserReview] = useState(null);

    // Memoize token check
    const isLoggedIn = useMemo(() => !!localStorage.getItem('token'), []);

    // Fetch all data in parallel for faster loading
    useEffect(() => {
        if (!id) return;

        const fetchAllData = async () => {
            setLoading(true);
            try {
                // Fetch product first (most important)
                const productPromise = API.get(`/products/customer/product/${id}`);
                const similarPromise = API.get('/products/customer');
                const reviewsPromise = API.get(`/reviews/${id}`);

                // Fetch wishlist and cart only if logged in
                const promises = [productPromise, similarPromise, reviewsPromise];
                if (isLoggedIn) {
                    promises.push(API.get('/wishlist'));
                    promises.push(API.get('/cart'));
                }

                const results = await Promise.allSettled(promises);

                // Handle product
                if (results[0].status === 'fulfilled') {
                    setProduct(results[0].value.data);
                    setError('');
                } else {
                    setError('Failed to load product. Please try again later.');
                }

                // Handle similar products
                if (results[1].status === 'fulfilled') {
                    const productsData = Array.isArray(results[1].value.data) ? results[1].value.data : [];
                    const filtered = productsData.filter(p => p._id !== id).slice(0, 6);
                    setSimilarProducts(filtered);
                }

                // Handle reviews
                if (results[2].status === 'fulfilled') {
                    const reviewsData = Array.isArray(results[2].value.data) ? results[2].value.data : [];
                    setReviews(reviewsData);

                    if (isLoggedIn) {
                        const userId = JSON.parse(localStorage.getItem('user'))?._id;
                        const myReview = reviewsData.find(r => r.customerId._id === userId);
                        setUserReview(myReview || null);
                    }
                }

                // Handle wishlist
                if (results[3]?.status === 'fulfilled') {
                    const wishlistProductIds = (Array.isArray(results[3].value.data) ? results[3].value.data : [])
                        .map(item => item.productId._id);
                    setIsInWishlist(wishlistProductIds.includes(id));
                }

                // Handle cart
                if (results[4]?.status === 'fulfilled') {
                    const cartItems = results[4].value.data.items || [];
                    const productInCart = cartItems.some(item =>
                        (item.productId?._id || item.productId) === id
                    );
                    setIsInCart(productInCart);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load product. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [id, isLoggedIn]);

    // Auto-rotate images
    useEffect(() => {
        if (!product || !product.images || product.images.length <= 1) return;

        const interval = setInterval(() => {
            setSelectedImage((prev) => {
                const totalImages = product.images.length;
                return (prev + 1) % totalImages;
            });
        }, 3000); // Increased to 3 seconds for better UX

        return () => clearInterval(interval);
    }, [product]);

    const toggleWishlist = useCallback(async () => {
        if (!isLoggedIn) {
            alert('Please login to add items to wishlist');
            navigate('/Login');
            return;
        }

        setTogglingWishlist(true);

        try {
            if (isInWishlist) {
                await API.delete(`/wishlist/remove/${id}`);
                setIsInWishlist(false);
                alert('Removed from wishlist');
            } else {
                await API.post('/wishlist/add', { productId: id });
                setIsInWishlist(true);
                alert('Added to wishlist!');
            }
        } catch (error) {
            console.error('Wishlist error:', error);
            if (error.response?.status === 401) {
                alert('Session expired. Please login again');
                navigate('/Login');
            } else if (error.response?.status === 400 && error.response?.data?.message === 'Already in wishlist') {
                setIsInWishlist(true);
                alert('Already in wishlist');
            } else {
                alert(error.response?.data?.message || 'Failed to update wishlist');
            }
        } finally {
            setTogglingWishlist(false);
        }
    }, [isInWishlist, id, isLoggedIn, navigate]);

    const handleQuantityChange = useCallback((action) => {
        if (!product) return;
        if (action === 'increase' && quantity < product.stock) {
            setQuantity(quantity + 1);
        } else if (action === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    }, [product, quantity]);

    const handlePlaceOrder = useCallback(async () => {
        if (isInCart) {
            navigate('/Payment');
            return;
        }

        try {
            await API.post('/cart/add', {
                productId: product._id,
                quantity
            });
            setIsInCart(true);
            navigate('/Payment');
        } catch (error) {
            console.error('Buy now error:', error);
            alert('Failed to process. Please try again.');
        }
    }, [isInCart, product, quantity, navigate]);

    const handleAddToCart = useCallback(async () => {
        if (isInCart) {
            navigate('/Cart');
            return;
        }

        try {
            await API.post('/cart/add', {
                productId: product._id,
                quantity
            });
            setIsInCart(true);
            alert(`Added ${quantity} item(s) to cart successfully!`);
        } catch (error) {
            console.error('Add to cart error:', error);
            alert(error.response?.data?.message || 'Failed to add to cart');
        }
    }, [isInCart, product, quantity, navigate]);

    const handleAddReview = useCallback(async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert('Please login to add a review');
            navigate('/Login');
            return;
        }

        setSubmittingReview(true);
        try {
            await API.post('/reviews/add', {
                productId: id,
                rating: reviewForm.rating,
                reviewText: reviewForm.reviewText
            });
            alert('Review added successfully!');
            setShowReviewForm(false);
            setReviewForm({ rating: 5, reviewText: '' });

            // Refresh reviews
            const response = await API.get(`/reviews/${id}`);
            setReviews(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Add review error:', error);
            alert(error.response?.data?.message || 'Failed to add review');
        } finally {
            setSubmittingReview(false);
        }
    }, [id, reviewForm, isLoggedIn, navigate]);

    const handleUpdateReview = useCallback(async (e) => {
        e.preventDefault();
        setSubmittingReview(true);
        try {
            await API.put(`/reviews/update/${editingReview}`, {
                rating: reviewForm.rating,
                reviewText: reviewForm.reviewText
            });
            alert('Review updated successfully!');
            setShowReviewForm(false);
            setEditingReview(null);
            setReviewForm({ rating: 5, reviewText: '' });

            // Refresh reviews
            const response = await API.get(`/reviews/${id}`);
            setReviews(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Update review error:', error);
            alert(error.response?.data?.message || 'Failed to update review');
        } finally {
            setSubmittingReview(false);
        }
    }, [editingReview, reviewForm, id]);

    const handleDeleteReview = useCallback(async (reviewId) => {
        if (!confirm('Are you sure you want to delete your review?')) return;

        try {
            await API.delete(`/reviews/delete/${reviewId}`);
            alert('Review deleted successfully!');

            // Refresh reviews
            const response = await API.get(`/reviews/${id}`);
            setReviews(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Delete review error:', error);
            alert(error.response?.data?.message || 'Failed to delete review');
        }
    }, [id]);

    const openEditReview = useCallback((review) => {
        setEditingReview(review._id);
        setReviewForm({
            rating: review.rating,
            reviewText: review.reviewText
        });
        setShowReviewForm(true);
    }, []);

    const closeReviewForm = useCallback(() => {
        setShowReviewForm(false);
        setEditingReview(null);
        setReviewForm({ rating: 5, reviewText: '' });
    }, []);

    // Memoize calculations
    const averageRating = useMemo(() => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    }, [reviews]);

    const ratingDistribution = useMemo(() => {
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach(review => {
            distribution[review.rating]++;
        });
        return distribution;
    }, [reviews]);

    const productImages = useMemo(() =>
        product?.images && product.images.length > 0
            ? product.images
            : ['https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000']
        , [product]);

    const inStock = useMemo(() => product?.stock > 0, [product]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">⚠️</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
                    <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist'}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
                    >
                        Browse All Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Topbar />
            <div className="max-w-screen-2xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5">
                        <div className="sticky top-8">
                            <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden mb-4 shadow-sm">
                                <img
                                    src={productImages[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] object-contain p-4 sm:p-6 md:p-8"
                                    loading="lazy"
                                />
                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <button
                                        onClick={toggleWishlist}
                                        disabled={togglingWishlist}
                                        className="p-2 sm:p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-all"
                                    >
                                        {togglingWishlist ? (
                                            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-orange-500"></div>
                                        ) : (
                                            <BsFillBagHeartFill className={`w-4 h-4 sm:w-5 sm:h-5 transition-all ${isInWishlist
                                                ? 'text-red-500'
                                                : 'text-gray-400 hover:text-red-400'
                                                }`} />
                                        )}
                                    </button>
                                    <button className="p-2 sm:p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                                        <FaShare className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-2 sm:gap-3">
                                {productImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`border-2 rounded-lg overflow-hidden transition-all ${selectedImage === index
                                            ? 'border-orange-500'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-16 sm:h-20 object-contain p-1 sm:p-2"
                                            loading="lazy"
                                        />
                                    </button>
                                ))}
                            </div>

                            <div className="hidden lg:flex gap-3 mt-6">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!inStock}
                                    className="flex-1 py-4 bg-orange-100 border-2 border-orange-500 text-orange-600 font-bold text-lg rounded-lg hover:bg-orange-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaShoppingCart className="w-5 h-5" />
                                    {isInCart ? 'GO TO CART' : 'ADD TO CART'}
                                </button>
                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={!inStock}
                                    className="flex-1 py-4 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    BUY NOW
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                            <span className="px-3 py-2 bg-orange-100 text-orange-700 rounded font-bold text-sm capitalize">
                                {product.category || 'General'}
                            </span>
                        </div>

                        {/* Price Section */}
                        <div className="mb-6 pb-6 border-b border-gray-200">
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-4xl font-bold text-gray-900">₹{product.price?.toFixed(2) || '0.00'}</span>
                            </div>
                            <p className="text-sm text-gray-600">+ Free Delivery • Inclusive of all taxes</p>
                        </div>

                        {/* Stock */}
                        <div className="mb-6 pb-6 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                {inStock ? (
                                    <>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-green-600 font-bold">In Stock</span>
                                        <span className="text-gray-600">({product.stock} units available)</span>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span className="text-red-600 font-bold">Out of Stock</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6 pb-6 border-b border-gray-200">
                            <p className="text-sm font-bold text-gray-700 mb-3">Quantity:</p>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => handleQuantityChange('decrease')}
                                    disabled={quantity <= 1}
                                    className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaMinus className="w-4 h-4 text-gray-700" />
                                </button>
                                <span className="text-2xl font-bold text-gray-900 w-16 text-center border-2 border-gray-300 rounded-lg py-2">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange('increase')}
                                    disabled={quantity >= product.stock}
                                    className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaPlus className="w-4 h-4 text-gray-700" />
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                            <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                                <MdLocalShipping className="w-10 h-10 text-orange-500 mb-2" />
                                <p className="text-xs font-bold text-gray-900">Free Delivery</p>
                                <p className="text-xs text-gray-600">On all orders</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                                <MdSecurity className="w-10 h-10 text-orange-500 mb-2" />
                                <p className="text-xs font-bold text-gray-900">Secure Payment</p>
                                <p className="text-xs text-gray-600">100% Protected</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                                <MdVerified className="w-10 h-10 text-orange-500 mb-2" />
                                <p className="text-xs font-bold text-gray-900">Certified Safe</p>
                                <p className="text-xs text-gray-600">Quality Assured</p>
                            </div>
                        </div>

                        {/* Product Description */}
                        {product.description && (
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-3">Product Description</h2>
                                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                        {!userReview && (
                            <button
                                onClick={() => setShowReviewForm(true)}
                                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
                            >
                                Write a Review
                            </button>
                        )}
                    </div>

                    {/* Rating Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Average Rating */}
                        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200">
                            <div className="text-center">
                                <div className="text-5xl font-bold text-gray-900 mb-2">
                                    {averageRating}
                                </div>
                                <div className="flex items-center justify-center gap-1 mb-2">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            className={`w-6 h-6 ${index < Math.round(averageRating)
                                                ? 'text-yellow-400'
                                                : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-600">Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</p>
                            </div>
                        </div>

                        {/* Rating Distribution */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = ratingDistribution[star];
                                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                                return (
                                    <div key={star} className="flex items-center gap-3 mb-2">
                                        <span className="text-sm font-semibold text-gray-700 w-8">{star}★</span>
                                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                                            <div
                                                className="bg-yellow-400 h-3 rounded-full transition-all"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-600 w-8">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Review Form */}
                    {showReviewForm && (
                        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200 mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {editingReview ? 'Edit Your Review' : 'Write a Review'}
                                </h3>
                                <button
                                    onClick={closeReviewForm}
                                    className="text-gray-600 hover:text-gray-800 font-bold text-xl"
                                >
                                    ×
                                </button>
                            </div>

                            <form onSubmit={editingReview ? handleUpdateReview : handleAddReview}>
                                {/* Star Rating Selector */}
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Your Rating
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <FaStar
                                                    className={`w-8 h-8 ${star <= reviewForm.rating
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Review Text */}
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Your Review
                                    </label>
                                    <textarea
                                        value={reviewForm.reviewText}
                                        onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                                        rows="4"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                                        placeholder="Share your experience with this product..."
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={closeReviewForm}
                                        className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submittingReview}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {submittingReview ? 'Submitting...' : editingReview ? 'Update Review' : 'Submit Review'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Reviews List */}
                    {loadingReviews ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                            <FaStar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
                            <p className="text-gray-600 mb-6">Be the first to review this product!</p>
                            <button
                                onClick={() => setShowReviewForm(true)}
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
                            >
                                Write a Review
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review) => {
                                const isUserReview = userReview && userReview._id === review._id;
                                return (
                                    <div
                                        key={review._id}
                                        className={`p-6 rounded-2xl border-2 transition-all ${isUserReview
                                            ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="font-bold text-gray-900">
                                                        {review.customerId?.name || 'Anonymous'}
                                                    </h4>
                                                    {isUserReview && (
                                                        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded">
                                                            Your Review
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="flex gap-1">
                                                        {[...Array(5)].map((_, index) => (
                                                            <FaStar
                                                                key={index}
                                                                className={`w-4 h-4 ${index < review.rating
                                                                    ? 'text-yellow-400'
                                                                    : 'text-gray-300'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                {review.reviewText && (
                                                    <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
                                                )}
                                            </div>

                                            {/* Edit/Delete Buttons for User's Own Review */}
                                            {isUserReview && (
                                                <div className="flex gap-2 ml-4">
                                                    <button
                                                        onClick={() => openEditReview(review)}
                                                        className="px-4 py-2 bg-orange-100 text-orange-600 font-semibold rounded-lg hover:bg-orange-200 transition-all text-sm"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteReview(review._id)}
                                                        className="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-all text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Similar Products Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Similar Products</h2>
                        <button
                            onClick={() => navigate('/')}
                            className="text-orange-600 hover:text-orange-700 font-semibold"
                        >
                            View All →
                        </button>
                    </div>

                    {/* Mobile: Horizontal cards (1 per row), Tablet+: Vertical cards in grid */}
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {similarProducts.map((item) => (
                            <div
                                key={item._id}
                                onClick={() => {
                                    navigate(`/product/${item._id}`);
                                    window.scrollTo(0, 0);
                                }}
                                className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-orange-400 transition-all duration-300 cursor-pointer group"
                            >
                                {/* Mobile: Horizontal layout, Desktop: Vertical layout */}
                                <div className="flex md:flex-col">
                                    {/* Image Section */}
                                    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 w-40 md:w-full flex-shrink-0">
                                        <img
                                            src={item.images?.[0] || 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000'}
                                            alt={item.name}
                                            className="w-full h-48 md:h-52 object-contain p-4 md:p-4 group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                        {/* Stock Badge */}
                                        <div className="absolute top-3 right-3">
                                            {item.stock > 0 ? (
                                                <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                                                    In Stock
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                                                    Out of Stock
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Details Section */}
                                    <div className="p-4 md:p-4 flex-1 flex flex-col">
                                        {/* Category Badge */}
                                        <div className="mb-2">
                                            <span className="inline-block text-xs px-2.5 py-1 bg-orange-100 text-orange-700 rounded-lg font-bold capitalize">
                                                {item.category || 'General'}
                                            </span>
                                        </div>

                                        {/* Product Name */}
                                        <h3 className="font-bold text-gray-900 text-base md:text-base mb-2 line-clamp-2 leading-tight">
                                            {item.name}
                                        </h3>

                                        {/* Description - Desktop Only */}
                                        {item.description && (
                                            <p className="hidden md:block text-xs text-gray-600 mb-2 line-clamp-2 leading-relaxed">
                                                {item.description}
                                            </p>
                                        )}

                                        {/* Spacer to push bottom content down */}
                                        <div className="flex-1"></div>

                                        {/* Price Section */}
                                        <div className="mb-2">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-xl md:text-2xl font-bold text-gray-900">
                                                    ₹{item.price?.toFixed(0) || '0'}
                                                </span>
                                                <span className="text-xs text-gray-400 line-through">
                                                    ₹{((item.price || 0) * 1.2).toFixed(0)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Stock Availability */}
                                        <div className="mb-3">
                                            {item.stock > 0 ? (
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span className="text-xs text-green-600 font-semibold">
                                                        {item.stock} units available
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                    <span className="text-xs text-red-600 font-semibold">
                                                        Currently unavailable
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* View Details Button */}
                                        <button className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg text-sm">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
                <div className="flex gap-3">
                    <button
                        onClick={handleAddToCart}
                        disabled={!inStock}
                        className="flex-1 py-3 bg-orange-100 border-2 border-orange-500 text-orange-600 font-bold rounded-lg flex items-center justify-center gap-2"
                    >
                        <FaShoppingCart className="w-5 h-5" />
                        {isInCart ? 'GO TO CART' : 'CART'}
                    </button>
                    <button
                        onClick={handlePlaceOrder}
                        disabled={!inStock}
                        className="flex-1 py-3 bg-orange-500 text-white font-bold rounded-lg"
                    >
                        BUY NOW
                    </button>
                </div>
            </div>

            <Footer />
        </div >
    );
};

export default Productview;
