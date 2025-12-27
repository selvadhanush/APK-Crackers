import { useState, useEffect } from 'react';
import { FaBox, FaCheckCircle, FaTruck, FaTimesCircle, FaClock, FaMapMarkerAlt, FaRupeeSign, FaCalendar, FaShoppingBag, FaChevronDown, FaChevronUp, FaCreditCard } from 'react-icons/fa';
import API from '../../api';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await API.get('/orders');
            setOrders(response.data.orders || []);
            setError('');
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const toggleOrderDetails = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const getStatusColor = (status) => {
        const colors = {
            'pending_payment': 'bg-yellow-100 text-yellow-800 border-yellow-300',
            'paid': 'bg-blue-100 text-blue-800 border-blue-300',
            'packed': 'bg-purple-100 text-purple-800 border-purple-300',
            'shipped': 'bg-indigo-100 text-indigo-800 border-indigo-300',
            'delivered': 'bg-green-100 text-green-800 border-green-300',
            'cancelled': 'bg-red-100 text-red-800 border-red-300'
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
    };

    const getStatusIcon = (status) => {
        const icons = {
            'pending_payment': <FaClock className="w-3 h-3 sm:w-4 sm:h-4" />,
            'paid': <FaCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />,
            'packed': <FaBox className="w-3 h-3 sm:w-4 sm:h-4" />,
            'shipped': <FaTruck className="w-3 h-3 sm:w-4 sm:h-4" />,
            'delivered': <FaCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />,
            'cancelled': <FaTimesCircle className="w-3 h-3 sm:w-4 sm:h-4" />
        };
        return icons[status] || <FaClock className="w-3 h-3 sm:w-4 sm:h-4" />;
    };

    const getStatusLabel = (status) => {
        const labels = {
            'pending_payment': 'Pending Payment',
            'paid': 'Paid',
            'packed': 'Packed',
            'shipped': 'Shipped',
            'delivered': 'Delivered',
            'cancelled': 'Cancelled'
        };
        return labels[status] || status;
    };

    const getPaymentMethodLabel = (method) => {
        return method === 'cod' ? 'Cash on Delivery' : 'Online Payment';
    };

    const getPaymentMethodIcon = (method) => {
        return method === 'cod' ? '💵' : '💳';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12 sm:py-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium text-sm sm:text-base">Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-4">
                <FaTimesCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mb-4" />
                <p className="text-gray-600 text-base sm:text-lg mb-4 text-center">{error}</p>
                <button
                    onClick={fetchOrders}
                    className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all shadow-lg text-sm sm:text-base"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-4">
                <FaShoppingBag className="w-16 h-16 sm:w-24 sm:h-24 text-gray-300 mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">No Orders Yet</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base text-center">Start shopping to see your orders here</p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="px-6 sm:px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg text-sm sm:text-base"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-3 sm:space-y-4">
            {orders.map((order) => {
                const isExpanded = expandedOrder === order._id;

                return (
                    <div
                        key={order._id}
                        className="bg-white rounded-xl sm:rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-orange-200 hover:shadow-lg transition-all"
                    >
                        {/* Compact Order Card */}
                        <div className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                {/* Left Side - Order Info */}
                                <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaBox className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                            <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                                                Order #{order._id.slice(-8).toUpperCase()}
                                            </h3>
                                            <div className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border-2 text-xs font-semibold w-fit ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                <span className="whitespace-nowrap">{getStatusLabel(order.status)}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                                            <span className="flex items-center gap-1.5">
                                                <FaCalendar className="w-3 h-3 flex-shrink-0" />
                                                <span className="truncate">{formatDate(order.createdAt)}</span>
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <FaBox className="w-3 h-3 flex-shrink-0" />
                                                {order.items?.length || 0} Items
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <span>{getPaymentMethodIcon(order.paymentMethod)}</span>
                                                <span className="hidden sm:inline">{getPaymentMethodLabel(order.paymentMethod)}</span>
                                                <span className="sm:hidden">{order.paymentMethod.toUpperCase()}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Amount & Button */}
                                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                                    <div className="text-left sm:text-right">
                                        <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">Total Amount</p>
                                        <p className="text-xl sm:text-2xl font-bold text-gray-900">₹{order.totalAmount?.toFixed(2)}</p>
                                    </div>
                                    <button
                                        onClick={() => toggleOrderDetails(order._id)}
                                        className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm whitespace-nowrap"
                                    >
                                        <span className="hidden sm:inline">{isExpanded ? 'Hide Details' : 'View Details'}</span>
                                        <span className="sm:hidden">{isExpanded ? 'Hide' : 'View'}</span>
                                        {isExpanded ? <FaChevronUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <FaChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Expanded Details */}
                        {isExpanded && (
                            <div className="border-t-2 border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                                {/* Payment Information */}
                                <div className="px-4 sm:px-6 pt-4 sm:pt-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                                        <div className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border-2 border-blue-100 shadow-sm">
                                            <FaCreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-xs text-gray-500 font-medium">Payment Method</p>
                                                <p className="text-sm sm:text-base font-bold text-gray-900 truncate">{getPaymentMethodLabel(order.paymentMethod)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border-2 border-green-100 shadow-sm">
                                            <FaRupeeSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-xs text-gray-500 font-medium">Payment Status</p>
                                                <p className="text-sm sm:text-base font-bold text-gray-900 capitalize truncate">{order.paymentStatus}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border-2 border-purple-100 shadow-sm sm:col-span-2 lg:col-span-1">
                                            <FaBox className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-xs text-gray-500 font-medium">Order Status</p>
                                                <p className="text-sm sm:text-base font-bold text-gray-900 truncate">{getStatusLabel(order.status)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                                    <h4 className="text-xs sm:text-sm font-bold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                                        <FaShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                                        Order Items
                                    </h4>
                                    <div className="space-y-2 sm:space-y-3">
                                        {order.items?.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border-2 border-gray-100 hover:border-orange-200 transition-all gap-3"
                                            >
                                                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                        {item.productId?.images?.[0] ? (
                                                            <img
                                                                src={item.productId.images[0]}
                                                                alt={item.productId?.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <FaBox className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h5 className="font-bold text-sm sm:text-base text-gray-900 truncate">
                                                            {item.productId?.name || 'Product'}
                                                        </h5>
                                                        <p className="text-xs sm:text-sm text-gray-500">Qty: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <p className="text-base sm:text-lg font-bold text-gray-900">₹{item.price?.toFixed(2)}</p>
                                                    <p className="text-xs text-gray-500">₹{(item.price / item.quantity)?.toFixed(2)} each</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                                    <h4 className="text-xs sm:text-sm font-bold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                                        <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                                        Shipping Address
                                    </h4>
                                    <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl border-2 border-blue-200">
                                        <p className="text-xs sm:text-sm text-gray-800 font-medium break-words">{order.shippingAddress}</p>
                                    </div>
                                </div>

                                {/* Order Timeline */}
                                {order.status !== 'cancelled' && (
                                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                                        <h4 className="text-xs sm:text-sm font-bold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                                            <FaTruck className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                                            Order Timeline
                                        </h4>
                                        <div className="bg-white rounded-lg sm:rounded-xl border-2 border-gray-100 p-4 sm:p-6">
                                            <div className="relative">
                                                <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                                                {['paid', 'packed', 'shipped', 'delivered'].map((status, index) => {
                                                    const isCompleted = ['paid', 'packed', 'shipped', 'delivered'].indexOf(order.status) >= index;
                                                    const isCurrent = order.status === status;
                                                    return (
                                                        <div key={status} className="relative flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 last:mb-0">
                                                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all flex-shrink-0 ${isCompleted
                                                                    ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/30'
                                                                    : 'bg-white border-gray-300'
                                                                }`}>
                                                                {isCompleted && <FaCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                                                            </div>
                                                            <div className={`flex-1 ${isCurrent ? 'font-bold' : ''}`}>
                                                                <p className={`text-xs sm:text-sm ${isCompleted ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                                                                    {getStatusLabel(status)}
                                                                </p>
                                                                {isCurrent && (
                                                                    <p className="text-xs text-orange-600 font-medium mt-1">Current Status</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default OrdersPage;
