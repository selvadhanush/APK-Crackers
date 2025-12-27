import { FiPackage, FiTruck, FiMapPin, FiClock } from 'react-icons/fi';

const Shipping = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-4xl font-bold text-gray-900">Shipping & Delivery</h1>
                    <p className="text-lg text-gray-600 mt-2">Fast and safe delivery across India</p>
                </div>
            </header>

            {/* Quick Info */}
            <section className="bg-orange-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <FiTruck className="w-10 h-10 mx-auto mb-3" />
                            <div className="text-3xl font-bold mb-1">FREE</div>
                            <p className="text-orange-100">On orders ₹999+</p>
                        </div>
                        <div>
                            <FiClock className="w-10 h-10 mx-auto mb-3" />
                            <div className="text-3xl font-bold mb-1">5-7 Days</div>
                            <p className="text-orange-100">Standard delivery</p>
                        </div>
                        <div>
                            <FiMapPin className="w-10 h-10 mx-auto mb-3" />
                            <div className="text-3xl font-bold mb-1">Pan India</div>
                            <p className="text-orange-100">All locations</p>
                        </div>
                        <div>
                            <FiPackage className="w-10 h-10 mx-auto mb-3" />
                            <div className="text-3xl font-bold mb-1">Safe</div>
                            <p className="text-orange-100">PESO compliant</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Delivery Areas */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Delivery Areas</h2>
                    <p className="text-lg text-gray-600 mb-6">We deliver across India subject to local regulations:</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-gray-900 mb-2">Metro Cities</h3>
                            <p className="text-gray-600">All major cities and metro areas</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-gray-900 mb-2">Tier 2 & 3 Cities</h3>
                            <p className="text-gray-600">Growing cities across India</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-gray-900 mb-2">Rural Areas</h3>
                            <p className="text-gray-600">Areas with courier access</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Delivery Timeline */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Delivery Timeline</h2>
                    <div className="max-w-3xl mx-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Location</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Delivery Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-900 font-medium">Metro Cities</td>
                                    <td className="px-6 py-4 text-gray-600">3-5 business days</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-900 font-medium">Tier 2 Cities</td>
                                    <td className="px-6 py-4 text-gray-600">5-7 business days</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-900 font-medium">Tier 3 & Rural</td>
                                    <td className="px-6 py-4 text-gray-600">7-10 business days</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-900 font-medium">Remote Areas</td>
                                    <td className="px-6 py-4 text-gray-600">10-14 business days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Shipping Charges */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Shipping Charges</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white border border-gray-200 rounded-lg p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Standard Shipping</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-600 font-bold">•</span>
                                    <span>Orders below ₹999: <strong>₹99</strong> shipping charge</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-600 font-bold">•</span>
                                    <span>Orders ₹999 and above: <strong className="text-green-600">FREE</strong> shipping</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Express Shipping</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-600 font-bold">•</span>
                                    <span>Available in select cities</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-600 font-bold">•</span>
                                    <span>Delivery in <strong>2-3 business days</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-600 font-bold">•</span>
                                    <span>Additional charge: <strong>₹199</strong></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Safety & Packaging */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Safety & Packaging</h2>
                    <p className="text-lg text-gray-600 mb-8">All crackers packed per PESO guidelines:</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiPackage className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Double-Layered Boxes</h3>
                            <p className="text-gray-600 text-sm">Corrugated boxes for protection</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiPackage className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Bubble Wrap</h3>
                            <p className="text-gray-600 text-sm">Protective padding inside</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiPackage className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Safety Labels</h3>
                            <p className="text-gray-600 text-sm">Hazardous material labels</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiPackage className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Moisture-Resistant</h3>
                            <p className="text-gray-600 text-sm">Protected from moisture</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Order Tracking */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Order Tracking</h2>
                    <p className="text-lg text-gray-600 mb-8">Once shipped, you'll receive:</p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-gray-900 mb-3">Email Notifications</h3>
                            <p className="text-gray-600">Tracking number sent to your email</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-gray-900 mb-3">SMS Updates</h3>
                            <p className="text-gray-600">Real-time status on your phone</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-gray-900 mb-3">Website Tracking</h3>
                            <p className="text-gray-600">Track on our website anytime</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-bold text-gray-900 mb-3">Delivery Alert</h3>
                            <p className="text-gray-600">Notification before arrival</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Important Notes */}
            <section className="py-16 bg-orange-50 border-y border-orange-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Notes</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <span className="text-orange-600 font-bold text-xl">•</span>
                            <p className="text-gray-700">Delivery times may vary during festive seasons</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-orange-600 font-bold text-xl">•</span>
                            <p className="text-gray-700">Some areas may have delivery restrictions</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-orange-600 font-bold text-xl">•</span>
                            <p className="text-gray-700">Signature required upon delivery</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-orange-600 font-bold text-xl">•</span>
                            <p className="text-gray-700">Orders processed Monday to Saturday</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Help?</h2>
                    <p className="text-lg text-gray-600 mb-8">Contact us for shipping-related queries</p>
                    <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        <div>
                            <p className="font-bold text-gray-900 mb-1">Email</p>
                            <p className="text-gray-600">shipping@apkcrackers.com</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 mb-1">Phone</p>
                            <p className="text-gray-600">+91 98765 43210</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 mb-1">Hours</p>
                            <p className="text-gray-600">Mon-Sat, 9 AM - 6 PM</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Shipping;
