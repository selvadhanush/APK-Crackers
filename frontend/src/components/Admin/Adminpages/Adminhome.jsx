import React, { useState, useEffect } from 'react';
import Adminsidebar from '../components/Adminsidebar';
import Adminkyc from '../components/Adminkyc';
import Adminapproval from '../components/Adminapproval';
import Adminorders from '../components/Adminorders';
import AdminPayouts from '../components/AdminPayouts';
import AdminAllProducts from '../components/AdminAllProducts';
import API from '../../../../api';

import {
    MdDashboard,
    MdVerifiedUser,
    MdInventory,
    MdShoppingCart,
    MdTrendingUp,
    MdPeople,
    MdAttachMoney,
    MdCheckCircle
} from 'react-icons/md';

const Adminhome = () => {
    const [activePage, setActivePage] = useState('Dashboard');
    const [stats, setStats] = useState({
        totalSellers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        pendingKYC: 0,
        pendingApprovals: 0,
        activeOrders: 0,
        completedOrders: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch admin dashboard stats from API
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            setError('');

            // Fetch analytics data
            const analyticsResponse = await API.get('/admin/analytics/dashboard');
            const analyticsData = analyticsResponse.data;

            // Fetch pending products
            const productsResponse = await API.get('/admin/products/pending');
            const pendingProducts = productsResponse.data;

            // Fetch total products count
            const productsCountResponse = await API.get('/admin/products/count');
            const totalProductsCount = productsCountResponse.data.totalProducts;

            // Fetch pending KYCs
            const kycResponse = await API.get('/admin/kyc/pending');
            const pendingKYCs = kycResponse.data;

            // Update stats with real data from backend
            setStats({
                totalSellers: analyticsData.totalSellers || 0,
                totalProducts: totalProductsCount || 0,
                totalOrders: analyticsData.totalOrders || 0,
                totalRevenue: analyticsData.totalSales || 0,
                pendingKYC: pendingKYCs.length || 0,
                pendingApprovals: pendingProducts.length || 0,
                activeOrders: analyticsData.totalOrders - analyticsData.deliveredOrders || 0,
                completedOrders: analyticsData.deliveredOrders || 0
            });
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            setError('Failed to load dashboard statistics');
        } finally {
            setLoading(false);
        }
    };

    const handleNavigate = (page) => {
        setActivePage(page);
    };

    const renderDashboard = () => {
        // Show loading state
        if (loading) {
            return (
                <div className="p-6 flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading dashboard statistics...</p>
                    </div>
                </div>
            );
        }

        // Show error state
        if (error) {
            return (
                <div className="p-6">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
                        <p className="font-semibold mb-2">Error Loading Dashboard</p>
                        <p className="text-sm">{error}</p>
                        <button
                            onClick={fetchDashboardStats}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            );
        }

        const statCards = [
            {
                title: 'Total Sellers',
                value: stats.totalSellers,
                icon: MdPeople,
                color: 'blue',
                bgColor: 'bg-blue-100',
                iconColor: 'text-blue-600'
            },
            {
                title: 'Total Products',
                value: stats.totalProducts,
                icon: MdInventory,
                color: 'purple',
                bgColor: 'bg-purple-100',
                iconColor: 'text-purple-600'
            },
            {
                title: 'Total Orders',
                value: stats.totalOrders,
                icon: MdShoppingCart,
                color: 'green',
                bgColor: 'bg-green-100',
                iconColor: 'text-green-600'
            },
            {
                title: 'Total Revenue',
                value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`,
                icon: MdAttachMoney,
                color: 'orange',
                bgColor: 'bg-orange-100',
                iconColor: 'text-orange-600'
            }
        ];

        const actionCards = [
            {
                title: 'Pending KYC',
                value: stats.pendingKYC,
                icon: MdVerifiedUser,
                color: 'yellow',
                bgColor: 'bg-yellow-50',
                iconColor: 'text-yellow-600',
                action: () => handleNavigate('KYC Verification')
            },
            {
                title: 'Pending Approvals',
                value: stats.pendingApprovals,
                icon: MdCheckCircle,
                color: 'indigo',
                bgColor: 'bg-indigo-50',
                iconColor: 'text-indigo-600',
                action: () => handleNavigate('Product Approval')
            },
            {
                title: 'Active Orders',
                value: stats.activeOrders,
                icon: MdTrendingUp,
                color: 'teal',
                bgColor: 'bg-teal-50',
                iconColor: 'text-teal-600',
                action: () => handleNavigate('Orders')
            }
        ];

        return (
            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`${card.bgColor} p-3 rounded-lg`}>
                                        <Icon className={`w-6 h-6 ${card.iconColor}`} />
                                    </div>
                                </div>
                                <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
                                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Action Cards */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {actionCards.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={index}
                                    onClick={card.action}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer hover:border-blue-300"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`${card.bgColor} p-3 rounded-lg`}>
                                            <Icon className={`w-6 h-6 ${card.iconColor}`} />
                                        </div>
                                        <span className="text-3xl font-bold text-gray-800">{card.value}</span>
                                    </div>
                                    <h3 className="text-gray-700 font-semibold mb-1">{card.title}</h3>
                                    <p className="text-sm text-blue-600 font-medium">View Details →</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <MdCheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">New seller registered</p>
                                <p className="text-xs text-gray-500">2 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <MdInventory className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">Product awaiting approval</p>
                                <p className="text-xs text-gray-500">15 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                <MdShoppingCart className="w-5 h-5 text-orange-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">New order placed</p>
                                <p className="text-xs text-gray-500">1 hour ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        switch (activePage) {
            case 'Dashboard':
                return renderDashboard();
            case 'KYC Verification':
                return (
                    <div className="p-6">
                        <Adminkyc />
                    </div>
                );

            case 'All Products':
                return <AdminAllProducts />;

            case 'Product Approval':
                return (
                    <div className="p-6">
                        <Adminapproval />
                    </div>
                );

            case 'Rejected Products':
                return <AdminAllProducts />;

            case 'Orders':
                return (
                    <div className="p-6">
                        <Adminorders />
                    </div>
                );
            case 'Payouts':
                return (
                    <div className="p-6">
                        <AdminPayouts />
                    </div>
                );
            case 'Settings':
                return (
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Settings</h1>
                        <p className="text-gray-600">Configure admin settings and preferences.</p>
                    </div>
                );
            case 'Profile':
                return (
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Profile</h1>
                        <p className="text-gray-600">View and edit your admin profile information.</p>
                    </div>
                );
            default:
                return renderDashboard();
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Adminsidebar onNavigate={handleNavigate} activePage={activePage} />
            <div className="flex-1 overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default Adminhome;
