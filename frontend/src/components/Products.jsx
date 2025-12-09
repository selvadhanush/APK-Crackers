import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaChevronDown, FaShoppingCart } from 'react-icons/fa';

const Products = () => {
    const navigate = useNavigate();
    const [filterDropdown, setFilterDropdown] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('All');

    // Sample product data with emoji tags
    const products = Array(8).fill(null).map((_, index) => ({
        id: index + 1,
        name: 'Exaple Cracker',
        rating: 4.2,
        reviews: 902,
        age: '16+',
        tags: ['💥', '⚡', '🔊'],
        price: 499.00,
        image: 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000'
    }));

    const filterOptions = ['All', 'Night', 'Day'];

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="flex-1 bg-gray-50 overflow-y-auto">
            {/* Header Section */}
            <div className="bg-white px-6 py-2">
                <div className="flex items-center justify-between">
                    {/* Left - Title */}
                    <h1 className="text-xl font-bold text-gray-800">All Crackers</h1>

                    {/* Right - Action Buttons */}
                    <div className="flex items-center gap-3">
                        {/* Scan Barcode Button */}
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-full hover:border-gray-400 transition-all cursor-pointer">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                                <path d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01" strokeWidth="2" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Scan Barcode</span>
                        </button>

                        {/* Slicedice Button */}
                        <button className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-all cursor-pointer">
                            Slicedice
                        </button>

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

            {/* Products Grid - 4 columns */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            onClick={() => handleProductClick(product.id)}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
                        >
                            {/* Product Image */}
                            <div className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>


                            {/* Product Info */}
                            <div className="p-4">
                                {/* Product Name and Rating */}
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-base font-semibold text-gray-800">{product.name}</h3>
                                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded cursor-pointer">
                                        <FaStar className="w-3 h-3 text-yellow-400" />
                                        <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                                        <span className="text-xs text-gray-500">({product.reviews})</span>
                                    </div>
                                </div>

                                {/* Age and Tags Row */}
                                <div className="flex items-center justify-between mb-3">
                                    {/* AGE */}
                                    <div className="flex flex-col">
                                        <span className="text-m text-gray-500 font-medium l mb-1">AGE</span>
                                        <span className="text-sm font-bold text-gray-800">{product.age}</span>
                                    </div>

                                    {/* Tags with Emojis and Black Background */}
                                    <div className="flex flex-col items-end">
                                        <span className="text-m text-gray-500 font-medium mb-1">Tages</span>
                                        <div className="flex items-center gap-1">
                                            {product.tags.map((emoji, idx) => (
                                                <div key={idx} className="w-6 h-6 rounded-full bg-black flex items-center justify-center border-2 border-white shadow-sm">
                                                    <span className="text-xs">{emoji}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Price and Action Buttons */}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <span className="text-lg font-bold text-gray-800">₹{product.price.toFixed(2)}</span>
                                    <div className="flex items-center gap-2">
                                        {/* Add to Cart Icon Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                console.log('Added to cart');
                                            }}
                                            className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all cursor-pointer shadow-sm hover:shadow-md"
                                        >
                                            <FaShoppingCart className="w-4 h-4" />
                                        </button>
                                        {/* Buy Now Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleProductClick(product.id);
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group cursor-pointer"
                                        >
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-orange-500">Buy now</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
