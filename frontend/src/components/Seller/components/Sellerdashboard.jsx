import React, { useState, useEffect } from 'react';
import {
    MdShoppingCart,
    MdAttachMoney,
    MdInventory,
    MdWarning,
    MdCheckCircle,
    MdCancel,
    MdPending,
    MdNotifications,
    MdSearch
} from 'react-icons/md';
import { FaFire } from 'react-icons/fa';
import API from '../../../../api';

const Sellerdashboard = () => {
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [sellerInfo, setSellerInfo] = useState({ name: '', kycStatus: 'not_submitted' });

    useEffect(() => {
        // Load seller info first
        const user = sessionStorage.getItem('user') || localStorage.getItem('user');
        if (user) {
            try {
                const userData = JSON.parse(user);
                const kycStatus = userData.kycStatus || 'not_submitted';
                setSellerInfo({
                    name: userData.name || userData.businessName || 'Seller',
                    kycStatus: kycStatus
                });

                // Only fetch data if KYC is approved
                if (kycStatus === 'approved') {
                    fetchDashboardData();
                    fetchRecentOrders();
                } else {
                    // Set default values for non-approved sellers
                    setDashboardData({
                        totalOrders: 0,
                        totalEarnings: 0,
                        deliveredOrders: 0,
                        pendingOrders: 0
                    });
                    setRecentOrders([]);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const loadSellerInfo = () => {
        const user = sessionStorage.getItem('user') || localStorage.getItem('user');
        if (user) {
            try {
                const userData = JSON.parse(user);
                setSellerInfo({
                    name: userData.name || userData.businessName || 'Seller',
                    kycStatus: userData.kycStatus || 'not_submitted'
                });
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    };

    const fetchDashboardData = async () => {
        // Check KYC status before making API call
        if (sellerInfo.kycStatus !== 'approved') {
            setDashboardData({
                totalOrders: 0,
                totalEarnings: 0,
                deliveredOrders: 0,
                pendingOrders: 0
            });
            setLoading(false);
            return;
        }

        try {
            const response = await API.get('/seller/analytics/dashboard');
            setDashboardData(response.data);
            setLoading(false);
        } catch (error) {
            // Silently handle KYC not approved error
            if (error.response?.status === 403) {
                // KYC not approved - this is expected, don't log error
                setDashboardData({
                    totalOrders: 0,
                    totalEarnings: 0,
                    deliveredOrders: 0,
                    pendingOrders: 0
                });
            }
            setLoading(false);
        }
    };

    const fetchRecentOrders = async () => {
        // Check KYC status before making API call
        if (sellerInfo.kycStatus !== 'approved') {
            setRecentOrders([]);
            return;
        }

        try {
            const response = await API.get('/seller/orders');
            // Get only the latest 6 orders
            setRecentOrders(response.data.slice(0, 6));
        } catch (error) {
            // Silently handle KYC not approved error
            if (error.response?.status === 403) {
                // KYC not approved - this is expected, don't log error
                setRecentOrders([]);
            }
        }
    };

    const getStatusColor = (status) => {
        const statusColors = {
            'delivered': 'text-green-600 bg-green-100',
            'shipped': 'text-blue-600 bg-blue-100',
            'packed': 'text-purple-600 bg-purple-100',
            'paid': 'text-orange-600 bg-orange-100',
            'cancelled': 'text-red-600 bg-red-100',
            'pending': 'text-yellow-600 bg-yellow-100'
        };
        return statusColors[status] || 'text-gray-600 bg-gray-100';
    };

    const getKycStatusInfo = (status) => {
        const statusInfo = {
            'not_submitted': {
                color: 'text-gray-600',
                bgColor: 'bg-gray-100',
                message: 'KYC documents not submitted yet. Please upload your documents to start selling.',
                icon: MdWarning,
                iconColor: 'text-gray-600'
            },
            'pending_review': {
                color: 'text-orange-600',
                bgColor: 'bg-orange-100',
                message: 'Your KYC documents are currently under review. You\'ll be notified once verified!',
                icon: MdPending,
                iconColor: 'text-orange-600'
            },
            'approved': {
                color: 'text-green-600',
                bgColor: 'bg-green-100',
                message: 'Your KYC is approved! You can now sell products on the platform.',
                icon: MdCheckCircle,
                iconColor: 'text-green-600'
            },
            'rejected': {
                color: 'text-red-600',
                bgColor: 'bg-red-100',
                message: 'Your KYC documents were rejected. Please re-upload valid documents.',
                icon: MdCancel,
                iconColor: 'text-red-600'
            },
            'license_expired': {
                color: 'text-orange-600',
                bgColor: 'bg-orange-100',
                message: 'Your license has expired. Please upload renewed documents.',
                icon: MdWarning,
                iconColor: 'text-orange-600'
            }
        };
        return statusInfo[status] || statusInfo['not_submitted'];
    };

    const stats = [
        {
            title: 'Total Orders',
            value: loading ? '...' : dashboardData?.totalOrders || 0,
            icon: MdShoppingCart,
            bgColor: 'bg-orange-100',
            iconColor: 'text-orange-600'
        },
        {
            title: 'Total Earnings',
            value: loading ? '...' : `₹${(dashboardData?.totalEarnings || 0).toLocaleString('en-IN')}`,
            icon: MdAttachMoney,
            bgColor: 'bg-green-100',
            iconColor: 'text-green-600'
        },
        {
            title: 'Delivered Orders',
            value: loading ? '...' : dashboardData?.deliveredOrders || 0,
            icon: MdCheckCircle,
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600'
        },
        {
            title: 'Pending Orders',
            value: loading ? '...' : dashboardData?.pendingOrders || 0,
            icon: MdPending,
            bgColor: 'bg-yellow-100',
            iconColor: 'text-yellow-600'
        },
    ];

    const kycInfo = getKycStatusInfo(sellerInfo.kycStatus);
    const StatusIcon = kycInfo.icon;

    return (
        <div>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
                            <p className="text-sm text-gray-500 mt-1">Welcome back, {sellerInfo.name}! Here's what's happening with your store today.</p>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Search Bar */}
                            <div className="relative">
                                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search orders, products..."
                                    className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all w-64"
                                />
                            </div>

                            {/* Notifications */}
                            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <MdNotifications className="w-6 h-6 text-gray-600" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* Profile */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">
                                        {sellerInfo.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-8 bg-gray-50 min-h-screen">
                {/* Dashboard Overview Header */}
                <div className="flex items-center gap-2 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <FaFire className="text-orange-500 text-xl" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                                        <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stat.value}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sales Chart Placeholder */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Sales Overview</h2>
                        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">Sales chart coming soon...</p>
                        </div>
                    </div>

                    {/* KYC Verification Status */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">KYC Status</h2>
                            <div className={`w-12 h-12 ${kycInfo.bgColor} rounded-full flex items-center justify-center ${sellerInfo.kycStatus === 'pending_review' ? 'animate-pulse' : ''}`}>
                                <StatusIcon className={`w-6 h-6 ${kycInfo.iconColor}`} />
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-2 h-2 ${kycInfo.bgColor} rounded-full`}></div>
                                <span className={`text-sm font-semibold ${kycInfo.color}`}>
                                    {sellerInfo.kycStatus.replace('_', ' ').toUpperCase()}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {kycInfo.message}
                            </p>
                        </div>

                        {sellerInfo.kycStatus !== 'approved' && (
                            <button className="w-full py-3 px-4 bg-white border-2 border-orange-500 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-all">
                                {sellerInfo.kycStatus === 'not_submitted' ? 'Upload Documents' : 'Re-upload Documents'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500 mx-auto"></div>
                            <p className="text-gray-500 mt-4">Loading orders...</p>
                        </div>
                    ) : recentOrders.length === 0 ? (
                        <div className="p-12 text-center">
                            <MdShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No orders yet</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order._id.slice(-6)}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{order.customerId?.name || 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                ₹{order.totalAmount?.toLocaleString('en-IN') || 0}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sellerdashboard;
