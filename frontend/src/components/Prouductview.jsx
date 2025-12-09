import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaMinus, FaPlus, FaHeart, FaShare } from 'react-icons/fa';
import { MdLocalShipping, MdSecurity, MdVerified } from 'react-icons/md';

const Productview = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    // Dummy product data
    const product = {
        id: id || 1,
        name: 'Premium Diwali Cracker Collection',
        price: 499.00,
        originalPrice: 699.00,
        discount: 29,
        rating: 4.2,
        reviews: 902,
        age: '16+',
        inStock: true,
        stockCount: 45,
        images: [
            'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000',
            'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000',
            'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000',
            'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000',
        ],
        description: 'Experience the magic of Diwali with our Premium Cracker Collection! This carefully curated set includes a variety of colorful and exciting firecrackers that will light up your celebrations. Perfect for family gatherings and festive occasions. Made with eco-friendly materials and certified for safety.',
        features: [
            'High-quality, eco-friendly materials',
            'Vibrant colors and stunning effects',
            'Safe for outdoor use',
            'Includes variety pack of 20+ items',
            'Certified by safety standards',
            'Long-lasting sparkle effects',
            'Perfect for all age groups',
            'Tested for quality assurance'
        ],
        specifications: {
            brand: 'Premium Fireworks',
            weight: '2.5 kg',
            dimensions: '30cm x 20cm x 15cm',
            type: 'Mixed Crackers',
            burnTime: 'Varies by item',
            safetyRating: 'Grade A',
            manufacturer: 'Sivakasi Fireworks Ltd.',
            country: 'India'
        },
        tags: ['Sound', 'Thunder', 'Blast']
    };

    // Similar products data
    const similarProducts = [
        {
            id: 2,
            name: 'Sparkler Delight Pack',
            price: 299.00,
            rating: 4.5,
            reviews: 654,
            age: '12+',
            image: 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000'
        },
        {
            id: 3,
            name: 'Thunder Blast Special',
            price: 599.00,
            rating: 4.3,
            reviews: 432,
            age: '18+',
            image: 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000'
        },
        {
            id: 4,
            name: 'Colorful Rocket Set',
            price: 449.00,
            rating: 4.1,
            reviews: 321,
            age: '16+',
            image: 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000'
        },
        {
            id: 5,
            name: 'Family Fun Combo',
            price: 799.00,
            rating: 4.6,
            reviews: 876,
            age: '14+',
            image: 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000'
        },
        {
            id: 6,
            name: 'Night Sky Collection',
            price: 549.00,
            rating: 4.4,
            reviews: 543,
            age: '16+',
            image: 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000'
        },
        {
            id: 7,
            name: 'Celebration Pack',
            price: 399.00,
            rating: 4.3,
            reviews: 432,
            age: '14+',
            image: 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000'
        }
    ];

    const handleQuantityChange = (action) => {
        if (action === 'increase' && quantity < product.stockCount) {
            setQuantity(quantity + 1);
        } else if (action === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handlePlaceOrder = () => {
        navigate('/checkout', { state: { product, quantity } });
    };

    const handleAddToCart = () => {
        console.log('Added to cart:', { product, quantity });
    };

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
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-[500px] object-contain p-8"
                                />
                                {product.discount > 0 && (
                                    <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded text-sm font-bold shadow-lg">
                                        {product.discount}% OFF
                                    </div>
                                )}
                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                                        <FaHeart className="w-5 h-5 text-gray-700" />
                                    </button>
                                    <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                                        <FaShare className="w-5 h-5 text-gray-700" />
                                    </button>
                                </div>
                            </div>

                            {/* Thumbnail Images */}
                            <div className="grid grid-cols-4 gap-3">
                                {product.images.map((image, index) => (
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
                                    disabled={!product.inStock}
                                    className="flex-1 py-4 bg-orange-100 border-2 border-orange-500 text-orange-600 font-bold text-lg rounded-lg hover:bg-orange-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaShoppingCart className="w-5 h-5" />
                                    ADD TO CART
                                </button>
                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={!product.inStock}
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

                        {/* Rating & Reviews */}
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                            <div className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded">
                                <span className="font-bold">{product.rating}</span>
                                <FaStar className="w-4 h-4" />
                            </div>
                            <span className="text-gray-600">{product.reviews.toLocaleString()} Ratings & Reviews</span>
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded font-bold text-sm">
                                Age {product.age}
                            </span>
                        </div>

                        {/* Price Section */}
                        <div className="mb-6 pb-6 border-b border-gray-200">
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-4xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                                {product.originalPrice > product.price && (
                                    <>
                                        <span className="text-2xl text-gray-500 line-through">₹{product.originalPrice.toFixed(2)}</span>
                                        <span className="text-lg text-green-600 font-bold">{product.discount}% off</span>
                                    </>
                                )}
                            </div>
                            <p className="text-sm text-gray-600">+ Free Delivery • Inclusive of all taxes</p>
                        </div>

                        {/* Stock & Tags */}
                        <div className="mb-6 pb-6 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    {product.inStock ? (
                                        <>
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <span className="text-green-600 font-bold">In Stock</span>
                                            <span className="text-gray-600">({product.stockCount} units available)</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <span className="text-red-600 font-bold">Out of Stock</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-bold text-gray-700 mb-2">Sound Tags:</p>
                                <div className="flex gap-2">
                                    {product.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
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
                                    disabled={quantity >= product.stockCount}
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
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Product Description</h2>
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Key Features */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Key Features</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Specifications */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Specifications</h2>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <table className="w-full">
                                    <tbody>
                                        {Object.entries(product.specifications).map(([key, value], index) => (
                                            <tr key={key} className={index !== 0 ? 'border-t border-gray-200' : ''}>
                                                <td className="py-3 text-sm font-semibold text-gray-600 capitalize w-1/3">
                                                    {key.replace(/([A-Z])/g, ' $1')}
                                                </td>
                                                <td className="py-3 text-sm text-gray-900">{value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
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
                                key={item.id}
                                onClick={() => {
                                    navigate(`/product/${item.id}`);
                                    window.scrollTo(0, 0);
                                }}
                                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                            >
                                <div className="relative overflow-hidden bg-gray-50">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-40 object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-3">
                                    <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 h-10">{item.name}</h3>
                                    <div className="flex items-center gap-1 mb-2">
                                        <div className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded text-xs">
                                            <span className="font-bold">{item.rating}</span>
                                            <FaStar className="w-2 h-2" />
                                        </div>
                                        <span className="text-xs text-gray-500">({item.reviews})</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-gray-900">₹{item.price.toFixed(0)}</span>
                                        <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded font-bold">
                                            {item.age}
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
                        disabled={!product.inStock}
                        className="flex-1 py-3 bg-orange-100 border-2 border-orange-500 text-orange-600 font-bold rounded-lg flex items-center justify-center gap-2"
                    >
                        <FaShoppingCart className="w-5 h-5" />
                        CART
                    </button>
                    <button
                        onClick={handlePlaceOrder}
                        disabled={!product.inStock}
                        className="flex-1 py-3 bg-orange-500 text-white font-bold rounded-lg"
                    >
                        BUY NOW
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Productview;
