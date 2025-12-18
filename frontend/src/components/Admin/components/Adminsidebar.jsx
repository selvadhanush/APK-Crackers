import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MdDashboard,
    MdVerifiedUser,
    MdInventory,
    MdCheckCircle,
    MdCancel,
    MdShoppingCart,
    MdSettings,
    MdLogout,
    MdPerson,
    MdNotifications,
    MdAttachMoney
} from 'react-icons/md';

const Adminsidebar = ({ onNavigate, activePage = 'Dashboard' }) => {
    const navigate = useNavigate();
    const [adminInfo, setAdminInfo] = useState({ name: '', email: '' });
    const [pendingOrders, setPendingOrders] = useState(0);
    const [pendingKYC, setPendingKYC] = useState(0);

    useEffect(() => {
        // Get admin info from localStorage
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userData = JSON.parse(user);
                setAdminInfo({
                    name: userData.name || 'Admin',
                    email: userData.email || ''
                });
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }

        // Check for 24-hour auto-logout
        checkLoginExpiry();

        // Set up interval to check every minute
        const interval = setInterval(checkLoginExpiry, 60000);

        return () => clearInterval(interval);
    }, []);

    const checkLoginExpiry = () => {
        const loginTime = localStorage.getItem('loginTime');
        const userRole = localStorage.getItem('userRole');

        if (loginTime && userRole === 'admin') {
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - parseInt(loginTime);
            const hoursPassed = timeDiff / (1000 * 60 * 60);

            // If more than 24 hours have passed, auto-logout
            if (hoursPassed >= 24) {
                handleLogout(true);
            }
        }
    };

    const handleLogout = (isAutoLogout = false) => {
        // Clear all auth data from both sessionStorage and localStorage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('loginTime');

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        localStorage.removeItem('loginTime');

        // Show alert if auto-logout
        if (isAutoLogout) {
            alert('Your session has expired after 24 hours. Please login again.');
        }

        // Redirect to admin login
        navigate('/admin-login');
    };

    const menuItems = [
        { name: 'Dashboard', icon: MdDashboard },
        {
            name: 'KYC Verification',
            icon: MdVerifiedUser,
            badge: pendingKYC > 0 ? pendingKYC : null
        },
        { name: 'All Products', icon: MdInventory },
        { name: 'Product Approval', icon: MdCheckCircle },
        { name: 'Rejected Products', icon: MdCancel },
        {
            name: 'Orders',
            icon: MdShoppingCart,
            badge: pendingOrders > 0 ? pendingOrders : null
        },
        { name: 'Payouts', icon: MdAttachMoney },
    ];

    const bottomMenuItems = [
        { name: 'Settings', icon: MdSettings },
        { name: 'Logout', icon: MdLogout },
    ];

    const handleItemClick = (itemName) => {
        if (itemName === 'Logout') {
            handleLogout(false);
        } else if (onNavigate) {
            onNavigate(itemName);
        }
    };

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between py-4 shadow-sm">
            {/* Profile Section */}
            <div className="px-4 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <MdPerson className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-sm truncate">
                                {adminInfo.name}
                            </h3>
                            <p className="text-blue-100 text-xs truncate">
                                {adminInfo.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => onNavigate && onNavigate('Profile')}
                        className="w-full py-2 bg-white/20 hover:bg-white/30 text-white text-xs font-medium rounded-lg transition-all backdrop-blur-sm"
                    >
                        View Profile
                    </button>
                </div>
            </div>

            {/* Main Menu Items */}
            <div className="flex-1 flex flex-col gap-1 px-2 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.name;

                    return (
                        <div
                            key={item.name}
                            onClick={() => handleItemClick(item.name)}
                            className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer
                transition-all duration-200 ease-in-out relative
                ${isActive
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }
              `}
                        >
                            <Icon className={`text-lg ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                            <span className={`text-sm font-medium flex-1 ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>
                                {item.name}
                            </span>
                            {item.badge && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                                    {item.badge}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Bottom Menu Items */}
            <div className="flex flex-col gap-1 px-2 border-t border-gray-200 pt-4">
                {bottomMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.name;

                    return (
                        <div
                            key={item.name}
                            onClick={() => handleItemClick(item.name)}
                            className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer
                transition-all duration-200 ease-in-out
                ${isActive
                                    ? 'bg-blue-100 text-blue-600'
                                    : item.name === 'Logout'
                                        ? 'text-red-600 hover:bg-red-50'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }
              `}
                        >
                            <Icon className={`text-lg ${isActive ? 'text-blue-600' : item.name === 'Logout' ? 'text-red-600' : 'text-gray-500'}`} />
                            <span className={`text-sm font-medium ${isActive ? 'text-blue-600' : item.name === 'Logout' ? 'text-red-600' : 'text-gray-700'}`}>
                                {item.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Adminsidebar;
