import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaMinus, FaPlus, FaHeart, FaShare } from 'react-icons/fa';
import { MdLocalShipping, MdSecurity, MdVerified } from 'react-icons/md';
import API from '../../api';

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

    // Review states
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewForm, setReviewForm] = useState({ rating: 5, reviewText: '' });
    const [editingReview, setEditingReview] = useState(null);
    const [submittingReview, setSubmittingReview] = useState(false);
    const [userReview, setUserReview] = useState(null);

    useEffect(() => {
        if (id) {
            fetchProduct();
            fetchSimilarProducts();
            checkWishlistStatus();
            checkCartStatus();
            fetchReviews();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await API.get(`/products/customer/product/${id}`);
            setProduct(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching product:', error);
            setError('Failed to load product. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fetchSimilarProducts = async () => {
        try {
            const response = await API.get('/products/customer');
            const productsData = Array.isArray(response.data) ? response.data : [];
            // Filter out current product and limit to 6 items
            const filtered = productsData.filter(p => p._id !== id).slice(0, 6);
            setSimilarProducts(filtered);
        } catch (error) {
            console.error('Error fetching similar products:', error);
        }
    };

    const checkWishlistStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await API.get('/wishlist');
            // Backend returns array directly, not wrapped in object
            const wishlistProductIds = (Array.isArray(response.data) ? response.data : []).map(item => item.productId._id);
            setIsInWishlist(wishlistProductIds.includes(id));
        } catch (error) {
            console.error('Error checking wishlist:', error);
        }
    };

    const toggleWishlist = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
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
                // Item already in wishlist, just update UI
                setIsInWishlist(true);
                alert('Already in wishlist');
            } else {
                alert(error.response?.data?.message || 'Failed to update wishlist');
            }
        } finally {
            setTogglingWishlist(false);
        }
    };

    const checkCartStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await API.get('/cart');
            const cartItems = response.data.items || [];
            const productInCart = cartItems.some(item =>
                (item.productId?._id || item.productId) === id
            );
            setIsInCart(productInCart);
        } catch (error) {
            console.error('Error checking cart:', error);
        }
    };

    const handleQuantityChange = (action) => {
        if (!product) return;
        if (action === 'increase' && quantity < product.stock) {
            setQuantity(quantity + 1);
        } else if (action === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            // Always add/update cart with current quantity
            // The backend will update quantity if product already exists in cart
            await API.post('/cart/add', {
                productId: product._id,
                quantity
            });
            setIsInCart(true); // Mark as in cart

            // Navigate to payment page
            navigate('/Payment');
        } catch (error) {
            console.error('Buy now error:', error);
            alert('Failed to process. Please try again.');
        }
    };

    const handleAddToCart = async () => {
        try {
            await API.post('/cart/add', {
                productId: product._id,
                quantity
            });
            setIsInCart(true); // Update state
            alert(`Added ${quantity} item(s) to cart successfully!`);
        } catch (error) {
            console.error('Add to cart error:', error);
            alert(error.response?.data?.message || 'Failed to add to cart');
        }
    };

    // Review Functions
    const fetchReviews = async () => {
        try {
            setLoadingReviews(true);
            const response = await API.get(`/reviews/${id}`);
            setReviews(Array.isArray(response.data) ? response.data : []);

            // Check if current user has reviewed
            const token = localStorage.getItem('token');
            if (token) {
                const userId = JSON.parse(localStorage.getItem('user'))?._id;
                const myReview = response.data.find(r => r.customerId._id === userId);
                setUserReview(myReview || null);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoadingReviews(false);
        }
    };

    const handleAddReview = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
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
            fetchReviews();
            fetchProduct(); // Refresh product to get updated rating
        } catch (error) {
            console.error('Add review error:', error);
            alert(error.response?.data?.message || 'Failed to add review');
        } finally {
            setSubmittingReview(false);
        }
    };

    const handleUpdateReview = async (e) => {
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
            fetchReviews();
            fetchProduct();
        } catch (error) {
            console.error('Update review error:', error);
            alert(error.response?.data?.message || 'Failed to update review');
        } finally {
            setSubmittingReview(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!confirm('Are you sure you want to delete your review?')) return;

        try {
            await API.delete(`/reviews/delete/${reviewId}`);
            alert('Review deleted successfully!');
            fetchReviews();
            fetchProduct();
        } catch (error) {
            console.error('Delete review error:', error);
            alert(error.response?.data?.message || 'Failed to delete review');
        }
    };

    const openEditReview = (review) => {
        setEditingReview(review._id);
        setReviewForm({
            rating: review.rating,
            reviewText: review.reviewText
        });
        setShowReviewForm(true);
    };

    const closeReviewForm = () => {
        setShowReviewForm(false);
        setEditingReview(null);
        setReviewForm({ rating: 5, reviewText: '' });
    };

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    };

    const getRatingDistribution = () => {
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach(review => {
            distribution[review.rating]++;
        });
        return distribution;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <p className="text-gray-600 text-lg mb-4">{error || 'Product not found'}</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                    Go Back to Products
                </button>
            </div>
        );
    }

    const productImages = product.images && product.images.length > 0
        ? product.images
        : ['https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000'];

    const inStock = product.stock > 0;

    return (
        <div className="min-h-screen bg-white">
            {/* Main Content */}
            <div className="max-w-screen-2xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left - Images (5 columns) */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-8">
                            {/* Main Image */}
                            <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
                                <img
                                    src={productImages[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-[500px] object-contain p-8"
                                />
                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <button
                                        onClick={toggleWishlist}
                                        disabled={togglingWishlist}
                                        className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-all"
                                    >
                                        {togglingWishlist ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                                        ) : (
                                            <FaHeart className={`w-5 h-5 transition-all ${isInWishlist
                                                ? 'text-red-500 animate-pulse'
                                                : 'text-gray-400 hover:text-red-400'
                                                }`} />
                                        )}
                                    </button>
                                    <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                                        <FaShare className="w-5 h-5 text-gray-700" />
                                    </button>
                                </div>
                            </div>

                            {/* Thumbnail Images */}
                            <div className="grid grid-cols-4 gap-3">
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
                                            className="w-full h-20 object-contain p-2"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Action Buttons - Desktop */}
                            <div className="hidden lg:flex gap-3 mt-6">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!inStock}
                                    className="flex-1 py-4 bg-orange-100 border-2 border-orange-500 text-orange-600 font-bold text-lg rounded-lg hover:bg-orange-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaShoppingCart className="w-5 h-5" />
                                    ADD TO CART
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

                    {/* Right - Product Details (7 columns) */}
                    <div className="lg:col-span-7">
                        {/* Product Title */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                        {/* Category */}
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
                                    {calculateAverageRating()}
                                </div>
                                <div className="flex items-center justify-center gap-1 mb-2">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            className={`w-6 h-6 ${index < Math.round(calculateAverageRating())
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
                                const distribution = getRatingDistribution();
                                const count = distribution[star];
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

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {similarProducts.map((item) => (
                            <div
                                key={item._id}
                                onClick={() => {
                                    navigate(`/product/${item._id}`);
                                    window.scrollTo(0, 0);
                                }}
                                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                            >
                                <div className="relative overflow-hidden bg-gray-50">
                                    <img
                                        src={item.images?.[0] || 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000'}
                                        alt={item.name}
                                        className="w-full h-40 object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-3">
                                    <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 h-10">{item.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-gray-900">₹{item.price?.toFixed(0) || '0'}</span>
                                        <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded font-bold capitalize">
                                            {item.category || 'General'}
                                        </span>
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
                        CART
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
        </div >
    );
};

export default Productview;
