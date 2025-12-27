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
    FaHome,
    FaFire
} from 'react-icons/fa';
import { BsFillBagHeartFill } from 'react-icons/bs';

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
        <>
            <div className="hidden md:flex h-screen">
                <div className="w-20 bg-white border-r border-gray-100 flex flex-col items-center py-6 shadow-sm">
                    {/* Logo/Brand Section */}
                    <div className="mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <FaInfinity className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    {/* Navigation Icons */}
                    <div className="flex flex-col items-center gap-4 flex-1">
                        {/* Home */}
                        <div className="relative group">
                            <button
                                onClick={() => navigate('/')}
                                className="w-14 h-14 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 cursor-pointer group-hover:scale-110 active:scale-95"
                            >
                                <FaHome className="w-6 h-6 text-gray-700 group-hover:text-orange-600 transition-colors" />
                            </button>
                            <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-50 shadow-xl">
                                Home
                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
                            </div>
                        </div>

                        {/* Cart */}
                        <div className="relative group">
                            <button
                                onClick={() => navigate('/Cart')}
                                className="w-14 h-14 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 cursor-pointer group-hover:scale-110 active:scale-95"
                            >
                                <FaShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-orange-600 transition-colors" />
                            </button>
                            <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-50 shadow-xl">
                                Cart
                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
                            </div>
                        </div>

                        {/* Wishlist */}
                        <div className="relative group">
                            <button
                                onClick={() => navigate('/Wishlist')}
                                className="w-14 h-14 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 cursor-pointer group-hover:scale-110 active:scale-95"
                            >
                                <BsFillBagHeartFill className="w-5 h-5 text-gray-700 group-hover:text-orange-600 transition-colors" />
                            </button>
                            <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-50 shadow-xl">
                                Wishlist
                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
                            </div>
                        </div>

                        {/* Filter */}
                        <div className="relative group">
                            <button
                                onClick={toggleFilter}
                                className={`w-14 h-14 border-2 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer group-hover:scale-110 active:scale-95 ${isFilterOpen
                                    ? 'bg-orange-50 border-orange-500 shadow-md'
                                    : 'bg-white border-gray-100 hover:border-orange-500 hover:bg-orange-50'
                                    }`}
                            >
                                <FaFilter className={`w-5 h-5 transition-colors ${isFilterOpen ? 'text-orange-600' : 'text-gray-700 group-hover:text-orange-600'}`} />
                            </button>
                            <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-50 shadow-xl">
                                Filter
                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="relative group">
                            <button
                                onClick={() => navigate('/Settings')}
                                className="w-14 h-14 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 cursor-pointer group-hover:scale-110 active:scale-95"
                            >
                                <FaCog className="w-5 h-5 text-gray-700 group-hover:text-orange-600 transition-colors" />
                            </button>
                            <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-50 shadow-xl">
                                Settings
                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - Business Account */}
                    <div className="mt-auto">
                        <div className="relative group">
                            <button
                                onClick={handleBusinessAccountClick}
                                className={`w-14 h-14 border-2 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer group-hover:scale-110 active:scale-95 ${isSellerLoggedIn
                                    ? 'bg-green-50 border-green-500 shadow-md'
                                    : 'bg-white border-gray-100 hover:border-orange-500 hover:bg-orange-50'
                                    }`}
                            >
                                <FaStore className={`w-5 h-5 transition-colors ${isSellerLoggedIn ? 'text-green-600' : 'text-gray-700 group-hover:text-orange-600'}`} />
                            </button>
                            <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-50 shadow-xl">
                                {isSellerLoggedIn ? 'Seller Dashboard' : 'Business Account'}
                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out overflow-y-auto ${isFilterOpen ? 'w-56 md:w-60 lg:w-64 xl:w-72 opacity-100' : 'w-0 opacity-0'
                        }`}
                >
                    {isFilterOpen && (
                        <div className="p-2 md:p-3 pt-3 md:pt-4">
                            <div className="mb-3 md:mb-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                                        <FaInfinity className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                                    </div>
                                    <h2 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800">Cracker Store</h2>
                                </div>
                            </div>

                            <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-2 md:mb-3">Filter</h3>

                            <div className="mb-3 md:mb-4 space-y-2">
                                <button
                                    onClick={() => setIsEcoFriendly(!isEcoFriendly)}
                                    className="w-full flex items-center gap-2 p-2 rounded-lg border-2 border-gray-200 transition-all cursor-pointer"
                                >
                                    <div
                                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isEcoFriendly ? 'border-green-500' : 'border-gray-300'
                                            }`}
                                    >
                                        {isEcoFriendly && (
                                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                                        )}
                                    </div>
                                    <span className="text-xs md:text-sm font-medium text-gray-700">🌿 Eco-Friendly</span>
                                </button>

                                <button
                                    onClick={() => setIsGreenCrackers(!isGreenCrackers)}
                                    className="w-full flex items-center gap-2 p-2 rounded-lg border-2 border-gray-200 transition-all cursor-pointer"
                                >
                                    <div
                                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isGreenCrackers ? 'border-emerald-500' : 'border-gray-300'
                                            }`}
                                    >
                                        {isGreenCrackers && (
                                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                                        )}
                                    </div>
                                    <span className="text-xs md:text-sm font-medium text-gray-700">♻️ Green Crackers</span>
                                </button>
                            </div>

                            <div className="mb-3 md:mb-4">
                                <h4 className="text-xs md:text-sm font-semibold text-gray-800 mb-1 md:mb-2">Price Range</h4>
                                <p className="text-[10px] md:text-xs text-gray-500 mb-2 md:mb-3">The average price is ₹25,000</p>

                                <div className="space-y-1.5 md:space-y-2 mb-2 md:mb-3">
                                    {priceOptions.map((option, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={!!selectedPrices[index]}
                                                    onChange={() => handlePriceChange(index)}
                                                    className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                                />
                                                <span className="text-xs md:text-sm text-gray-700">{option.label}</span>
                                            </label>
                                            <span className="text-[10px] md:text-xs text-gray-600">{option.count}</span>
                                        </div>
                                    ))}

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={customPrice}
                                            onChange={(e) => setCustomPrice(e.target.checked)}
                                            className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                        />
                                        <span className="text-xs md:text-sm text-red-500 font-medium">Custom Price</span>
                                    </div>
                                </div>

                                <div className="p-2 md:p-3">
                                    <div className="flex justify-between text-[10px] md:text-xs text-gray-700 mb-2">
                                        <span className="font-medium">Price Range</span>
                                        <span className="font-bold text-orange-600 text-xs md:text-sm">
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

                                    <div className="text-[10px] md:text-xs text-gray-600 mt-1.5 text-center font-medium">
                                        ₹0 - ₹{priceRange[1].toLocaleString('en-IN')} of ₹50,000
                                    </div>
                                </div>
                            </div>

                            {/* Star Rating Section */}
                            <div className="mb-3 md:mb-4">
                                <button
                                    onClick={() => setIsStarRatingOpen(!isStarRatingOpen)}
                                    className="w-full flex items-center justify-between py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <h4 className="text-xs md:text-sm font-semibold text-gray-800">Star Rating</h4>
                                    {isStarRatingOpen ? <FaChevronUp className="w-3 h-3 md:w-4 md:h-4 text-gray-400" /> : <FaChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />}
                                </button>

                                {isStarRatingOpen && (
                                    <div className="mt-2 space-y-1.5 px-1">
                                        {[5, 4, 3, 2, 1].map((rating) => (
                                            <label key={rating} className="flex items-center gap-1.5 md:gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                                <input
                                                    type="checkbox"
                                                    checked={!!selectedRatings[rating]}
                                                    onChange={() => handleRatingChange(rating)}
                                                    className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                                />
                                                <div className="flex items-center gap-0.5">
                                                    {[...Array(5)].map((_, index) => (
                                                        <FaStar
                                                            key={index}
                                                            className={`w-2.5 h-2.5 md:w-3 md:h-3 ${index < rating ? 'text-yellow-400' : 'text-gray-200'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-[10px] md:text-xs text-gray-600">
                                                    {rating === 5 ? "5 Stars" : `${rating} Stars & up`}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3 md:mb-4">
                                <button
                                    onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                                    className="w-full flex items-center justify-between py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <h4 className="text-xs md:text-sm font-semibold text-gray-800">Brands</h4>
                                    {isBrandsOpen ? <FaChevronUp className="w-3 h-3 md:w-4 md:h-4 text-gray-400" /> : <FaChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />}
                                </button>
                                {isBrandsOpen && (
                                    <div className="mt-2 space-y-1.5 px-1">
                                        {crackerBrands.map((brand, index) => (
                                            <label key={index} className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                                <input
                                                    type="checkbox"
                                                    checked={!!selectedBrands[index]}
                                                    onChange={() => handleBrandChange(index)}
                                                    className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                                />
                                                <span className="text-[10px] md:text-xs text-gray-700">{brand}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3 md:mb-4">
                                <button
                                    onClick={() => setIsAgeOpen(!isAgeOpen)}
                                    className="w-full flex items-center justify-between py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <h4 className="text-xs md:text-sm font-semibold text-gray-800">Age Category</h4>
                                    {isAgeOpen ? <FaChevronUp className="w-3 h-3 md:w-4 md:h-4 text-gray-400" /> : <FaChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />}
                                </button>
                                {isAgeOpen && (
                                    <div className="mt-2 space-y-1.5 px-1">
                                        {ageCategories.map((category, index) => (
                                            <label key={index} className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                                <input
                                                    type="checkbox"
                                                    checked={!!selectedAges[index]}
                                                    onChange={() => handleAgeChange(index)}
                                                    className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                                />
                                                <span className="text-[10px] md:text-xs text-gray-700">{category.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3 md:mb-4">
                                <button
                                    onClick={() => setIsTagsOpen(!isTagsOpen)}
                                    className="w-full flex items-center justify-between py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <h4 className="text-xs md:text-sm font-semibold text-gray-800">Tags</h4>
                                    {isTagsOpen ? <FaChevronUp className="w-3 h-3 md:w-4 md:h-4 text-gray-400" /> : <FaChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />}
                                </button>
                                {isTagsOpen && (
                                    <div className="mt-2 space-y-1.5 px-1">
                                        {tags.map((tag, index) => (
                                            <label key={index} className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                                <input
                                                    type="checkbox"
                                                    checked={!!selectedTags[index]}
                                                    onChange={() => handleTagChange(index)}
                                                    className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                                />
                                                <span className="text-base md:text-lg">{tag.emoji}</span>
                                                <span className="text-[10px] md:text-xs text-gray-700">{tag.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 md:py-2.5 px-4 md:px-6 rounded-full transition-colors cursor-pointer text-xs md:text-sm">
                                    Apply Filters
                                </button>
                                <button
                                    onClick={resetFilters}
                                    className="w-full text-gray-700 font-medium py-1.5 hover:text-orange-500 transition-colors cursor-pointer text-xs md:text-sm"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Bottom Navigation - Desktop Style */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
                <div className="flex items-center justify-around px-2 py-2">
                    {/* Home */}
                    <div className="relative group">
                        <button
                            onClick={() => navigate('/')}
                            className="w-12 h-12 bg-white border-2 border-gray-100 rounded-xl flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 cursor-pointer active:scale-95"
                        >
                            <FaHome className="w-5 h-5 text-gray-700 group-hover:text-orange-600 transition-colors" />
                        </button>
                    </div>

                    {/* Cart */}
                    <div className="relative group">
                        <button
                            onClick={() => navigate('/Cart')}
                            className="w-12 h-12 bg-white border-2 border-gray-100 rounded-xl flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 cursor-pointer active:scale-95"
                        >
                            <FaShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-orange-600 transition-colors" />
                        </button>
                    </div>

                    {/* Wishlist */}
                    <div className="relative group">
                        <button
                            onClick={() => navigate('/Wishlist')}
                            className="w-12 h-12 bg-white border-2 border-gray-100 rounded-xl flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 cursor-pointer active:scale-95"
                        >
                            <BsFillBagHeartFill className="w-5 h-5 text-gray-700 group-hover:text-orange-600 transition-colors" />
                        </button>
                    </div>

                    {/* Filter */}
                    <div className="relative group">
                        <button
                            onClick={toggleFilter}
                            className={`w-12 h-12 border-2 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 ${isFilterOpen
                                ? 'bg-orange-50 border-orange-500 shadow-md'
                                : 'bg-white border-gray-100 hover:border-orange-500 hover:bg-orange-50'
                                }`}
                        >
                            <FaFilter className={`w-5 h-5 transition-colors ${isFilterOpen ? 'text-orange-600' : 'text-gray-700 group-hover:text-orange-600'}`} />
                        </button>
                    </div>

                    {/* Settings */}
                    <div className="relative group">
                        <button
                            onClick={() => navigate('/Settings')}
                            className="w-12 h-12 bg-white border-2 border-gray-100 rounded-xl flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 cursor-pointer active:scale-95"
                        >
                            <FaCog className="w-5 h-5 text-gray-700 group-hover:text-orange-600 transition-colors" />
                        </button>
                    </div>

                    {/* Business Account */}
                    <div className="relative group">
                        <button
                            onClick={handleBusinessAccountClick}
                            className={`w-12 h-12 border-2 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 ${isSellerLoggedIn
                                ? 'bg-green-50 border-green-500 shadow-md'
                                : 'bg-white border-gray-100 hover:border-orange-500 hover:bg-orange-50'
                                }`}
                        >
                            <FaStore className={`w-5 h-5 transition-colors ${isSellerLoggedIn ? 'text-green-600' : 'text-gray-700 group-hover:text-orange-600'}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Filter Modal */}
            {isFilterOpen && (
                <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
                    <div className="bg-white w-full max-h-[85vh] rounded-t-3xl overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between z-10">
                            <h3 className="text-lg font-bold text-gray-800">Filters</h3>
                            <button
                                onClick={toggleFilter}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                                <span className="text-xl text-gray-600">×</span>
                            </button>
                        </div>

                        <div className="p-4 pb-6">
                            <div className="mb-5 space-y-3">
                                <button
                                    onClick={() => setIsEcoFriendly(!isEcoFriendly)}
                                    className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 transition-all cursor-pointer active:bg-gray-50"
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
                                    className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 transition-all cursor-pointer active:bg-gray-50"
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

                            <div className="mb-5">
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
                                                    className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                                />
                                                <span className="text-sm text-gray-700">{option.label}</span>
                                            </label>
                                            <span className="text-sm text-gray-600">{option.count}</span>
                                        </div>
                                    ))}

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={customPrice}
                                            onChange={(e) => setCustomPrice(e.target.checked)}
                                            className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                        />
                                        <span className="text-red-500 font-medium">Custom Price</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-lg">
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
                            <div className="mb-5">
                                <button
                                    onClick={() => setIsStarRatingOpen(!isStarRatingOpen)}
                                    className="w-full flex items-center justify-between py-3 border-b border-gray-200 cursor-pointer active:bg-gray-50 transition-colors"
                                >
                                    <h4 className="text-base font-semibold text-gray-800">Star Rating</h4>
                                    {isStarRatingOpen ? <FaChevronUp className="w-5 h-5 text-gray-400" /> : <FaChevronDown className="w-5 h-5 text-gray-400" />}
                                </button>

                                {isStarRatingOpen && (
                                    <div className="mt-3 space-y-2">
                                        {[5, 4, 3, 2, 1].map((rating) => (
                                            <label key={rating} className="flex items-center gap-3 cursor-pointer active:bg-gray-50 p-2 rounded">
                                                <input
                                                    type="checkbox"
                                                    checked={!!selectedRatings[rating]}
                                                    onChange={() => handleRatingChange(rating)}
                                                    className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                                />
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, index) => (
                                                        <FaStar
                                                            key={index}
                                                            className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-200'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-gray-600">
                                                    {rating === 5 ? "5 Stars" : `${rating} Stars & up`}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mb-5">
                                <button
                                    onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                                    className="w-full flex items-center justify-between py-3 border-b border-gray-200 cursor-pointer active:bg-gray-50 transition-colors"
                                >
                                    <h4 className="text-base font-semibold text-gray-800">Brands</h4>
                                    {isBrandsOpen ? <FaChevronUp className="w-5 h-5 text-gray-400" /> : <FaChevronDown className="w-5 h-5 text-gray-400" />}
                                </button>
                                {isBrandsOpen && (
                                    <div className="mt-3 space-y-2">
                                        {crackerBrands.map((brand, index) => (
                                            <label key={index} className="flex items-center gap-2 cursor-pointer active:bg-gray-50 p-2 rounded">
                                                <input
                                                    type="checkbox"
                                                    checked={!!selectedBrands[index]}
                                                    onChange={() => handleBrandChange(index)}
                                                    className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                                />
                                                <span className="text-sm text-gray-700">{brand}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mb-5">
                                <button
                                    onClick={() => setIsAgeOpen(!isAgeOpen)}
                                    className="w-full flex items-center justify-between py-3 border-b border-gray-200 cursor-pointer active:bg-gray-50 transition-colors"
                                >
                                    <h4 className="text-base font-semibold text-gray-800">Age Category</h4>
                                    {isAgeOpen ? <FaChevronUp className="w-5 h-5 text-gray-400" /> : <FaChevronDown className="w-5 h-5 text-gray-400" />}
                                </button>
                                {isAgeOpen && (
                                    <div className="mt-3 space-y-2">
                                        {ageCategories.map((category, index) => (
                                            <label key={index} className="flex items-center gap-2 cursor-pointer active:bg-gray-50 p-2 rounded">
                                                <input
                                                    type="checkbox"
                                                    checked={!!selectedAges[index]}
                                                    onChange={() => handleAgeChange(index)}
                                                    className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                                />
                                                <span className="text-sm text-gray-700">{category.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mb-5">
                                <button
                                    onClick={() => setIsTagsOpen(!isTagsOpen)}
                                    className="w-full flex items-center justify-between py-3 border-b border-gray-200 cursor-pointer active:bg-gray-50 transition-colors"
                                >
                                    <h4 className="text-base font-semibold text-gray-800">Tags</h4>
                                    {isTagsOpen ? <FaChevronUp className="w-5 h-5 text-gray-400" /> : <FaChevronDown className="w-5 h-5 text-gray-400" />}
                                </button>
                                {isTagsOpen && (
                                    <div className="mt-3 space-y-2">
                                        {tags.map((tag, index) => (
                                            <label key={index} className="flex items-center gap-2 cursor-pointer active:bg-gray-50 p-2 rounded">
                                                <input
                                                    type="checkbox"
                                                    checked={!!selectedTags[index]}
                                                    onChange={() => handleTagChange(index)}
                                                    className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                                />
                                                <span className="text-2xl">{tag.emoji}</span>
                                                <span className="text-sm text-gray-700">{tag.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3 pt-4">
                                <button
                                    onClick={toggleFilter}
                                    className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-3 px-6 rounded-full transition-colors cursor-pointer"
                                >
                                    Apply Filters
                                </button>
                                <button
                                    onClick={() => {
                                        resetFilters();
                                        toggleFilter();
                                    }}
                                    className="w-full text-gray-700 font-medium py-2 hover:text-orange-500 transition-colors cursor-pointer"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;