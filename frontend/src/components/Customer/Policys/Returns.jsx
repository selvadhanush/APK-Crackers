import { FiRotateCcw, FiDollarSign, FiClock, FiCheckCircle } from 'react-icons/fi';

const Returns = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-4xl font-bold text-gray-900">Returns & Refunds</h1>
                    <p className="text-lg text-gray-600 mt-2">Your satisfaction is our priority</p>
                </div>
            </header>

            {/* Quick Info */}
            <section className="bg-orange-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <FiClock className="w-10 h-10 mx-auto mb-3" />
                            <div className="text-3xl font-bold mb-1">48 Hours</div>
                            <p className="text-orange-100">Return window</p>
                        </div>
                        <div>
                            <FiDollarSign className="w-10 h-10 mx-auto mb-3" />
                            <div className="text-3xl font-bold mb-1">Full Refund</div>
                            <p className="text-orange-100">For eligible items</p>
                        </div>
                        <div>
                            <FiRotateCcw className="w-10 h-10 mx-auto mb-3" />
                            <div className="text-3xl font-bold mb-1">Easy Process</div>
                            <p className="text-orange-100">Simple steps</p>
                        </div>
                        <div>
                            <FiCheckCircle className="w-10 h-10 mx-auto mb-3" />
                            <div className="text-3xl font-bold mb-1">Verified</div>
                            <p className="text-orange-100">Quality checked</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Safety Warning */}
            <section className="py-12 bg-red-50 border-y border-red-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Important: Safety First</h2>
                        <p className="text-lg text-gray-700">
                            Due to safety regulations, returns are only accepted for damaged, defective, or wrong items.
                            Opened or used crackers cannot be returned for safety and legal reasons.
                        </p>
                    </div>
                </div>
            </section>

            {/* Eligible for Return */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Eligible for Return</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiCheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Damaged Products</h3>
                            <p className="text-gray-600 text-sm">Items damaged during shipping</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiCheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Defective Items</h3>
                            <p className="text-gray-600 text-sm">Manufacturing defects</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiCheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Wrong Items</h3>
                            <p className="text-gray-600 text-sm">Different products received</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiCheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Missing Items</h3>
                            <p className="text-gray-600 text-sm">Incomplete orders</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Return Process */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Return Process</h2>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                        <div className="bg-white border border-gray-200 rounded-lg p-8">
                            <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">1</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Report Issue</h3>
                            <p className="text-gray-600">Contact support within 48 hours with photos/videos of damaged items</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-8">
                            <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">2</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Verification</h3>
                            <p className="text-gray-600">Our team reviews your photos and verifies the issue</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-8">
                            <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">3</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Approval & Pickup</h3>
                            <p className="text-gray-600">Once approved, we arrange pickup from your address</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-8">
                            <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">4</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Refund Processing</h3>
                            <p className="text-gray-600">Refund processed within 5-7 business days after inspection</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Refund Timeline */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Refund Timeline</h2>
                    <div className="max-w-3xl mx-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Payment Method</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Refund Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-900 font-medium">Credit/Debit Card</td>
                                    <td className="px-6 py-4 text-gray-600">5-7 business days</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-900 font-medium">Net Banking</td>
                                    <td className="px-6 py-4 text-gray-600">5-7 business days</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-900 font-medium">UPI</td>
                                    <td className="px-6 py-4 text-gray-600">3-5 business days</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-900 font-medium">Wallet</td>
                                    <td className="px-6 py-4 text-gray-600">2-3 business days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Replacement Options */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Replacement Options</h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiRotateCcw className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Replacement</h3>
                            <p className="text-gray-600">Same product (subject to availability)</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiDollarSign className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Refund</h3>
                            <p className="text-gray-600">Full refund to original payment method</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiCheckCircle className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Store Credit</h3>
                            <p className="text-gray-600">Credit for future purchases</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tips */}
            <section className="py-16 bg-orange-50 border-y border-orange-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tips for Smooth Returns</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                        <div className="flex items-start gap-3">
                            <span className="text-orange-600 font-bold text-xl">•</span>
                            <p className="text-gray-700">Inspect order immediately upon delivery</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-orange-600 font-bold text-xl">•</span>
                            <p className="text-gray-700">Take unboxing video for high-value orders</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-orange-600 font-bold text-xl">•</span>
                            <p className="text-gray-700">Report issues within 48 hours</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-orange-600 font-bold text-xl">•</span>
                            <p className="text-gray-700">Keep original packaging intact</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-orange-600 font-bold text-xl">•</span>
                            <p className="text-gray-700">Provide clear photos of the issue</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-orange-600 font-bold text-xl">•</span>
                            <p className="text-gray-700">Keep all safety seals intact</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Help with Returns?</h2>
                    <p className="text-lg text-gray-600 mb-8">Contact our returns team</p>
                    <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        <div>
                            <p className="font-bold text-gray-900 mb-1">Email</p>
                            <p className="text-gray-600">returns@apkcrackers.com</p>
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

export default Returns;
