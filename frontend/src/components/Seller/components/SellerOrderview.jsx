import React, { useState, useEffect } from 'react';
import { MdEmail, MdPhone, MdLocationOn, MdCreditCard, MdPrint, MdLocalShipping } from 'react-icons/md';
import { FaCheckCircle, FaClock } from 'react-icons/fa';
import API from '../../../../api';

const SellerOrderview = ({ orderId }) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails();
        } else {
            console.error('❌ No orderId provided to SellerOrderview');
            setError('No order ID provided');
            setLoading(false);
        }
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            console.log('🔍 Fetching order details for orderId:', orderId);
            setLoading(true);
            const response = await API.get(`/seller/orders/${orderId}`);
            console.log('✅ Order data received:', response.data);
            setOrder(response.data);
            setError('');
        } catch (error) {
            console.error('❌ Error fetching order:', error);
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);
            setError(error.response?.data?.message || 'Failed to load order details');
        } finally {
            console.log('🏁 Setting loading to false');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">{error || 'Order not found'}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Orders › {order._id}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-orange-100 text-orange-700'
                        } rounded-lg font-semibold text-sm`}>
                        {order.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Order Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500 mb-1">Order ID:</p>
                                <p className="font-semibold text-gray-900 text-xs md:text-sm">{order._id}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Order Date:</p>
                                <p className="font-semibold text-gray-900">{formatDate(order.createdAt)}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Order Total:</p>
                                <p className="font-semibold text-gray-900">₹{order.totalAmount?.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Payment Method:</p>
                                <div className="flex items-center gap-2">
                                    <MdCreditCard className="text-gray-600" />
                                    <p className="font-semibold text-gray-900 text-xs">{order.paymentMethod || 'Online Payment'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buyer Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Buyer Information</h2>

                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-gray-500 mb-1">Name:</p>
                                <p className="font-semibold text-gray-900">{order.customerId?.name || 'Guest'}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-gray-500 mb-1">
                                    <MdEmail className="w-4 h-4" />
                                    <p>Email:</p>
                                </div>
                                <p className="font-semibold text-orange-600">{order.customerId?.email || 'N/A'}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-gray-500 mb-1">
                                    <MdPhone className="w-4 h-4" />
                                    <p>Phone:</p>
                                </div>
                                <p className="font-semibold text-gray-900">{order.customerId?.phone || 'N/A'}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-gray-500 mb-1">
                                    <MdLocationOn className="w-4 h-4" />
                                    <p>Address:</p>
                                </div>
                                <p className="font-semibold text-gray-900">{order.shippingAddress || 'No address provided'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Items List</h2>

                        <div className="space-y-4">
                            {order.items?.map((item, index) => (
                                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl overflow-hidden">
                                            {item.productId?.images?.[0] ? (
                                                <img src={item.productId.images[0]} alt={item.productId.name} className="w-full h-full object-cover" />
                                            ) : (
                                                '✨'
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{item.productId?.name || 'Product Name'}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-gray-900">₹{(item.price || 0).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        {/* Pricing Summary */}
                        <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="font-semibold text-gray-900">₹{order.totalAmount?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping:</span>
                                <span className="font-semibold text-gray-900">₹0.00</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                                <span className="text-gray-900">Total:</span>
                                <span className="text-gray-900">₹{order.totalAmount?.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline (Simplified for now based strictly on status) */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Order Status</h2>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                <FaClock />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Current Status: {order.status}</p>
                                <p className="text-sm text-gray-500">Last updated: {formatDate(order.updatedAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Actions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Actions</h2>

                        <div className="space-y-3">
                            <button className="w-full px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                <MdPrint className="w-5 h-5" />
                                Print Label
                            </button>
                            <button className="w-full px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                <MdLocalShipping className="w-5 h-5" />
                                Update Status
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">© 2025 Firecracker Seller. All rights reserved.</p>
            </div>
        </div>
    );
};

export default SellerOrderview;
