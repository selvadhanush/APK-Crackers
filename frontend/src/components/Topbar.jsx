import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../../api';

const Searchbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState(''); // 'customer', 'seller', or 'admin'
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const debounceTimer = useRef(null);
    const notificationRef = useRef(null);

    // Notification states
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [loadingNotifications, setLoadingNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Check if user is logged in (check both localStorage and sessionStorage)
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        const user = sessionStorage.getItem('user') || localStorage.getItem('user');
        const role = sessionStorage.getItem('userRole') || localStorage.getItem('userRole');

        if (token && user) {
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
    }, []);

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

    const getRoleBadge = () => {
        const roleConfig = {
            'customer': { label: 'Buyer', color: 'from-blue-500 to-blue-600', icon: '🛒' },
            'seller': { label: 'Seller', color: 'from-orange-500 to-orange-600', icon: '🏪' },
            'admin': { label: 'Admin', color: 'from-purple-500 to-purple-600', icon: '👑' }
        };

        const config = roleConfig[userRole] || roleConfig['customer'];

        return (
            <div className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${config.color} text-white rounded-full text-sm font-semibold shadow-md`}>
                <span>{config.icon}</span>
                <span>{config.label}</span>
            </div>
        );
    };

    const handleDashboardClick = () => {
        if (userRole === 'seller') {
            navigate('/seller-home');
        } else if (userRole === 'admin') {
            navigate('/admin-dashboard');
        } else {
            navigate('/'); // Customer goes to home
        }
    };

    return (
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between gap-6">
                {/* Left Section - Enhanced Search Bar */}
                <div className="flex-1 max-w-2xl" ref={searchRef}>
                    <div className="relative group">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-orange-500 transition-colors z-10" />
                        <input
                            type="text"
                            placeholder="Search for crackers, brands, categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-full text-md text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-orange-500 hover:border-gray-300 transition-all cursor-text shadow-sm"
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

                {/* Right Section - Notification, Role Badge, Login/Logout */}
                <div className="flex items-center gap-3">
                    {/* Notification Bell */}
                    <div className="relative" ref={notificationRef}>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2.5 hover:bg-orange-50 rounded-full transition-all cursor-pointer group"
                        >
                            <FaBell className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notification Dropdown */}
                        {showNotifications && isLoggedIn && (
                            <div className="absolute top-full right-0 mt-2 w-96 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl z-50 max-h-[500px] overflow-hidden flex flex-col">
                                {/* Header */}
                                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-yellow-50">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={markAllAsRead}
                                                className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                                            >
                                                Mark all as read
                                            </button>
                                        )}
                                    </div>
                                    {unreadCount > 0 && (
                                        <p className="text-sm text-gray-600">
                                            You have {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
                                        </p>
                                    )}
                                </div>

                                {/* Notifications List */}
                                <div className="overflow-y-auto flex-1">
                                    {loadingNotifications ? (
                                        <div className="p-8 text-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                                        </div>
                                    ) : notifications.length === 0 ? (
                                        <div className="p-8 text-center">
                                            <FaBell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-gray-600 font-medium">No notifications yet</p>
                                            <p className="text-sm text-gray-500 mt-1">We'll notify you when something arrives</p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-gray-100">
                                            {notifications.map((notification) => (
                                                <div
                                                    key={notification._id}
                                                    onClick={() => !notification.isRead && markAsRead(notification._id)}
                                                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.isRead ? 'bg-orange-50' : ''
                                                        }`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-2xl flex-shrink-0">
                                                            {getNotificationIcon(notification.type)}
                                                        </span>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                                <h4 className={`text-sm font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'
                                                                    }`}>
                                                                    {notification.title}
                                                                </h4>
                                                                {!notification.isRead && (
                                                                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1"></div>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                                                                {notification.message}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
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
                                    <div className="p-3 border-t border-gray-200 bg-gray-50">
                                        <button
                                            onClick={() => {
                                                setShowNotifications(false);
                                                // Navigate to notifications page if you create one
                                            }}
                                            className="w-full text-center text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                                        >
                                            View all notifications
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Conditional Rendering based on Login Status */}
                    {!isLoggedIn ? (
                        <>
                            {/* Login Button */}
                            <button
                                onClick={() => navigate('/Login')}
                                className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-full hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all cursor-pointer shadow-sm hover:shadow"
                            >
                                Login
                            </button>

                            {/* Signup Button */}
                            <button
                                onClick={() => navigate('/Register')}
                                className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full hover:from-orange-600 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105"
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Role Badge */}
                            <button
                                onClick={handleDashboardClick}
                                className="cursor-pointer hover:scale-105 transition-transform"
                                title={`Go to ${userRole === 'seller' ? 'Seller' : userRole === 'admin' ? 'Admin' : 'Home'} Dashboard`}
                            >
                                {getRoleBadge()}
                            </button>

                            {/* User Name Display */}
                            <span className="text-sm font-medium text-gray-700 px-2">
                                <span className="text-orange-600 font-semibold">{userName}</span>
                            </span>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-full hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105"
                            >
                                <FaSignOutAlt className="w-4 h-4" />
                                Logout
                            </button>
                        </>
                    )}

                    {/* Profile Picture */}
                    <div
                        onClick={isLoggedIn ? handleDashboardClick : () => navigate('/Login')}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-orange-500 hover:ring-offset-2 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                        <FaUser className="w-4 h-4 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Searchbar;
