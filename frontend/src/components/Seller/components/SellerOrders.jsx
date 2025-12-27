import React, { useState, useEffect } from 'react';
import { MdSearch, MdVisibility, MdPrint, MdDownload, MdCalendarToday } from 'react-icons/md';
import { FaInfinity } from 'react-icons/fa';
import API from '../../../../api';
const SellerOrders = ({ onViewOrder }) => {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const tabs = ['All', 'Paid', 'Packed', 'Shipped', 'Delivered', 'Cancelled'];

    useEffect(() => {
        // Check KYC status before fetching
        const user = sessionStorage.getItem('user') || localStorage.getItem('user');
        if (user) {
            try {
                const userData = JSON.parse(user);
                const kycStatus = userData.kycStatus || 'not_submitted';

                if (kycStatus === 'approved') {
                    fetchOrders();
                } else {
                    setError('Please complete KYC verification to view orders');
                    setOrders([]);
                    setLoading(false);
                }
            } catch (error) {
                setError('Failed to load user data');
                setLoading(false);
            }
        } else {
            setError('Please login to view orders');
            setLoading(false);
        }
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await API.get('/seller/orders');
            setOrders(response.data);
            setLoading(false);
        } catch (err) {
            // Silently handle KYC not approved error
            if (err.response?.status === 403) {
                // KYC not approved - show friendly message
                setError('Please complete KYC verification to view orders');
                setOrders([]);
            } else {
                setError('Failed to load orders');
            }
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const statusColors = {
            'paid': 'bg-orange-100 text-orange-700',
            'packed': 'bg-purple-100 text-purple-700',
            'shipped': 'bg-blue-100 text-blue-700',
            'delivered': 'bg-green-100 text-green-700',
            'cancelled': 'bg-red-100 text-red-700',
            'pending': 'bg-yellow-100 text-yellow-700'
        };
        return statusColors[status] || 'bg-gray-100 text-gray-700';
    };

    const filteredOrders = orders.filter(order => {
        const matchesTab = activeTab === 'All' || order.status.toLowerCase() === activeTab.toLowerCase();
        const matchesSearch =
            order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerId?.email?.toLowerCase().includes(searchQuery.toLowerCase());
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
                <p className="text-sm text-gray-500">Manage and track all your customer orders</p>
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
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500 mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading orders...</p>
                    </div>
                ) : error ? (
                    <div className="p-12 text-center">
                        <p className="text-red-600">{error}</p>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-500">No orders found</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left">
                                            <input type="checkbox" className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer" />
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Items</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <input type="checkbox" className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-semibold text-gray-900">#{order._id.slice(-6)}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-xs font-semibold">
                                                            {order.customerId?.name?.charAt(0).toUpperCase() || 'C'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-700 font-medium">
                                                            {order.customerId?.name || 'N/A'}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {order.customerId?.email || ''}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm text-gray-700">
                                                        {order.items?.length || 0} item(s)
                                                    </span>
                                                    {order.items && order.items.length > 0 && (
                                                        <span className="text-xs text-gray-500">
                                                            {order.items[0].productId?.name || 'Product'}
                                                            {order.items.length > 1 && ` +${order.items.length - 1} more`}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600">
                                                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    ₹{order.totalAmount?.toLocaleString('en-IN') || 0}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => onViewOrder && onViewOrder(order._id)}
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
                    </>
                )}
            </div>

            {/* Footer Copyright */}
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">© 2025 - All rights reserved.</p>
            </div>
        </div>
    );
};

export default SellerOrders;
