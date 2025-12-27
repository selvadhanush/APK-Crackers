import { useState } from 'react';
import { FiPackage, FiTruck, FiMapPin, FiCheckCircle, FiClock, FiSearch } from 'react-icons/fi';

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);

    const handleTrack = (e) => {
        e.preventDefault();
        setTrackingResult({
            orderId: orderId,
            status: 'In Transit',
            estimatedDelivery: '25 Dec 2024',
            timeline: [
                { status: 'Order Placed', date: '20 Dec 2024, 10:30 AM', completed: true },
                { status: 'Order Confirmed', date: '20 Dec 2024, 11:00 AM', completed: true },
                { status: 'Packed', date: '21 Dec 2024, 02:15 PM', completed: true },
                { status: 'Shipped', date: '22 Dec 2024, 09:00 AM', completed: true },
                { status: 'In Transit', date: '23 Dec 2024, 06:30 PM', completed: true },
                { status: 'Out for Delivery', date: 'Pending', completed: false },
                { status: 'Delivered', date: 'Pending', completed: false }
            ]
        });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-4xl font-bold text-gray-900">Track Your Order</h1>
                    <p className="text-lg text-gray-600 mt-2">Get real-time updates on your delivery</p>
                </div>
            </header>

            {/* Tracking Form Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white border border-gray-200 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Order Details</h2>
                        <form onSubmit={handleTrack}>
                            <label className="block text-sm font-bold text-gray-900 mb-3">
                                Order ID / Tracking Number
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    placeholder="Enter your order ID (e.g., ORD123456)"
                                    required
                                    className="flex-1 px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 text-lg"
                                />
                                <button
                                    type="submit"
                                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-10 py-4 rounded-lg flex items-center gap-2"
                                >
                                    <FiSearch className="w-5 h-5" />
                                    Track
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-3">
                                Find your order ID in confirmation email or account orders section
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* Tracking Result */}
            {trackingResult && (
                <>
                    {/* Order Summary */}
                    <section className="py-16 bg-white">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="bg-white border border-gray-200 rounded-lg p-8">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900">Order #{trackingResult.orderId}</h2>
                                        <p className="text-lg text-gray-600 mt-2">
                                            Status: <span className="font-semibold text-orange-600">{trackingResult.status}</span>
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Estimated Delivery</p>
                                        <p className="text-2xl font-bold text-gray-900">{trackingResult.estimatedDelivery}</p>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="space-y-6">
                                    {trackingResult.timeline.map((item, index) => (
                                        <div key={index} className="flex gap-6">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.completed ? 'bg-green-100' : 'bg-gray-100'
                                                    }`}>
                                                    {item.completed ? (
                                                        <FiCheckCircle className="w-6 h-6 text-green-600" />
                                                    ) : (
                                                        <FiClock className="w-6 h-6 text-gray-400" />
                                                    )}
                                                </div>
                                                {index < trackingResult.timeline.length - 1 && (
                                                    <div className={`w-1 h-16 ${item.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                                                )}
                                            </div>
                                            <div className="flex-1 pb-6">
                                                <h3 className={`text-lg font-bold mb-1 ${item.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                                                    {item.status}
                                                </h3>
                                                <p className={`${item.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                                                    {item.date}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Delivery Info */}
                    <section className="py-16 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Delivery Information</h2>
                            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                <div className="bg-white border border-gray-200 rounded-lg p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                            <FiMapPin className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Delivery Address</h3>
                                    </div>
                                    <p className="text-gray-600">
                                        123, Main Street<br />
                                        Sivakasi, Tamil Nadu<br />
                                        India - 626123
                                    </p>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                            <FiTruck className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Courier Partner</h3>
                                    </div>
                                    <p className="text-gray-600">
                                        <strong>Partner:</strong> Express Logistics<br />
                                        <strong>Tracking ID:</strong> EXP987654321
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {/* FAQs */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tracking FAQs</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-gray-900 mb-3">When will I receive my tracking number?</h3>
                            <p className="text-gray-600 text-sm">
                                You'll receive it via email and SMS within 24 hours of order confirmation.
                            </p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-gray-900 mb-3">My tracking shows no updates</h3>
                            <p className="text-gray-600 text-sm">
                                Tracking may take 24-48 hours to update. Contact support if no updates after 48 hours.
                            </p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-gray-900 mb-3">Can I change my delivery address?</h3>
                            <p className="text-gray-600 text-sm">
                                Address changes possible only before shipping. Contact support immediately if needed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Help Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Help?</h2>
                    <p className="text-lg text-gray-600 mb-8">Questions about your order or delivery? Contact our support team.</p>
                    <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <p className="font-bold text-gray-900 mb-2">Email Support</p>
                            <p className="text-gray-600">support@apkcrackers.com</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <p className="font-bold text-gray-900 mb-2">Phone Support</p>
                            <p className="text-gray-600">+91 98765 43210</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TrackOrder;
