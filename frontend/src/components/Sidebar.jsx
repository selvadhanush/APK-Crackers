import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaInfinity,
    FaSun,
    FaShoppingBag,
    FaFilter,
    FaSmile,
    FaArrowLeft,
    FaSearch,
    FaStar,
    FaChevronDown,
    FaChevronUp,
    FaCog,
    FaStore,
    FaHeart
} from 'react-icons/fa';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [customPrice, setCustomPrice] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false);

    const [isEcoFriendly, setIsEcoFriendly] = useState(false);
    const [isGreenCrackers, setIsGreenCrackers] = useState(false);

    const [isBrandsOpen, setIsBrandsOpen] = useState(false);
    const [isAgeOpen, setIsAgeOpen] = useState(false);
    const [isTagsOpen, setIsTagsOpen] = useState(false);
    const [isStarRatingOpen, setIsStarRatingOpen] = useState(false);
    const [selectedRatings, setSelectedRatings] = useState({});

    const [selectedPrices, setSelectedPrices] = useState({ 0: true });
    const [selectedBrands, setSelectedBrands] = useState({});
    const [selectedAges, setSelectedAges] = useState({});
    const [selectedTags, setSelectedTags] = useState({});

    useEffect(() => {
        // Check if seller is logged in
        const checkSellerLogin = () => {
            const userRole = localStorage.getItem('userRole');
            const token = localStorage.getItem('token');
            setIsSellerLoggedIn(userRole === 'seller' && !!token);
        };

        checkSellerLogin();

        // Listen for storage changes (in case user logs in/out in another tab)
        window.addEventListener('storage', checkSellerLogin);

        return () => window.removeEventListener('storage', checkSellerLogin);
    }, []);

    const handleBusinessAccountClick = () => {
        if (isSellerLoggedIn) {
            navigate('/seller-home');
        } else {
            navigate('/seller-login');
        }
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const priceOptions = [
        { label: 'All Price', count: 'EX: 800' },
        { label: 'Below ₹10,000', count: 'EX: 800' },
        { label: '₹10,000 - ₹25,000', count: 'EX: 800' },
        { label: '₹25,000 - ₹50,000', count: 'EX: 800' },
    ];

    const crackerBrands = [
        'Standard Fireworks',
        'Ayyan Fireworks',
        'Cock Brand',
        'Sony Fireworks',
        'Celebration Crackers'
    ];

    const ageCategories = [
        { label: 'Kids (5-12 years)', value: 'kids' },
        { label: 'Teenagers (13-17 years)', value: 'teens' },
        { label: 'Adults (18-60 years)', value: 'adults' },
        { label: 'Elders (60+ years)', value: 'elders' }
    ];

    const tags = [
        { label: 'Thunder', emoji: '⚡', value: 'thunder' },
        { label: 'Sound', emoji: '🔊', value: 'sound' },
        { label: 'Blast', emoji: '💥', value: 'blast' }
    ];

    const handlePriceChange = (index) => {
        if (index === 0) {
            if (selectedPrices[0]) {
                const hasOtherSelection = Object.keys(selectedPrices).some(key => parseInt(key) !== 0 && selectedPrices[key]);
                if (!hasOtherSelection) {
                    return;
                }
            }
        }
        setSelectedPrices(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleBrandChange = (index) => {
        setSelectedBrands(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const handleAgeChange = (index) => {
        setSelectedAges(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const handleTagChange = (index) => {
        setSelectedTags(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const handleRatingChange = (rating) => {
        setSelectedRatings(prev => ({ ...prev, [rating]: !prev[rating] }));
    };

    const resetFilters = () => {
        setIsEcoFriendly(false);
        setIsGreenCrackers(false);
        setCustomPrice(false);
        setPriceRange([0, 0]);
        setSelectedPrices({ 0: true });
        setSelectedBrands({});
        setSelectedAges({});
        setSelectedTags({});
        setSelectedRatings({});
    };

    return (
        <div className="flex h-screen">
            <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center pt-4 pb-4">
                <div className="flex flex-col items-center gap-5">
                    {/* Home Button */}
                    <div className="relative group">
                        <button className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center hover:bg-orange-600 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer">
                            <FaInfinity className="w-8 h-8 text-white" />
                        </button>
                        <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                            Home
                        </div>
                    </div>

                    {/* Cart Button */}
                    <div className="relative group">
                        <button
                            onClick={() => navigate('/Cart')}
                            className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center hover:bg-orange-600 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer">
                            <FaShoppingBag className="w-5 h-5 text-white" />
                        </button>
                        <div

                            className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                            Cart
                        </div>
                    </div>

                    {/* Wishlist Button */}
                    <div className="relative group">
                        <button
                            onClick={() => navigate('/Wishlist')}
                            className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center hover:bg-orange-600 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer">
                            <FaHeart className="w-5 h-5 text-white" />
                        </button>
                        <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                            Wishlist
                        </div>
                    </div>

                    {/* Filter Button */}
                    <div className="relative group">
                        <button
                            onClick={toggleFilter}
                            className={`w-14 h-14 ${isFilterOpen ? 'bg-orange-600 shadow-md' : 'bg-orange-500 shadow-sm'} rounded-xl flex items-center justify-center hover:bg-orange-600 transition-all duration-200 hover:shadow-md cursor-pointer`}
                        >
                            <FaFilter className="w-5 h-5 text-white" />
                        </button>
                        <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                            Filter
                        </div>
                    </div>

                    {/* Settings Button */}
                    <div className="relative group">
                        <button
                            onClick={() => navigate('/Settings')}
                            className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center hover:bg-orange-600 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                        >
                            <FaCog className="w-5 h-5 text-white" />
                        </button>
                        <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                            Settings
                        </div>
                    </div>

                    {/* Business Account Button */}
                    <div className="relative group">
                        <button
                            onClick={handleBusinessAccountClick}
                            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer ${isSellerLoggedIn
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-orange-500 hover:bg-orange-600'
                                }`}
                        >
                            <FaStore className="w-5 h-5 text-white" />
                        </button>
                        <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                            {isSellerLoggedIn ? 'Seller Dashboard' : 'Business Account'}
                        </div>
                    </div>
                </div>

                <div className="flex-1"></div>

                <div className="flex flex-col items-center gap-3">
                    <button className="w-14 h-14 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 cursor-pointer">
                        <FaSmile className="w-5 h-5 text-gray-400" />
                    </button>

                    <button className="w-14 h-14 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 cursor-pointer">
                        <FaSmile className="w-5 h-5 text-gray-400" />
                    </button>

                    <button className="w-14 h-14 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 cursor-pointer">
                        <FaArrowLeft className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </div>

            <div
                className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out overflow-y-auto ${isFilterOpen ? 'w-80 opacity-100' : 'w-0 opacity-0'
                    }`}
            >
                {isFilterOpen && (
                    <div className="p-4 pt-5">
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                                    <FaInfinity className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">Cracker Store</h2>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter</h3>



                        <div className="mb-6 space-y-3">
                            <button
                                onClick={() => setIsEcoFriendly(!isEcoFriendly)}
                                className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 transition-all cursor-pointer"
                            >
                                <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isEcoFriendly ? 'border-green-500' : 'border-gray-300'
                                        }`}
                                >
                                    {isEcoFriendly && (
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    )}
                                </div>
                                <span className="font-medium text-gray-700">🌿 Eco-Friendly</span>
                            </button>

                            <button
                                onClick={() => setIsGreenCrackers(!isGreenCrackers)}
                                className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 transition-all cursor-pointer"
                            >
                                <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isGreenCrackers ? 'border-emerald-500' : 'border-gray-300'
                                        }`}
                                >
                                    {isGreenCrackers && (
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                    )}
                                </div>
                                <span className="font-medium text-gray-700">♻️ Green Crackers</span>
                            </button>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-base font-semibold text-gray-800 mb-2">Price Range</h4>
                            <p className="text-sm text-gray-500 mb-4">The average price is ₹25,000</p>

                            <div className="space-y-3 mb-4">
                                {priceOptions.map((option, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={!!selectedPrices[index]}
                                                onChange={() => handlePriceChange(index)}
                                                className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                            />
                                            <span className="text-gray-700">{option.label}</span>
                                        </label>
                                        <span className="text-gray-600">{option.count}</span>
                                    </div>
                                ))}

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={customPrice}
                                        onChange={(e) => setCustomPrice(e.target.checked)}
                                        className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                    />
                                    <span className="text-red-500 font-medium">Custom Price</span>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between text-sm text-gray-700 mb-3">
                                    <span className="font-medium">Price Range</span>
                                    <span className="font-bold text-orange-600 text-base">
                                        ₹{priceRange[1].toLocaleString('en-IN')}
                                    </span>
                                </div>

                                <input
                                    type="range"
                                    min="0"
                                    max="50000"
                                    step="100"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full h-2 bg-transparent appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, #fb923c 0%, #fb923c ${(priceRange[1] / 50000) * 100
                                            }%, #e5e7eb ${(priceRange[1] / 50000) * 100}%, #e5e7eb 100%)`,
                                    }}
                                />

                                <div className="text-xs text-gray-600 mt-2 text-center font-medium">
                                    ₹0 - ₹{priceRange[1].toLocaleString('en-IN')} of ₹50,000
                                </div>
                            </div>
                        </div>

                        {/* Star Rating Section */}
                        <div className="mb-6">
                            <button
                                onClick={() => setIsStarRatingOpen(!isStarRatingOpen)}
                                className="w-full flex items-center justify-between py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <h4 className="text-base font-semibold text-gray-800">Star Rating</h4>
                                {isStarRatingOpen ? <FaChevronUp className="w-5 h-5 text-gray-400" /> : <FaChevronDown className="w-5 h-5 text-gray-400" />}
                            </button>

                            {isStarRatingOpen && (
                                <div className="mt-3 space-y-2 px-2">
                                    {[5, 4, 3, 2, 1].map((rating) => (
                                        <label key={rating} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                            {/* Checkbox */}
                                            <input
                                                type="checkbox"
                                                checked={!!selectedRatings[rating]}
                                                onChange={() => handleRatingChange(rating)}
                                                className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                            />

                                            {/* Star Icons */}
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, index) => (
                                                    <FaStar
                                                        key={index}
                                                        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-200'}`}
                                                    />
                                                ))}
                                            </div>

                                            {/* Label Text */}
                                            <span className="text-gray-600 text-sm">
                                                {rating === 5 ? "5 Stars" : `${rating} Stars & up`}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <button
                                onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                                className="w-full flex items-center justify-between py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <h4 className="text-base font-semibold text-gray-800">Brands</h4>
                                {isBrandsOpen ? <FaChevronUp className="w-5 h-5 text-gray-400" /> : <FaChevronDown className="w-5 h-5 text-gray-400" />}
                            </button>
                            {isBrandsOpen && (
                                <div className="mt-3 space-y-2 px-2">
                                    {crackerBrands.map((brand, index) => (
                                        <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                            <input
                                                type="checkbox"
                                                checked={!!selectedBrands[index]}
                                                onChange={() => handleBrandChange(index)}
                                                className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                            />
                                            <span className="text-gray-700">{brand}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <button
                                onClick={() => setIsAgeOpen(!isAgeOpen)}
                                className="w-full flex items-center justify-between py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <h4 className="text-base font-semibold text-gray-800">Age Category</h4>
                                {isAgeOpen ? <FaChevronUp className="w-5 h-5 text-gray-400" /> : <FaChevronDown className="w-5 h-5 text-gray-400" />}
                            </button>
                            {isAgeOpen && (
                                <div className="mt-3 space-y-2 px-2">
                                    {ageCategories.map((category, index) => (
                                        <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                            <input
                                                type="checkbox"
                                                checked={!!selectedAges[index]}
                                                onChange={() => handleAgeChange(index)}
                                                className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                            />
                                            <span className="text-gray-700">{category.label}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <button
                                onClick={() => setIsTagsOpen(!isTagsOpen)}
                                className="w-full flex items-center justify-between py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <h4 className="text-base font-semibold text-gray-800">Tags</h4>
                                {isTagsOpen ? <FaChevronUp className="w-5 h-5 text-gray-400" /> : <FaChevronDown className="w-5 h-5 text-gray-400" />}
                            </button>
                            {isTagsOpen && (
                                <div className="mt-3 space-y-2 px-2">
                                    {tags.map((tag, index) => (
                                        <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                            <input
                                                type="checkbox"
                                                checked={!!selectedTags[index]}
                                                onChange={() => handleTagChange(index)}
                                                className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                            />
                                            <span className="text-2xl">{tag.emoji}</span>
                                            <span className="text-gray-700">{tag.label}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-colors cursor-pointer">
                                Apply Filters
                            </button>
                            <button
                                onClick={resetFilters}
                                className="w-full text-gray-700 font-medium py-2 hover:text-orange-500 transition-colors cursor-pointer"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;