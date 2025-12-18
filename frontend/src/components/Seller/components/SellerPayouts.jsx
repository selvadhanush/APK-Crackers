import React, { useState, useEffect } from 'react';
import {
    MdAttachMoney,
    MdCheckCircle,
    MdPending,
    MdAccountBalance,
    MdTrendingUp,
    MdCalendarToday,
    MdReceipt,
    MdRefresh
} from 'react-icons/md';
import { FaFire, FaRupeeSign } from 'react-icons/fa';
import API from '../../../../api';

const SellerPayouts = () => {
    const [loading, setLoading] = useState(true);
    const [payouts, setPayouts] = useState([]);
    const [stats, setStats] = useState({
        totalEarnings: 0,
        pendingAmount: 0,
        paidAmount: 0,
        totalPayouts: 0,
        codEarnings: 0,
        onlineEarnings: 0
    });

    useEffect(() => {
        fetchPayouts();
    }, []);

    const fetchPayouts = async () => {
        try {
            setLoading(true);
            const response = await API.get('/seller/payouts/seller');
            setPayouts(response.data);
            calculateStats(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching payouts:', error);
            setLoading(false);
        }
    };

    const calculateStats = (payoutData) => {
        const totalEarnings = payoutData.reduce((sum, p) => sum + p.netAmount, 0);
        const pendingAmount = payoutData
            .filter(p => p.status === 'pending' || p.status === 'processing')
            .reduce((sum, p) => sum + p.netAmount, 0);
        const paidAmount = payoutData
            .filter(p => p.status === 'paid')
            .reduce((sum, p) => sum + p.netAmount, 0);
        const codEarnings = payoutData
            .filter(p => p.orderId?.paymentMethod === 'cod')
            .reduce((sum, p) => sum + p.netAmount, 0);
        const onlineEarnings = payoutData
            .filter(p => p.orderId?.paymentMethod === 'online')
            .reduce((sum, p) => sum + p.netAmount, 0);

        setStats({
            totalEarnings,
            pendingAmount,
            paidAmount,
            totalPayouts: payoutData.length,
            codEarnings,
            onlineEarnings
        });
    };

    const getStatusColor = (status) => {
        const statusColors = {
            'paid': 'text-green-600 bg-green-100',
            'processing': 'text-blue-600 bg-blue-100',
            'pending': 'text-yellow-600 bg-yellow-100'
        };
        return statusColors[status] || 'text-gray-600 bg-gray-100';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'paid':
                return MdCheckCircle;
            case 'processing':
            case 'pending':
                return MdPending;
            default:
                return MdReceipt;
        }
    };

    const statCards = [
        {
            title: 'Total Earnings',
            value: `₹${stats.totalEarnings.toLocaleString('en-IN')}`,
            icon: MdAttachMoney,
            bgColor: 'bg-green-100',
            iconColor: 'text-green-600',
            description: 'Lifetime earnings'
        },
        {
            title: 'COD Earnings',
            value: `₹${stats.codEarnings.toLocaleString('en-IN')}`,
            icon: FaRupeeSign,
            bgColor: 'bg-emerald-100',
            iconColor: 'text-emerald-600',
            description: 'Cash on Delivery'
        },
        {
            title: 'Pending Payouts',
            value: `₹${stats.pendingAmount.toLocaleString('en-IN')}`,
            icon: MdPending,
            bgColor: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            description: 'Awaiting settlement'
        },
        {
            title: 'Paid Amount',
            value: `₹${stats.paidAmount.toLocaleString('en-IN')}`,
            icon: MdCheckCircle,
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600',
            description: 'Successfully transferred'
        },
        {
            title: 'Total Payouts',
            value: stats.totalPayouts,
            icon: MdReceipt,
            bgColor: 'bg-purple-100',
            iconColor: 'text-purple-600',
            description: 'All transactions'
        }
    ];

    return (
        <div>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold text-gray-900">Payouts</h1>
                                <FaFire className="text-orange-500 text-xl" />
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                Track your earnings and payout history
                            </p>
                        </div>
                        <button
                            onClick={fetchPayouts}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                            <MdRefresh className="w-5 h-5" />
                            Refresh
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 bg-gray-50 min-h-screen">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                    {statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                                        <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900 mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-xs text-gray-400">{stat.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Payout Information Banner */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6 mb-8">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <MdAccountBalance className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Payout Information</h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Payouts are processed on a <strong>T+7 basis</strong> (7 days after order delivery).
                                This applies to both <strong>online payments</strong> and <strong>Cash on Delivery (COD)</strong> orders.
                                Platform commission is automatically deducted. Funds are transferred directly to your registered bank account.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Payouts Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">Payout History</h2>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500 mx-auto"></div>
                            <p className="text-gray-500 mt-4">Loading payouts...</p>
                        </div>
                    ) : payouts.length === 0 ? (
                        <div className="p-12 text-center">
                            <MdReceipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg font-medium mb-2">No payouts yet</p>
                            <p className="text-gray-400 text-sm">
                                Payouts will appear here once your orders are delivered
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Payment Method</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Commission</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Net Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Settlement Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {payouts.map((payout) => {
                                        const StatusIcon = getStatusIcon(payout.status);
                                        return (
                                            <tr key={payout._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    #{payout.orderId?._id?.slice(-6) || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {new Date(payout.createdAt).toLocaleDateString('en-IN', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${payout.orderId?.paymentMethod === 'cod'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {payout.orderId?.paymentMethod === 'cod' ? '💵 COD' : '💳 Online'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                    ₹{payout.totalAmount.toLocaleString('en-IN')}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-red-600 font-medium">
                                                    - ₹{payout.commission.toLocaleString('en-IN')}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-green-600">
                                                    ₹{payout.netAmount.toLocaleString('en-IN')}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <StatusIcon className={`w-4 h-4 ${getStatusColor(payout.status).split(' ')[0]}`} />
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(payout.status)}`}>
                                                            {payout.status}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {payout.settlementDate
                                                        ? new Date(payout.settlementDate).toLocaleDateString('en-IN', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })
                                                        : 'Pending'
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Help Section */}
                <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <MdCalendarToday className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Settlement Timeline</p>
                                <p className="text-xs text-gray-600 mt-1">
                                    Payouts are processed 7 days after successful delivery
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <MdTrendingUp className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Commission Structure</p>
                                <p className="text-xs text-gray-600 mt-1">
                                    Platform commission is deducted from each sale
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerPayouts;
