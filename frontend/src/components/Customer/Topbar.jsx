import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaBell, FaUser, FaSignOutAlt, FaInfinity, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import showToast from '../../utils/toast.jsx';
import API from '../../../api';

const Searchbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const searchRef = useRef(null);
    const debounceTimer = useRef(null);
    const notificationRef = useRef(null);

    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [loadingNotifications, setLoadingNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    // Get page title based on current route
    const getPageTitle = () => {
        const path = location.pathname;
        const routeTitles = {
            // Main Pages
            '/': 'Home',
            '/products': 'Products',
            '/search': 'Search Results',

            // Cart & Wishlist
            '/Cart': 'Shopping Cart',
            '/Wishlist': 'My Wishlist',
            '/checkout': 'Checkout',
            '/Payment': 'Payment',

            // Customer Auth
            '/Login': 'Customer Login',
            '/Register': 'Customer Sign Up',

            // Seller Auth & Dashboard
            '/seller-login': 'Seller Login',
            '/seller-register': 'Seller Registration',
            '/seller-home': 'Seller Dashboard',

            // Admin
            '/admin-login': 'Admin Login',
            '/admin-Dashboard': 'Admin Dashboard',

            // Settings & Profile
            '/Settings': 'Account Settings',
            '/Settings/profile': 'My Profile',
            '/Settings/orders': 'My Orders',
            '/Settings/address': 'My Addresses',
            '/Settings/notifications': 'Notifications',
            '/Settings/security': 'Security Settings',
            '/Settings/payment-methods': 'Payment Methods',

            // Company Pages
            '/about': 'About Us',
            '/contact': 'Contact Us',

            // Support & Help
            '/Support': 'Customer Support',
            '/shipping': 'Shipping & Delivery',
            '/returns': 'Returns & Refunds',
            '/track-order': 'Track Your Order',
            '/faqs': 'Frequently Asked Questions',

            // Legal & Policies
            '/privacy-policy': 'Privacy Policy',
            '/terms-and-conditions': 'Terms & Conditions',

            // Business & Partnerships
            '/Affiliate': 'Affiliate Program',
            '/BrandRegistry': 'Brand Registry',
            '/advertise': 'Advertise Your Products',
            '/sell': 'Sell on APK Crackers',

            // Footer Links
            '/careers': 'Careers',
            '/press': 'Press & Media',
            '/stores': 'Our Stores',
            '/sitemap': 'Sitemap',
            '/accessibility': 'Accessibility',
            '/legal': 'Legal Information',
        };

        // Check for dynamic routes
        if (path.startsWith('/product/')) return 'Product Details';
        if (path.startsWith('/category/')) {
            const category = path.split('/')[2];
            return category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category';
        }
        if (path.startsWith('/seller/')) return 'Seller Dashboard';
        if (path.startsWith('/admin/')) return 'Admin Panel';
        if (path.startsWith('/order/')) return 'Order Details';
        if (path.startsWith('/Settings/')) {
            const settingsPage = path.split('/')[2];
            const settingsTitles = {
                'profile': 'My Profile',
                'orders': 'My Orders',
                'address': 'My Addresses',
                'notifications': 'Notifications',
                'security': 'Security Settings',
                'payment-methods': 'Payment Methods',
            };
            return settingsTitles[settingsPage] || 'Settings';
        }

        return routeTitles[path] || 'APK Crackers';
    };

    useEffect(() => {
        // Check if user is logged in (check both localStorage and sessionStorage)
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        const user = sessionStorage.getItem('user') || localStorage.getItem('user');
        const role = sessionStorage.getItem('userRole') || localStorage.getItem('userRole');
        const loginTime = sessionStorage.getItem('loginTime') || localStorage.getItem('loginTime');

        if (token && user) {
            // Check if 24 hours have passed since login
            if (loginTime) {
                const currentTime = new Date().getTime();
                const loginTimestamp = parseInt(loginTime);
                const hoursPassed = (currentTime - loginTimestamp) / (1000 * 60 * 60);

                // If more than 24 hours have passed, automatically logout
                if (hoursPassed >= 24) {
                    console.log('Session expired after 24 hours. Logging out...');
                    handleLogout();
                    showToast.info('Your session has expired. Please login again.');
                    return;
                }
            }

            setIsLoggedIn(true);
            setUserRole(role || 'customer');
            try {
                const userData = JSON.parse(user);
                setUserName(userData.name || userData.username || 'User');
                // Fetch notifications for logged-in users
                fetchNotifications();
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }

        // Set up interval to check session expiry every 5 minutes
        const checkSessionInterval = setInterval(() => {
            const loginTime = sessionStorage.getItem('loginTime') || localStorage.getItem('loginTime');
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');

            if (token && loginTime) {
                const currentTime = new Date().getTime();
                const loginTimestamp = parseInt(loginTime);
                const hoursPassed = (currentTime - loginTimestamp) / (1000 * 60 * 60);

                if (hoursPassed >= 24) {
                    console.log('Session expired after 24 hours. Logging out...');
                    handleLogout();
                    showToast.info('Your session has expired. Please login again.');
                }
            }
        }, 5 * 60 * 1000); // Check every 5 minutes

        // Cleanup interval on component unmount
        return () => clearInterval(checkSessionInterval);
    }, []);

    // Update document title based on current route
    useEffect(() => {
        const path = location.pathname;
        const routeTitles = {
            // Main Pages
            '/': 'Home',
            '/products': 'Products',
            '/search': 'Search Results',

            // Cart & Wishlist
            '/Cart': 'Shopping Cart',
            '/Wishlist': 'My Wishlist',
            '/checkout': 'Checkout',
            '/Payment': 'Payment',

            // Customer Auth
            '/Login': 'Customer Login',
            '/Register': 'Customer Sign Up',

            // Seller Auth & Dashboard
            '/seller-login': 'Seller Login',
            '/seller-register': 'Seller Registration',
            '/seller-home': 'Seller Dashboard',

            // Admin
            '/admin-login': 'Admin Login',
            '/admin-Dashboard': 'Admin Dashboard',

            // Settings & Profile
            '/Settings': 'Account Settings',
            '/Settings/profile': 'My Profile',
            '/Settings/orders': 'My Orders',
            '/Settings/address': 'My Addresses',
            '/Settings/notifications': 'Notifications',
            '/Settings/security': 'Security Settings',
            '/Settings/payment-methods': 'Payment Methods',

            // Company Pages
            '/about': 'About Us',
            '/contact': 'Contact Us',

            // Support & Help
            '/Support': 'Customer Support',
            '/shipping': 'Shipping & Delivery',
            '/returns': 'Returns & Refunds',
            '/track-order': 'Track Your Order',
            '/faqs': 'Frequently Asked Questions',

            // Legal & Policies
            '/privacy-policy': 'Privacy Policy',
            '/terms-and-conditions': 'Terms & Conditions',

            // Business & Partnerships
            '/Affiliate': 'Affiliate Program',
            '/BrandRegistry': 'Brand Registry',
            '/advertise': 'Advertise Your Products',
            '/sell': 'Sell on APK Crackers',

            // Footer Links
            '/careers': 'Careers',
            '/press': 'Press & Media',
            '/stores': 'Our Stores',
            '/sitemap': 'Sitemap',
            '/accessibility': 'Accessibility',
            '/legal': 'Legal Information',
        };

        let pageTitle = 'APK Crackers';

        // Check for exact route match first
        if (routeTitles[path]) {
            pageTitle = routeTitles[path];
        }
        // Check for dynamic routes
        else if (path.startsWith('/product/')) {
            pageTitle = 'Product Details';
        }
        else if (path.startsWith('/category/')) {
            const category = path.split('/')[2];
            pageTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category';
        }
        else if (path.startsWith('/seller/')) {
            pageTitle = 'Seller Dashboard';
        }
        else if (path.startsWith('/admin/')) {
            pageTitle = 'Admin Panel';
        }
        else if (path.startsWith('/order/')) {
            pageTitle = 'Order Details';
        }
        else if (path.startsWith('/Settings/')) {
            const settingsPage = path.split('/')[2];
            const settingsTitles = {
                'profile': 'My Profile',
                'orders': 'My Orders',
                'address': 'My Addresses',
                'notifications': 'Notifications',
                'security': 'Security Settings',
                'payment-methods': 'Payment Methods',
            };
            pageTitle = settingsTitles[settingsPage] || 'Settings';
        }

        document.title = `${pageTitle} - APK Crackers`;
    }, [location.pathname]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close notifications when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch suggestions with debounce
    useEffect(() => {
        if (searchQuery.trim().length > 1) {
            // Clear previous timer
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }

            // Set new timer
            debounceTimer.current = setTimeout(() => {
                fetchSuggestions();
            }, 300); // 300ms debounce
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [searchQuery]);

    const fetchSuggestions = async () => {
        try {
            setLoadingSuggestions(true);
            const response = await API.get(`/search/suggest?q=${encodeURIComponent(searchQuery)}`);
            setSuggestions(Array.isArray(response.data) ? response.data : []);
            setShowSuggestions(true);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        } finally {
            setLoadingSuggestions(false);
        }
    };

    const handleSearch = (query = searchQuery) => {
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            setShowSuggestions(false);
            setSearchQuery(query.trim());
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
                handleSearch(suggestions[selectedSuggestionIndex].name);
            } else {
                handleSearch();
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedSuggestionIndex(prev =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setSelectedSuggestionIndex(-1);
        }
    };

    // Notification Functions
    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            setLoadingNotifications(true);
            const response = await API.get('/notifications');
            const notifs = response.data.notifications || [];
            setNotifications(notifs);
            setUnreadCount(notifs.filter(n => !n.isRead).length);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoadingNotifications(false);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await API.put(`/notifications/${notificationId}/read`);
            setNotifications(prev =>
                prev.map(n => n._id === notificationId ? { ...n, isRead: true } : n)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await API.put('/notifications/read-all');
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'order': return '📦';
            case 'payment': return '💳';
            case 'product': return '🎆';
            case 'kyc': return '✅';
            case 'payout': return '💰';
            default: return '🔔';
        }
    };

    const getTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    const handleLogout = () => {
        // Clear authentication data from both storages
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('loginTime');

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        localStorage.removeItem('loginTime');

        setIsLoggedIn(false);
        setUserName('');
        setUserRole('');
        // Redirect to home page
        navigate('/');
    };



    return (
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            {/* Main Topbar */}
            <div className="px-2 sm:px-3 md:px-4 lg:px-6 py-2.5 sm:py-3 md:py-3.5">
                <div className="flex items-center justify-between gap-1 sm:gap-2 md:gap-3 lg:gap-6">
                    {/* Left Section - Dynamic Page Title */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                            onClick={() => navigate('/')}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-orange-500 whitespace-nowrap transition-all duration-300">
                                APK Crackers
                            </h1>
                        </button>
                    </div>

                    {/* Desktop Search Bar - Hidden on Mobile */}
                    <div className="hidden md:flex flex-1 max-w-md lg:max-w-2xl" ref={searchRef}>
                        <div className="relative group w-full">
                            <FaSearch className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5 lg:w-4 lg:h-4 group-focus-within:text-orange-500 transition-colors z-10" />
                            <input
                                type="text"
                                placeholder="Search crackers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
                                className="w-full pl-9 lg:pl-12 pr-3 lg:pr-4 py-2 lg:py-3 bg-gray-50 border-2 border-gray-200 rounded-full text-sm lg:text-md text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-orange-500 hover:border-gray-300 transition-all cursor-text shadow-sm"
                            />

                            {/* Suggestions Dropdown */}
                            {showSuggestions && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto">
                                    {loadingSuggestions ? (
                                        <div className="p-4 text-center text-gray-500">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto"></div>
                                        </div>
                                    ) : suggestions.length > 0 ? (
                                        <div className="py-2">
                                            {suggestions.map((suggestion, index) => (
                                                <button
                                                    key={suggestion._id}
                                                    onClick={() => handleSearch(suggestion.name)}
                                                    className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors flex items-center gap-3 ${index === selectedSuggestionIndex ? 'bg-orange-50' : ''
                                                        }`}
                                                >
                                                    <FaSearch className="w-4 h-4 text-gray-400" />
                                                    <span className="text-gray-700">{suggestion.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : searchQuery.trim().length > 1 ? (
                                        <div className="p-4 text-center text-gray-500">
                                            No suggestions found
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Section - Icons and Buttons */}
                    <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 flex-shrink-0">
                        {/* Notification Bell */}
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative p-1.5 sm:p-2 md:p-2.5 hover:bg-orange-50 rounded-full transition-all cursor-pointer group"
                            >
                                <FaBell className="w-4 h-4 md:w-5 md:h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notification Dropdown - Fully Responsive */}
                            {showNotifications && isLoggedIn && (
                                <div className="fixed sm:absolute top-16 sm:top-full left-2 right-2 sm:left-auto sm:right-0 mt-0 sm:mt-2 w-auto sm:w-80 md:w-96 bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl shadow-2xl z-50 max-h-[calc(100vh-5rem)] sm:max-h-[500px] overflow-hidden flex flex-col">
                                    {/* Header */}
                                    <div className="p-3 sm:p-4 border-b border-gray-200 bg-orange-50 flex-shrink-0">
                                        <div className="flex items-center justify-between mb-1 sm:mb-2">
                                            <h3 className="text-base sm:text-lg font-bold text-gray-900">Notifications</h3>
                                            <div className="flex items-center gap-2">
                                                {unreadCount > 0 && (
                                                    <button
                                                        onClick={markAllAsRead}
                                                        className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors px-2 py-1 hover:bg-orange-100 rounded"
                                                    >
                                                        Mark all read
                                                    </button>
                                                )}
                                                {/* Close button for mobile */}
                                                <button
                                                    onClick={() => setShowNotifications(false)}
                                                    className="sm:hidden p-1 hover:bg-gray-200 rounded-full transition-colors"
                                                >
                                                    <FaTimes className="w-4 h-4 text-gray-600" />
                                                </button>
                                            </div>
                                        </div>
                                        {unreadCount > 0 && (
                                            <p className="text-xs sm:text-sm text-gray-600">
                                                You have {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
                                            </p>
                                        )}
                                    </div>

                                    {/* Notifications List */}
                                    <div className="overflow-y-auto flex-1 overscroll-contain">
                                        {loadingNotifications ? (
                                            <div className="p-6 sm:p-8 text-center">
                                                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-orange-500 mx-auto"></div>
                                            </div>
                                        ) : notifications.length === 0 ? (
                                            <div className="p-6 sm:p-8 text-center">
                                                <FaBell className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
                                                <p className="text-sm sm:text-base text-gray-600 font-medium">No notifications yet</p>
                                                <p className="text-xs sm:text-sm text-gray-500 mt-1">We'll notify you when something arrives</p>
                                            </div>
                                        ) : (
                                            <div className="divide-y divide-gray-100">
                                                {notifications.map((notification) => (
                                                    <div
                                                        key={notification._id}
                                                        onClick={() => !notification.isRead && markAsRead(notification._id)}
                                                        className={`p-3 sm:p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer ${!notification.isRead ? 'bg-orange-50' : ''
                                                            }`}
                                                    >
                                                        <div className="flex items-start gap-2 sm:gap-3">
                                                            <span className="text-xl sm:text-2xl flex-shrink-0 mt-0.5">
                                                                {getNotificationIcon(notification.type)}
                                                            </span>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                                    <h4 className={`text-sm sm:text-base font-semibold leading-tight ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'
                                                                        }`}>
                                                                        {notification.title}
                                                                    </h4>
                                                                    {!notification.isRead && (
                                                                        <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1.5"></div>
                                                                    )}
                                                                </div>
                                                                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-1.5">
                                                                    {notification.message}
                                                                </p>
                                                                <p className="text-[10px] sm:text-xs text-gray-500">
                                                                    {getTimeAgo(notification.createdAt)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    {notifications.length > 0 && (
                                        <div className="p-2 sm:p-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                                            <button
                                                onClick={() => {
                                                    setShowNotifications(false);
                                                }}
                                                className="w-full text-center text-xs sm:text-sm font-semibold text-orange-600 hover:text-orange-700 py-2 hover:bg-orange-50 rounded transition-colors"
                                            >
                                                View all notifications
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Desktop Login/Logout Buttons - Hidden on Mobile */}
                        {!isLoggedIn ? (
                            <>
                                {/* Login Button */}
                                <button
                                    onClick={() => navigate('/Login')}
                                    className="hidden md:block px-3 lg:px-4 xl:px-6 py-1.5 lg:py-2 xl:py-2.5 text-xs md:text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-full hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all cursor-pointer shadow-sm hover:shadow flex-shrink-0"
                                >
                                    Login
                                </button>

                                {/* Signup Button */}
                                <button
                                    onClick={() => navigate('/Register')}
                                    className="hidden md:block px-3 lg:px-4 xl:px-6 py-1.5 lg:py-2 xl:py-2.5 text-xs md:text-sm font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-lg cursor-pointer flex-shrink-0"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Profile Icon - Navigate to Settings */}
                                <button
                                    onClick={() => navigate('/Settings')}
                                    className="hidden md:flex w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-orange-500 items-center justify-center cursor-pointer hover:ring-2 hover:ring-orange-500 hover:ring-offset-2 transition-all shadow-md hover:shadow-lg"
                                    title="Go to Settings"
                                >
                                    <FaUser className="w-3.5 h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-white" />
                                </button>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="hidden md:flex w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-red-500 items-center justify-center hover:bg-red-600 transition-all shadow-md hover:shadow-lg cursor-pointer"
                                    title="Logout"
                                >
                                    <FaSignOutAlt className="w-3.5 h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-white" />
                                </button>
                            </>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-orange-50 rounded-full transition-all"
                        >
                            {isMobileMenuOpen ? (
                                <FaTimes className="w-5 h-5 text-gray-600" />
                            ) : (
                                <FaBars className="w-5 h-5 text-gray-600" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar - Shown when search icon is clicked */}
            <div className="md:hidden px-3 pb-3" ref={searchRef}>
                <div className="relative group">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-orange-500 transition-colors z-10" />
                    <input
                        type="text"
                        placeholder="Search crackers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-orange-500 hover:border-gray-300 transition-all cursor-text shadow-sm"
                    />

                    {/* Mobile Suggestions Dropdown */}
                    {showSuggestions && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl z-50 max-h-64 overflow-y-auto">
                            {loadingSuggestions ? (
                                <div className="p-4 text-center text-gray-500">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500 mx-auto"></div>
                                </div>
                            ) : suggestions.length > 0 ? (
                                <div className="py-2">
                                    {suggestions.map((suggestion, index) => (
                                        <button
                                            key={suggestion._id}
                                            onClick={() => handleSearch(suggestion.name)}
                                            className={`w-full px-3 py-2.5 text-left hover:bg-orange-50 transition-colors flex items-center gap-2 ${index === selectedSuggestionIndex ? 'bg-orange-50' : ''
                                                }`}
                                        >
                                            <FaSearch className="w-3 h-3 text-gray-400" />
                                            <span className="text-sm text-gray-700">{suggestion.name}</span>
                                        </button>
                                    ))}
                                </div>
                            ) : searchQuery.trim().length > 1 ? (
                                <div className="p-4 text-center text-sm text-gray-500">
                                    No suggestions found
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu - Dropdown */}
            {isMobileMenuOpen && (
                <div className="sm:hidden border-t border-gray-200 bg-white shadow-lg">
                    {!isLoggedIn ? (
                        <div className="px-4 py-4 space-y-3">
                            {/* Mobile Login Button */}
                            <button
                                onClick={() => {
                                    navigate('/Login');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full px-4 py-3 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
                            >
                                <FaUser className="w-4 h-4" />
                                Login
                            </button>

                            {/* Mobile Signup Button */}
                            <button
                                onClick={() => {
                                    navigate('/Register');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full px-4 py-3 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all shadow-sm flex items-center justify-center gap-2"
                            >
                                <FaUser className="w-4 h-4" />
                                Sign Up
                            </button>
                        </div>
                    ) : (
                        <div className="px-4 py-4">
                            {/* User Info Section */}
                            <div className="pb-4 mb-4 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                                        <FaUser className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-gray-900">{userName}</h3>
                                        <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="space-y-2">
                                {/* Profile Settings */}
                                <button
                                    onClick={() => {
                                        navigate('/Settings');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-3"
                                >
                                    <FaUser className="w-4 h-4 text-gray-600" />
                                    <span>Profile Settings</span>
                                </button>

                                {/* Logout */}
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all flex items-center gap-3"
                                >
                                    <FaSignOutAlt className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Searchbar;
