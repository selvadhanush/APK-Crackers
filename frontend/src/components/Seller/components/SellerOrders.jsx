import React, { useState } from 'react';
import { MdSearch, MdVisibility, MdPrint, MdDownload, MdCalendarToday } from 'react-icons/md';
import { FaInfinity } from 'react-icons/fa';

const SellerOrders = ({ onViewOrder }) => {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = ['All', 'Pending', 'Shipped', 'Completed', 'Cancelled'];

    const orders = [
        {
            id: 'FC-1001',
            customer: { name: 'Alice Smith', avatar: 'A' },
            product: { name: 'Classic Firecracker Pack', image: '🎆' },
            date: '2023-10-26',
            status: 'Pending',
            amount: '$59.99',
            statusColor: 'bg-orange-100 text-orange-700'
        },
        {
            id: 'FC-1002',
            customer: { name: 'Bob Johnson', avatar: 'B' },
            product: { name: 'Assorted Party Pack', image: '🎉' },
            date: '2023-10-25',
            status: 'Shipped',
            amount: '$34.50',
            statusColor: 'bg-blue-100 text-blue-700'
        },
        {
            id: 'FC-1003',
            customer: { name: 'Charlie Brown', avatar: 'C' },
            product: { name: 'Grand Roman Candle', image: '🎇' },
            date: '2023-10-24',
            status: 'Completed',
            amount: '$75.00',
            statusColor: 'bg-green-100 text-green-700'
        },
        {
            id: 'FC-1004',
            customer: { name: 'Diana Miller', avatar: 'D' },
            product: { name: 'Sparkler Fun Pack', image: '✨' },
            date: '2023-10-23',
            status: 'Cancelled',
            amount: '$15.99',
            statusColor: 'bg-red-100 text-red-700'
        },
        {
            id: 'FC-1005',
            customer: { name: 'Eve Davis', avatar: 'E' },
            product: { name: 'Colorful Smoke Grenades', image: '💨' },
            date: '2023-10-22',
            status: 'Pending',
            amount: '$49.99',
            statusColor: 'bg-orange-100 text-orange-700'
        },
    ];

    const filteredOrders = orders.filter(order => {
        const matchesTab = activeTab === 'All' || order.status === activeTab;
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                        <FaInfinity className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Orders List</h1>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${activeTab === tab
                                    ? 'bg-orange-500 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Search and Date Filter */}
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all w-64"
                            />
                        </div>

                        {/* Date Filter */}
                        <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-all">
                            <MdCalendarToday className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700 font-medium">Last 30 Days</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left">
                                    <input type="checkbox" className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer" />
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Product(s)</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <input type="checkbox" className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-semibold text-gray-900">{order.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs font-semibold">{order.customer.avatar}</span>
                                            </div>
                                            <span className="text-sm text-gray-700">{order.customer.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                                                {order.product.image}
                                            </div>
                                            <span className="text-sm text-gray-700">{order.product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">{order.date}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.statusColor}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-semibold text-gray-900">{order.amount}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onViewOrder && onViewOrder(order.id)}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <MdVisibility className="w-5 h-5 text-gray-600" />
                                            </button>
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Print">
                                                <MdPrint className="w-5 h-5 text-gray-600" />
                                            </button>
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
                                                <MdDownload className="w-5 h-5 text-gray-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-sm text-gray-600">
                        Showing <span className="font-semibold">{filteredOrders.length}</span> of <span className="font-semibold">{orders.length}</span> orders
                    </p>
                </div>
            </div>

            {/* Footer Copyright */}
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">© 2025 - All rights reserved.</p>
            </div>
        </div>
    );
};

export default SellerOrders;
