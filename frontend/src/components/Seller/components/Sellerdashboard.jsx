import React from 'react';
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

const Sellerdashboard = () => {
    // Dashboard stats
    const stats = [
        {
            title: 'Total Orders',
            value: '1,234',
            icon: MdShoppingCart,
            bgColor: 'bg-orange-100',
            iconColor: 'text-orange-600'
        },
        {
            title: 'Total Revenue',
            value: '$56,789.00',
            icon: MdAttachMoney,
            bgColor: 'bg-orange-100',
            iconColor: 'text-orange-600'
        },
        {
            title: 'Products Listed',
            value: '247',
            icon: MdInventory,
            bgColor: 'bg-orange-100',
            iconColor: 'text-orange-600'
        },
        {
            title: 'Pending KYC Status',
            value: 'Action Required',
            icon: MdWarning,
            bgColor: 'bg-orange-100',
            iconColor: 'text-orange-600',
            isWarning: true
        },
    ];

    // Weekly sales data
    const weeklySales = [
        { month: 'Jan', sales: 1.5, target: 1.2 },
        { month: 'Feb', sales: 2.0, target: 1.5 },
        { month: 'Mar', sales: 1.8, target: 1.8 },
        { month: 'Apr', sales: 2.5, target: 2.0 },
        { month: 'May', sales: 2.2, target: 2.3 },
        { month: 'Jun', sales: 2.8, target: 2.5 },
        { month: 'Jul', sales: 2.6, target: 2.7 },
    ];

    const maxValue = 3.0;

    // Recent orders
    const recentOrders = [
        { id: '#FC001', product: 'Firecracker Sparklers', date: '2023-07-20', status: 'Completed', amount: '$120.00', statusColor: 'text-green-600 bg-green-100' },
        { id: '#FC002', product: 'Assorted Rocket Pack', date: '2023-07-19', status: 'Pending', amount: '$250.00', statusColor: 'text-orange-600 bg-orange-100' },
        { id: '#FC003', product: 'Mega Bomb Kit', date: '2023-07-18', status: 'Completed', amount: '$500.00', statusColor: 'text-green-600 bg-green-100' },
        { id: '#FC004', product: 'Celebration Confetti', date: '2023-07-17', status: 'Cancelled', amount: '$80.00', statusColor: 'text-red-600 bg-red-100' },
        { id: '#FC005', product: 'Rainbow Fountain', date: '2023-07-17', status: 'Completed', amount: '$150.00', statusColor: 'text-green-600 bg-green-100' },
        { id: '#FC006', product: 'Smoke Bomb Variety', date: '2023-07-16', status: 'Pending', amount: '$95.00', statusColor: 'text-orange-600 bg-orange-100' },
    ];

    return (
        <div>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
                            <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening with your store today.</p>
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
                                    <span className="text-white font-semibold text-sm">SK</span>
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
                                <p className={`text-2xl font-bold ${stat.isWarning ? 'text-orange-600' : 'text-gray-900'}`}>
                                    {stat.value}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Weekly Sales Performance */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Weekly Sales Performance</h2>

                        {/* Chart */}
                        <div className="relative h-80">
                            {/* Y-axis labels */}
                            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
                                <span>$3k</span>
                                <span>$2.5k</span>
                                <span>$2k</span>
                                <span>$1.5k</span>
                                <span>$1k</span>
                                <span>$0.5k</span>
                                <span>$0k</span>
                            </div>

                            {/* Chart area */}
                            <div className="ml-12 h-full flex items-end justify-between gap-4 border-b border-l border-gray-200 pb-8 pl-4">
                                {weeklySales.map((data, index) => {
                                    const salesHeight = (data.sales / maxValue) * 100;
                                    const targetHeight = (data.target / maxValue) * 100;

                                    return (
                                        <div key={index} className="flex-1 flex flex-col items-center gap-2 relative">
                                            {/* Target line indicator */}
                                            <div
                                                className="absolute w-full border-t-2 border-orange-400 border-dashed"
                                                style={{ bottom: `${targetHeight}%` }}
                                            ></div>

                                            {/* Sales bar */}
                                            <div className="w-full flex items-end justify-center relative" style={{ height: '100%' }}>
                                                <div
                                                    className="w-full bg-orange-500 rounded-t-lg hover:bg-orange-600 transition-colors cursor-pointer relative group"
                                                    style={{ height: `${salesHeight}%` }}
                                                >
                                                    {/* Tooltip on hover */}
                                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                        ${data.sales}k
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* X-axis labels */}
                            <div className="ml-12 mt-2 flex justify-between text-xs text-gray-600 font-medium">
                                {weeklySales.map((data, index) => (
                                    <div key={index} className="flex-1 text-center">
                                        {data.month}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                                <span className="text-sm text-gray-600">Sales</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-0.5 bg-orange-400 border-dashed"></div>
                                <span className="text-sm text-gray-600">Target</span>
                            </div>
                        </div>
                    </div>

                    {/* KYC Verification Status */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">KYC Verification Status</h2>
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
                                <MdWarning className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <span className="text-sm font-semibold text-gray-900">Pending Review</span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Your KYC documents are currently under review. You'll be notified once it's verified!
                            </p>
                        </div>

                        <button className="w-full py-3 px-4 bg-white border-2 border-orange-500 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-all">
                            Re-upload Documents
                        </button>

                        {/* Document status */}
                        <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Place License</span>
                                <MdCheckCircle className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Storage License</span>
                                <MdCheckCircle className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Production License</span>
                                <MdPending className="w-5 h-5 text-orange-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentOrders.map((order, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{order.product}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.statusColor}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sellerdashboard;
