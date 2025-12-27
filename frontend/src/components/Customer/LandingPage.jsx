import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTruck, FaShieldAlt, FaPercent, FaGift, FaChevronLeft, FaChevronRight, FaFire, FaStar } from 'react-icons/fa';

const LandingPage = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const heroSlides = [
        {
            title: "DIWALI SPECIAL SALE",
            subtitle: "60-80% OFF",
            description: "Premium Crackers & Fireworks",
            dates: "12th-21st DEC",
            cta: "Shop Now",
            badge: "MEGA SALE",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80"
        },
        {
            title: "GIFT BOX COLLECTION",
            subtitle: "BUY 2 GET 1 FREE",
            description: "Perfect for Celebrations",
            dates: "LIMITED STOCK",
            cta: "View Collection",
            badge: "BEST SELLER",
            image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200&q=80"
        },
        {
            title: "ECO-FRIENDLY CRACKERS",
            subtitle: "GREEN & SAFE",
            description: "Certified Low Emission",
            dates: "NEW ARRIVAL",
            cta: "Explore Now",
            badge: "ECO FRIENDLY",
            image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=1200&q=80"
        }
    ];

    const categories = [
        { name: "Sparklers", image: "https://images.unsplash.com/photo-1482575832494-771f74bf6857?w=400&q=80", count: "50+ Products" },
        { name: "Rockets", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80", count: "30+ Products" },
        { name: "Fountains", image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&q=80", count: "40+ Products" },
        { name: "Gift Boxes", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80", count: "25+ Products" },
        { name: "Chakras", image: "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400&q=80", count: "35+ Products" },
        { name: "Bombs", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80", count: "20+ Products" }
    ];

    const shoppingDeals = [
        {
            id: 1,
            brand: "SAMSUNG",
            name: "Crystal 4K UHD Smart TV",
            size: "55 inch",
            image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80",
            discount: "40% OFF",
            originalPrice: "₹65,999",
            salePrice: "₹39,599",
            badge: "HDTV",
            rating: 4.5,
            reviews: 1234
        },
        {
            id: 2,
            brand: "TCL",
            name: "QLED 4K Google TV",
            size: "55 inch",
            image: "https://images.unsplash.com/photo-1593359863503-f598e4360d95?w=600&q=80",
            discount: "35% OFF",
            originalPrice: "₹54,999",
            salePrice: "₹35,749",
            badge: "Smart TV",
            rating: 4.3,
            reviews: 856
        },
        {
            id: 3,
            brand: "LG",
            name: "OLED 4K Cinema HDR",
            size: "65 inch",
            image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80",
            discount: "45% OFF",
            originalPrice: "₹1,89,999",
            salePrice: "₹1,04,499",
            badge: "Premium",
            rating: 4.8,
            reviews: 2341
        },
        {
            id: 4,
            brand: "ONEPLUS",
            name: "Y Series 4K LED TV",
            size: "32 inch",
            image: "https://images.unsplash.com/photo-1593359863503-f598e4360d95?w=600&q=80",
            discount: "30% OFF",
            originalPrice: "₹28,999",
            salePrice: "₹20,299",
            badge: "Best Seller",
            rating: 4.6,
            reviews: 1567
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isTransitioning) {
                goToSlide((currentSlide + 1) % heroSlides.length);
            }
        }, 5000); // Increased to 5 seconds for better viewing
        return () => clearInterval(timer);
    }, [currentSlide, isTransitioning]);

    const goToSlide = (index) => {
        if (isTransitioning || index === currentSlide) return;
        setIsTransitioning(true);
        setCurrentSlide(index);
        setTimeout(() => setIsTransitioning(false), 700);
    };

    const nextSlide = () => {
        goToSlide((currentSlide + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
    };

    return (
        <div className="w-full bg-gray-50 pb-20 md:pb-0">
            {/* Hero Carousel Section - Professional */}
            <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide
                            ? 'opacity-100 z-10 scale-100'
                            : 'opacity-0 z-0 scale-105'
                            }`}
                    >
                        {/* Background Image with Ken Burns Effect */}
                        <div className="absolute inset-0 overflow-hidden">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className={`w-full h-full object-cover transition-transform duration-[20000ms] ease-out ${index === currentSlide ? 'scale-110' : 'scale-100'
                                    }`}
                            />
                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/70"></div>
                            <div className="absolute inset-0 bg-black/40"></div>
                        </div>

                        {/* Content with Parallax Effect */}
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
                            <div className="flex items-center h-full max-w-full md:max-w-2xl lg:max-w-3xl">
                                <div className={`text-white transition-all duration-1000 ${index === currentSlide
                                    ? 'translate-x-0 translate-y-0 opacity-100'
                                    : '-translate-x-12 translate-y-4 opacity-0'
                                    }`}>
                                    {/* Animated Badge */}
                                    <div className={`inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-500 rounded-full font-bold text-xs sm:text-sm shadow-lg transition-all duration-700 delay-100 ${index === currentSlide ? 'scale-100 rotate-0' : 'scale-75 -rotate-12'
                                        }`}>
                                        <FaFire className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                                        {slide.badge}
                                    </div>

                                    {/* Title with Stagger Animation */}
                                    <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-2 sm:mb-3 drop-shadow-2xl leading-tight transition-all duration-1000 delay-200 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}>
                                        {slide.title}
                                    </h1>

                                    {/* Subtitle */}
                                    <p className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-2 sm:mb-3 text-orange-500 drop-shadow-2xl leading-tight transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}>
                                        {slide.subtitle}
                                    </p>

                                    {/* Description */}
                                    <p className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-1 sm:mb-2 font-semibold transition-all duration-1000 delay-400 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}>
                                        {slide.description}
                                    </p>

                                    <p className={`text-xs sm:text-sm md:text-base mb-4 sm:mb-6 text-gray-300 transition-all duration-1000 delay-500 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}>
                                        {slide.dates}
                                    </p>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => navigate('/')}
                                        className={`group relative px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm sm:text-base md:text-lg rounded-full transition-all shadow-2xl hover:shadow-orange-500/50 active:scale-95 cursor-pointer ${index === currentSlide ? 'translate-y-0 opacity-100 delay-600' : 'translate-y-8 opacity-0'
                                            }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            {slide.cta}
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Enhanced Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    disabled={isTransitioning}
                    className="group absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center shadow-2xl transition-all z-20 hover:scale-110 disabled:opacity-50 active:scale-95 cursor-pointer"
                >
                    <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                    onClick={nextSlide}
                    disabled={isTransitioning}
                    className="group absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center shadow-2xl transition-all z-20 hover:scale-110 disabled:opacity-50 active:scale-95 cursor-pointer"
                >
                    <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Enhanced Slide Indicators with Progress */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="flex items-center gap-2 sm:gap-3 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        {heroSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                disabled={isTransitioning}
                                className="group relative cursor-pointer"
                            >
                                <div className={`h-2 rounded-full transition-all duration-500 ${index === currentSlide
                                    ? 'bg-orange-500 w-8 sm:w-12'
                                    : 'bg-white/40 w-2 hover:bg-white/60 hover:w-4'
                                    }`}>
                                    {index === currentSlide && (
                                        <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>


            </div>

            {/* Features Section */}
            <div className="border-y border-gray-200 py-4 sm:py-6 md:py-8">
                <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                        <div className="flex items-center gap-2 sm:gap-3 justify-center p-2 sm:p-0">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                                <FaTruck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-xs sm:text-sm md:text-base">Free Delivery</p>
                                <p className="text-[10px] sm:text-xs text-gray-600">Orders above ₹999</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 justify-center p-2 sm:p-0">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                                <FaShieldAlt className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-xs sm:text-sm md:text-base">100% Safe</p>
                                <p className="text-[10px] sm:text-xs text-gray-600">Certified Products</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 justify-center p-2 sm:p-0">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                                <FaPercent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-xs sm:text-sm md:text-base">Best Prices</p>
                                <p className="text-[10px] sm:text-xs text-gray-600">Guaranteed Lowest</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12 ">
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Shop by Category
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">Explore our wide range of crackers and fireworks</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            onClick={() => navigate('/')}
                            className="group relative overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
                        >
                            <div className="aspect-square relative">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4">
                                    <h3 className="text-white font-bold text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">
                                        {category.name}
                                    </h3>
                                    <p className="text-white/80 text-[10px] sm:text-xs">
                                        {category.count}
                                    </p>
                                </div>

                                <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/20 transition-all flex items-center justify-center">
                                    <span className="text-white text-xs sm:text-sm md:text-base font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        View All →
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>




            {/* Special Combo Offer Section - Amazon Style */}
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">

                    {/* Card 1 - Diwali Crackers Bundle */}
                    <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow">
                        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                            Diwali Crackers Bundle | Up to 60% off
                        </h2>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="cursor-pointer group">
                                <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80"
                                        alt="Sparklers"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-xs text-gray-700">Sparklers</p>
                            </div>
                            <div className="cursor-pointer group">
                                <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&q=80"
                                        alt="Rockets"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-xs text-gray-700">Rockets</p>
                            </div>
                            <div className="cursor-pointer group">
                                <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&q=80"
                                        alt="Flower Pots"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-xs text-gray-700">Flower pots</p>
                            </div>
                            <div className="cursor-pointer group">
                                <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&q=80"
                                        alt="Chakras"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-xs text-gray-700">Chakras</p>
                            </div>
                        </div>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); navigate('/'); }}
                            className="text-sm text-blue-600 hover:text-orange-500 hover:underline font-medium cursor-pointer transition-colors"
                        >
                            See more
                        </a>
                    </div>

                    {/* Card 2 - Premium Gift Boxes */}
                    <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow">
                        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                            Premium Gift Boxes | Starting ₹499
                        </h2>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="cursor-pointer group">
                                <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80"
                                        alt="Gift Box 1"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-xs text-gray-700">Deluxe box</p>
                            </div>
                            <div className="cursor-pointer group">
                                <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&q=80"
                                        alt="Gift Box 2"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-xs text-gray-700">Family pack</p>
                            </div>
                            <div className="cursor-pointer group">
                                <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80"
                                        alt="Gift Box 3"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-xs text-gray-700">Premium set</p>
                            </div>
                            <div className="cursor-pointer group">
                                <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80"
                                        alt="Gift Box 4"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-xs text-gray-700">Combo pack</p>
                            </div>
                        </div>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); navigate('/'); }}
                            className="text-sm text-blue-600 hover:text-orange-500 hover:underline font-medium cursor-pointer transition-colors"
                        >
                            See more
                        </a>
                    </div>

                    {/* Card 3 - Sky Shots Collection */}
                    <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow">
                        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                            Sky Shots Collection | Best Sellers
                        </h2>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="cursor-pointer group">
                                <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1482575832494-771f74bf6857?w=400&q=80"
                                        alt="Sky Shot 1"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-xs text-gray-700">Multi color</p>
                            </div>
                            <div className="cursor-pointer group">
                                <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80"
                                        alt="Sky Shot 2"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-xs text-gray-700">Night sky</p>
                            </div>
                            <div className="cursor-pointer group">
                                <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&q=80"
                                        alt="Sky Shot 3"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-xs text-gray-700">Mega shots</p>
                            </div>
                            <div className="cursor-pointer group">
                                <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&q=80"
                                        alt="Sky Shot 4"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-xs text-gray-700">Deluxe set</p>
                            </div>
                        </div>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); navigate('/'); }}
                            className="text-sm text-blue-600 hover:text-orange-500 hover:underline font-medium"
                        >
                            See more
                        </a>
                    </div>

                    {/* Card 4 - Eco-Friendly Range */}
                    <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow">
                        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                            Eco-Friendly Range | Green Crackers
                        </h2>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="cursor-pointer group">
                                <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&q=80"
                                        alt="Eco Product 1"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-xs text-gray-700">Green sparklers</p>
                            </div>
                            <div className="cursor-pointer group">
                                <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80"
                                        alt="Eco Product 2"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-xs text-gray-700">Safe fountains</p>
                            </div>
                            <div className="cursor-pointer group">
                                <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&q=80"
                                        alt="Eco Product 3"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-xs text-gray-700">Low smoke</p>
                            </div>
                            <div className="cursor-pointer group">
                                <div className="bg-gray-50 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&q=80"
                                        alt="Eco Product 4"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-xs text-gray-700">Eco rockets</p>
                            </div>
                        </div>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); navigate('/'); }}
                            className="text-sm text-blue-600 hover:text-orange-500 hover:underline font-medium"
                        >
                            See more
                        </a>
                    </div>

                </div>
            </div>

            {/* Diwali Offers Section - 2 Rows x 4 Columns */}
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                            Festive offers
                        </h2>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); navigate('/'); }}
                            className="text-sm sm:text-base text-blue-600 hover:text-orange-500 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                            View all
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>

                    {/* Products Grid - 2 Rows x 4 Columns */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                        {/* Product 1 */}
                        <div className="group cursor-pointer">
                            <div className="bg-gray-50 rounded-xl overflow-hidden mb-3 aspect-square flex items-center justify-center p-4">
                                <img
                                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80"
                                    alt="Premium Sparklers"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">Premium Sparklers</h3>
                            <p className="text-xs sm:text-sm text-green-600 font-bold">Min. 60% Off</p>
                        </div>

                        {/* Product 2 */}
                        <div className="group cursor-pointer">
                            <div className="bg-gray-50 rounded-xl overflow-hidden mb-3 aspect-square flex items-center justify-center p-4">
                                <img
                                    src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&q=80"
                                    alt="Sky Rockets"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">Sky Rockets</h3>
                            <p className="text-xs sm:text-sm text-green-600 font-bold">Min. 55% Off</p>
                        </div>

                        {/* Product 3 */}
                        <div className="group cursor-pointer">
                            <div className="bg-gray-50 rounded-xl overflow-hidden mb-3 aspect-square flex items-center justify-center p-4">
                                <img
                                    src="https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&q=80"
                                    alt="Flower Pots"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">Flower Pots</h3>
                            <p className="text-xs sm:text-sm text-green-600 font-bold">Min. 50% Off</p>
                        </div>

                        {/* Product 4 */}
                        <div className="group cursor-pointer">
                            <div className="bg-gray-50 rounded-xl overflow-hidden mb-3 aspect-square flex items-center justify-center p-4">
                                <img
                                    src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&q=80"
                                    alt="Chakras"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">Spinning Chakras</h3>
                            <p className="text-xs sm:text-sm text-green-600 font-bold">Min. 65% Off</p>
                        </div>

                        {/* Product 5 */}
                        <div className="group cursor-pointer">
                            <div className="bg-gray-50 rounded-xl overflow-hidden mb-3 aspect-square flex items-center justify-center p-4">
                                <img
                                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80"
                                    alt="Gift Boxes"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">Premium Gift Boxes</h3>
                            <p className="text-xs sm:text-sm text-green-600 font-bold">Min. 45% Off</p>
                        </div>

                        {/* Product 6 */}
                        <div className="group cursor-pointer">
                            <div className="bg-gray-50 rounded-xl overflow-hidden mb-3 aspect-square flex items-center justify-center p-4">
                                <img
                                    src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80"
                                    alt="Bombs"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">Atom Bombs</h3>
                            <p className="text-xs sm:text-sm text-green-600 font-bold">Min. 70% Off</p>
                        </div>

                        {/* Product 7 */}
                        <div className="group cursor-pointer">
                            <div className="bg-gray-50 rounded-xl overflow-hidden mb-3 aspect-square flex items-center justify-center p-4">
                                <img
                                    src="https://images.unsplash.com/photo-1482575832494-771f74bf6857?w=400&q=80"
                                    alt="Fountains"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">Color Fountains</h3>
                            <p className="text-xs sm:text-sm text-green-600 font-bold">Min. 58% Off</p>
                        </div>

                        {/* Product 8 */}
                        <div className="group cursor-pointer">
                            <div className="bg-gray-50 rounded-xl overflow-hidden mb-3 aspect-square flex items-center justify-center p-4">
                                <img
                                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80"
                                    alt="Combo Packs"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">Mega Combo Packs</h3>
                            <p className="text-xs sm:text-sm text-orange-600 font-bold">Special Offer</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-3 sm:px-2 md:px-2 lg:px-2 py-6 md:py-12 bg-gray-50">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                    <div className="bg-white rounded-2xl p-5 shadow-sm h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Top ranking</h3>
                            <span className="text-sm text-orange-500 font-semibold cursor-pointer hover:text-orange-600 transition-colors">View more</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Hot selling · Traditional Clothing & Accessories</p>
                        <div className="rounded-xl overflow-hidden mb-4 flex-grow">
                            <img
                                src="https://images.unsplash.com/photo-1574380965762-d7af37362e0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGl3YWxpJTIwY3JhY2tlcnN8ZW58MHx8MHx8fDA%3D"
                                className="w-full h-64 lg:h-72 object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-auto">
                            <img src="https://images.unsplash.com/photo-1700623066384-555c048e50e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGl3YWxpJTIwY3JhY2tlcnN8ZW58MHx8MHx8fDA%3D" className="rounded-lg h-20 w-full object-cover cursor-pointer hover:opacity-80 transition-opacity" />
                            <img src="https://images.unsplash.com/photo-1572098688575-0db28b6a165b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRpd2FsaSUyMGNyYWNrZXJzfGVufDB8fDB8fHww" className="rounded-lg h-20 w-full object-cover cursor-pointer hover:opacity-80 transition-opacity" />
                            <img src="https://media.istockphoto.com/id/645713294/photo/fireworks.jpg?s=612x612&w=0&k=20&c=Fh-AGfLgSjIwzlDipGogSbdsKrKU5PxOCCh0plXE-N0=" className="rounded-lg h-20 w-full object-cover cursor-pointer hover:opacity-80 transition-opacity" />
                        </div>
                    </div>

                    {/* Second Column - New Arrivals */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">New arrivals</h3>
                            <span className="text-sm text-orange-500 font-semibold cursor-pointer hover:text-orange-600 transition-colors">View more</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">134,000+ products added today</p>
                        <div className="grid grid-cols-2 gap-3 mb-4 flex-grow">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4kCjRBzhwKsmcfxSe_y-7CyJhUIXz-j7nig&s" alt="" className="rounded-lg h-40 w-full object-cover cursor-pointer hover:opacity-80 transition-opacity" />
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4kCjRBzhwKsmcfxSe_y-7CyJhUIXz-j7nig&s" className="rounded-lg h-40 w-full object-cover cursor-pointer hover:opacity-80 transition-opacity" />
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj1vkyLax_Tr063fVse4zuoykOG-w86WVMnw&s" className="rounded-lg h-40 w-full object-cover cursor-pointer hover:opacity-80 transition-opacity" />
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfYkrOzFi6JPsdACNsJeGhB2oMTjZjJJmarBL_wEEqAw&s" className="rounded-lg h-40 w-full object-cover cursor-pointer hover:opacity-80 transition-opacity" />
                        </div>
                        <div className="mt-auto text-sm font-semibold text-gray-800">
                            New this week
                            <span className="block text-xs text-gray-500 font-normal">Products from verified suppliers only</span>
                        </div>
                    </div>

                    {/* Third Column - Top Deals & Best Sellers */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-lg transition-shadow cursor-pointer">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfYkrOzFi6JPsdACNsJeGhB2oMTjZjJJmarBL_wEEqAw&s"
                                className="w-20 h-20 object-cover rounded-xl"
                            />
                            <div>
                                <p className="text-lg font-bold text-gray-900">Top deals</p>
                                <p className="text-sm text-gray-600">180-day lowest price</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
                            <p className="text-lg font-bold text-gray-900 mb-4">Deals on best sellers</p>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0s-JN8VBDNJPykkWNWv_dgxGn08u-hmP9Ag&s"
                                className="rounded-lg h-80 w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Featured Shops & Sellers Section - Fully Responsive */}
            <div className="w-full py-8 sm:py-10 md:py-12">
                <div className="container mx-auto px-1 sm:px-2 md:px-3 lg:px-4">
                    {/* Section Header */}
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center md:text-left">
                            Featured Shops & Sellers
                        </h2>
                        <p className="mt-2 text-sm sm:text-base text-gray-600 text-center md:text-left max-w-3xl">
                            Discover trusted shops offering premium quality crackers and fireworks
                        </p>
                    </div>

                    {/* Carousel Container */}
                    <div className="relative">
                        {/* Desktop Navigation Arrows */}
                        <button
                            onClick={() => {
                                const container = document.getElementById('shops-carousel');
                                if (container) {
                                    container.scrollBy({ left: -250, behavior: 'smooth' });
                                }
                            }}
                            className="hidden lg:flex absolute -left-5 xl:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-500 rounded-full items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer"
                            aria-label="Previous shops"
                        >
                            <FaChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>

                        <button
                            onClick={() => {
                                const container = document.getElementById('shops-carousel');
                                if (container) {
                                    container.scrollBy({ left: 250, behavior: 'smooth' });
                                }
                            }}
                            className="hidden lg:flex absolute -right-5 xl:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-500 rounded-full items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer"
                            aria-label="Next shops"
                        >
                            <FaChevronRight className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* Scrollable Container */}
                        <div
                            id="shops-carousel"
                            className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4 px-6 md:px-0"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {[
                                {
                                    name: "Sivakasi Fireworks Store",
                                    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=80",
                                    rating: 4.8,
                                    products: "500+ Products"
                                },
                                {
                                    name: "Premium Crackers Hub",
                                    img: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=700&q=80",
                                    rating: 4.6,
                                    products: "350+ Products"
                                },
                                {
                                    name: "Diwali Celebrations Store",
                                    img: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=700&q=80",
                                    rating: 4.9,
                                    products: "600+ Products"
                                },
                                {
                                    name: "Festive Fireworks Mart",
                                    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80",
                                    rating: 4.7,
                                    products: "450+ Products"
                                },
                                {
                                    name: "Royal Crackers Emporium",
                                    img: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=700&q=80",
                                    rating: 4.5,
                                    products: "400+ Products"
                                },
                                {
                                    name: "Sparkle & Shine Shop",
                                    img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=700&q=80",
                                    rating: 4.8,
                                    products: "550+ Products"
                                }
                            ].map((shop, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-[300px] sm:w-[280px] md:w-[280px] lg:w-[280px] xl:w-[282px] bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group snap-start"
                                >
                                    {/* Shop Image */}
                                    <div className="h-40 sm:h-44 md:h-40 w-full overflow-hidden bg-gray-100">
                                        <img
                                            src={shop.img}
                                            alt={shop.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Shop Details */}
                                    <div className="p-4">
                                        <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                                            {shop.name}
                                        </h3>

                                        {/* Rating & Products */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded">
                                                <FaStar className="w-3 h-3 text-yellow-500" />
                                                <span className="text-xs font-bold text-gray-900">{shop.rating}</span>
                                            </div>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-gray-600 font-medium">{shop.products}</span>
                                        </div>

                                        {/* Visit Shop Button */}
                                        <button className="w-full px-3 py-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm hover:shadow-md cursor-pointer">
                                            Visit Shop
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Scroll Indicator */}
                        <div className="lg:hidden flex justify-center gap-2 mt-4">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <FaChevronLeft className="w-3 h-3" />
                                <span>Swipe to explore</span>
                                <FaChevronRight className="w-3 h-3" />
                            </div>
                        </div>
                    </div>
                </div>

                <style>
                    {`
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
                        
                        /* Smooth scrolling for touch devices */
                        #shops-carousel {
                            -webkit-overflow-scrolling: touch;
                        }
                        
                        /* Snap scrolling optimization */
                        @media (max-width: 1023px) {
                            #shops-carousel {
                                scroll-padding: 1rem;
                            }
                        }
                    `}
                </style>
            </div>



        </div>
    );
};

export default LandingPage;
