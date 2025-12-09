import React from 'react';
import { MdEmail, MdPhone, MdLocationOn, MdCreditCard, MdPrint, MdLocalShipping } from 'react-icons/md';
import { FaCheckCircle, FaClock } from 'react-icons/fa';

const SellerOrderview = ({ orderId = '#FC-2023001' }) => {
    const orderData = {
        id: '#FC-2023001',
        status: 'Shipped',
        orderDate: '2023-10-26 14:30',
        orderTotal: '$125.99',
        paymentMethod: 'Credit Card (****1234)',
        buyer: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '(555) 123-4567',
            address: '123 Main St, Anytown, CA 90210, USA'
        },
        items: [
            {
                name: 'Sparkler Pack (10x)',
                qty: 2,
                price: '$15.00',
                image: '✨'
            },
            {
                name: 'Assorted Firecracker Box',
                qty: 1,
                price: '$85.99',
                image: '🎆'
            }
        ],
        pricing: {
            subtotal: '$115.99',
            shipping: '$10.00',
            tax: '$0.00',
            total: '$125.99'
        },
        shipping: {
            carrier: 'UPS',
            trackingNumber: '1Z9999999999999999'
        },
        timeline: [
            { status: 'Order Placed', date: '2023-10-26 14:30', completed: true, color: 'orange' },
            { status: 'Payment Confirmed', date: '2023-10-26 14:35', completed: true, color: 'orange' },
            { status: 'Order Shipped', date: '2023-10-27 09:00', completed: true, color: 'blue' },
            { status: 'Delivered', date: '', completed: false, color: 'gray' }
        ]
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Orders › {orderData.id}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm">
                        {orderData.status}
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
                                <p className="font-semibold text-gray-900">{orderData.id}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Order Date:</p>
                                <p className="font-semibold text-gray-900">{orderData.orderDate}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Order Total:</p>
                                <p className="font-semibold text-gray-900">{orderData.orderTotal}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Payment Method:</p>
                                <div className="flex items-center gap-2">
                                    <MdCreditCard className="text-gray-600" />
                                    <p className="font-semibold text-gray-900 text-xs">{orderData.paymentMethod}</p>
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
                                <p className="font-semibold text-gray-900">{orderData.buyer.name}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-gray-500 mb-1">
                                    <MdEmail className="w-4 h-4" />
                                    <p>Email:</p>
                                </div>
                                <p className="font-semibold text-orange-600">{orderData.buyer.email}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-gray-500 mb-1">
                                    <MdPhone className="w-4 h-4" />
                                    <p>Phone:</p>
                                </div>
                                <p className="font-semibold text-gray-900">{orderData.buyer.phone}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-gray-500 mb-1">
                                    <MdLocationOn className="w-4 h-4" />
                                    <p>Address:</p>
                                </div>
                                <p className="font-semibold text-gray-900">{orderData.buyer.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Items List</h2>

                        <div className="space-y-4">
                            {orderData.items.map((item, index) => (
                                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                            {item.image}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-gray-900">{item.price}</p>
                                </div>
                            ))}
                        </div>

                        {/* Pricing Summary */}
                        <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="font-semibold text-gray-900">{orderData.pricing.subtotal}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping:</span>
                                <span className="font-semibold text-gray-900">{orderData.pricing.shipping}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tax:</span>
                                <span className="font-semibold text-gray-900">{orderData.pricing.tax}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                                <span className="text-gray-900">Total:</span>
                                <span className="text-gray-900">{orderData.pricing.total}</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping & Tracking */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping & Tracking</h2>

                        <div className="space-y-3 text-sm mb-4">
                            <div>
                                <p className="text-gray-500 mb-1">Carrier:</p>
                                <p className="font-semibold text-gray-900">{orderData.shipping.carrier}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Tracking Number:</p>
                                <p className="font-semibold text-gray-900">{orderData.shipping.trackingNumber}</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2">
                                <MdLocalShipping className="w-5 h-5" />
                                Update Tracking
                            </button>
                            <button className="px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all">
                                Track Package
                            </button>
                        </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Order Timeline</h2>

                        <div className="space-y-4">
                            {orderData.timeline.map((event, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${event.completed
                                            ? event.color === 'orange'
                                                ? 'bg-orange-100'
                                                : event.color === 'blue'
                                                    ? 'bg-blue-100'
                                                    : 'bg-gray-100'
                                            : 'bg-gray-100'
                                        }`}>
                                        {event.completed ? (
                                            <FaCheckCircle className={`w-5 h-5 ${event.color === 'orange'
                                                    ? 'text-orange-600'
                                                    : event.color === 'blue'
                                                        ? 'text-blue-600'
                                                        : 'text-gray-400'
                                                }`} />
                                        ) : (
                                            <FaClock className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-semibold ${event.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                                            {event.status}
                                        </p>
                                        {event.date && (
                                            <p className="text-sm text-gray-500">{event.date}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
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
                                Refund
                            </button>
                        </div>
                    </div>

                    {/* Order Totals - Sticky */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Order Totals</h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="font-semibold text-gray-900">{orderData.pricing.subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping:</span>
                                <span className="font-semibold text-gray-900">{orderData.pricing.shipping}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax:</span>
                                <span className="font-semibold text-gray-900">{orderData.pricing.tax}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                                <span className="text-gray-900">Total:</span>
                                <span className="text-gray-900">{orderData.pricing.total}</span>
                            </div>
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
