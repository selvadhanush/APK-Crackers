import React, { useState, useEffect } from 'react';
import API from '../../../../api';
import {
    MdAttachMoney,
    MdCheckCircle,
    MdPending,
    MdAccountBalance,
    MdSearch,
    MdFilterList,
    MdPayment,
    MdRefresh,
    MdTrendingUp
} from 'react-icons/md';

const AdminPayouts = () => {
    const [payouts, setPayouts] = useState([]);
    const [filteredPayouts, setFilteredPayouts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(true);
    const [processingPayout, setProcessingPayout] = useState(null);

    useEffect(() => {
        fetchPayouts();
    }, []);

    useEffect(() => {
        filterPayoutsData();
    }, [searchTerm, filterStatus, payouts]);

    const fetchPayouts = async () => {
        try {
            setLoading(true);
            const response = await API.get('/admin/payouts/admin');
            setPayouts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching payouts:', error);
            setLoading(false);
        }
    };

    const filterPayoutsData = () => {
        let filtered = payouts;

        // Filter by status
        if (filterStatus !== 'all') {
            filtered = filtered.filter(payout => payout.status === filterStatus);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(payout =>
                payout._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payout.sellerId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payout.sellerId?.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payout.orderId?._id?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredPayouts(filtered);
    };

    const handleMarkAsPaid = async (payoutId) => {
        if (!window.confirm('Are you sure you want to mark this payout as paid?')) {
            return;
        }

        try {
            setProcessingPayout(payoutId);
            await API.put(`/admin/payouts/admin/pay/${payoutId}`);

            // Update local state
            setPayouts(prev =>
                prev.map(payout =>
                    payout._id === payoutId
                        ? { ...payout, status: 'paid' }
                        : payout
                )
            );

            alert('Payout marked as paid successfully!');
        } catch (error) {
            console.error('Error marking payout as paid:', error);
            alert('Failed to mark payout as paid: ' + (error.response?.data?.message || error.message));
        } finally {
            setProcessingPayout(null);
        }
    };

    const getStatusColor = (status) => {
        const statusColors = {
            'paid': 'bg-green-100 text-green-800',
            'processing': 'bg-blue-100 text-blue-800',
            'pending': 'bg-yellow-100 text-yellow-800'
        };
        return statusColors[status] || 'bg-gray-100 text-gray-800';
    };

    const calculateStats = () => {
        const totalPayouts = payouts.length;
        const pendingPayouts = payouts.filter(p => p.status === 'pending' || p.status === 'processing').length;
        const paidPayouts = payouts.filter(p => p.status === 'paid').length;

        const totalPendingAmount = payouts
            .filter(p => p.status === 'pending' || p.status === 'processing')
            .reduce((sum, p) => sum + p.netAmount, 0);

        const totalPaidAmount = payouts
            .filter(p => p.status === 'paid')
            .reduce((sum, p) => sum + p.netAmount, 0);

        const totalCommission = payouts.reduce((sum, p) => sum + p.commission, 0);

        return {
            totalPayouts,
            pendingPayouts,
            paidPayouts,
            totalPendingAmount,
            totalPaidAmount,
            totalCommission
        };
    };

    const stats = calculateStats();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading payouts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full">
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payout Management</h1>
                        <p className="text-gray-600">Manage seller payouts and commission tracking</p>
                    </div>
                    <button
                        onClick={fetchPayouts}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <MdRefresh className="w-5 h-5" />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Payouts</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.totalPayouts}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Pending: {stats.pendingPayouts} | Paid: {stats.paidPayouts}
                            </p>
                        </div>
                        <MdAccountBalance className="w-10 h-10 text-gray-400" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pending Amount</p>
                            <p className="text-2xl font-bold text-yellow-600">
                                ₹{stats.totalPendingAmount.toLocaleString('en-IN')}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">To be paid to sellers</p>
                        </div>
                        <MdPending className="w-10 h-10 text-yellow-400" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Commission</p>
                            <p className="text-2xl font-bold text-green-600">
                                ₹{stats.totalCommission.toLocaleString('en-IN')}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Platform earnings</p>
                        </div>
                        <MdTrendingUp className="w-10 h-10 text-green-400" />
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by payout ID, seller name, or order ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                        <MdFilterList className="text-gray-400 w-5 h-5" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="paid">Paid</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Payouts Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payout ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Seller
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Commission
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Net Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Settlement Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPayouts.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
                                        No payouts found
                                    </td>
                                </tr>
                            ) : (
                                filteredPayouts.map((payout) => (
                                    <tr key={payout._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-blue-600">
                                                #{payout._id.slice(-8)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {payout.sellerId?.name || 'N/A'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {payout.sellerId?.businessName || 'N/A'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                #{payout.orderId?._id?.slice(-6) || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-900">
                                                ₹{payout.totalAmount.toLocaleString('en-IN')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-green-600">
                                                ₹{payout.commission.toLocaleString('en-IN')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">
                                                ₹{payout.netAmount.toLocaleString('en-IN')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payout.status)}`}>
                                                {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {payout.settlementDate
                                                ? new Date(payout.settlementDate).toLocaleDateString('en-IN', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })
                                                : 'Pending'
                                            }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {payout.status !== 'paid' ? (
                                                <button
                                                    onClick={() => handleMarkAsPaid(payout._id)}
                                                    disabled={processingPayout === payout._id}
                                                    className="flex items-center gap-1 text-green-600 hover:text-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {processingPayout === payout._id ? (
                                                        <>
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                                                            Processing...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <MdPayment className="w-4 h-4" />
                                                            Mark as Paid
                                                        </>
                                                    )}
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-1 text-green-600">
                                                    <MdCheckCircle className="w-4 h-4" />
                                                    Paid
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Information Banner */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <MdAccountBalance className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-semibold text-blue-900 mb-1">Payout Information</h3>
                        <p className="text-sm text-blue-800">
                            Payouts are automatically created when orders are delivered. Commission is deducted from each sale.
                            Click "Mark as Paid" after transferring funds to the seller's bank account. Sellers will be notified automatically.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPayouts;
