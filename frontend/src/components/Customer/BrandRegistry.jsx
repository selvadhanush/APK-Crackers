import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaCheckCircle,
    FaShieldAlt,
    FaStar,
    FaChartLine,
    FaLock,
    FaQuestionCircle,
    FaEdit,
    FaTag,
    FaBullhorn,
    FaFlask,
    FaFileAlt,
    FaCertificate,
    FaAward,
    FaChevronDown,
    FaChevronUp
} from 'react-icons/fa';

const BrandRegistry = () => {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);

    const brandLogos = [
        'Standard', 'Coronation', 'Cock Brand', 'Sony', 'Ayyan', 'Peacock', 'Celebration', 'Shakthi'
    ];

    const faqs = [
        {
            question: "What are the requirements for enrolling a crackers brand?",
            answer: "You need your brand name or logo on products/packaging, all safety certifications (BIS, PESO approval), and a pending or registered trademark from the government trademark office."
        },
        {
            question: "Do I need multiple accounts for different states?",
            answer: "No, you can manage multiple states from one account. Just add your licenses and certifications for each state."
        },
        {
            question: "Can I enroll more than one crackers brand?",
            answer: "Yes, you can enroll multiple brands. Each brand needs to meet the requirements and safety certifications separately."
        },
        {
            question: "Why am I receiving an error message during enrollment?",
            answer: "Common reasons: incomplete safety certification, brand name mismatch, missing PESO license, or pending verification. Check all required safety documents are uploaded."
        },
        {
            question: "How do I view or edit my application?",
            answer: "Log in to your Brand Registry account and go to 'My Brands' to view, edit applications, upload certificates, and manage listings."
        },
        {
            question: "Can I give others access to the portal?",
            answer: "Yes, you can add team members in account settings with different permission levels based on their roles."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900">
                                APK<span className="text-orange-600">Crackers</span>
                                <span className="text-sm text-gray-500 ml-2 font-normal">Brand Registry</span>
                            </h1>
                        </div>
                        <button
                            onClick={() => navigate('/seller-register')}
                            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                        >
                            Register Your Brand
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-white py-16 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Protect and Grow Your Crackers Brand
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Join APK Crackers Brand Registry to protect your intellectual property, ensure product safety, and reach millions of customers during festive seasons.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate('/seller-register')}
                                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                            >
                                Enroll Your Brand
                            </button>
                            <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-8 py-3 rounded-lg transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-orange-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-2">99%</div>
                            <p className="text-orange-100">Counterfeit products blocked</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">15,000+</div>
                            <p className="text-orange-100">Trusted crackers brands</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">500M+</div>
                            <p className="text-orange-100">Safe crackers units sold</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Register Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                        Why Register Your Crackers Brand?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                <FaShieldAlt className="w-6 h-6 text-orange-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Protect Your Brand</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Detect and report counterfeit crackers and safety violations. Our system blocks dangerous fake products before they reach customers.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                <FaStar className="w-6 h-6 text-orange-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Build Customer Trust</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Create detailed product pages with safety certifications, reviews, and quality information to help customers make informed choices.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                <FaChartLine className="w-6 h-6 text-orange-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Track Performance</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Get insights into customer preferences, seasonal trends, and regional demand to plan inventory and grow sales.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted Brands */}
            <section className="py-12 bg-gray-50 border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                        Trusted by Leading Crackers Brands
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                        {brandLogos.map((brand, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                                <span className="text-sm font-semibold text-gray-700">{brand}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Requirements Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                        Enrollment Requirements
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white border-2 border-orange-200 rounded-lg p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <FaCertificate className="w-8 h-8 text-orange-600" />
                                <h4 className="text-2xl font-bold text-gray-900">Basic Requirements</h4>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <FaCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Brand Identity</p>
                                        <p className="text-gray-600 text-sm">Brand name or logo on all products and packaging</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <FaCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Trademark</p>
                                        <p className="text-gray-600 text-sm">Pending or registered trademark from government office</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <FaCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-900">PESO License</p>
                                        <p className="text-gray-600 text-sm">Valid license for manufacturing/selling crackers</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <FaCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Safety Certifications</p>
                                        <p className="text-gray-600 text-sm">BIS certification and safety compliance</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/seller-register')}
                                className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                            >
                                Start Registration
                            </button>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <FaFileAlt className="w-8 h-8 text-gray-700" />
                                <h4 className="text-2xl font-bold text-gray-900">Need Help?</h4>
                            </div>

                            <p className="text-gray-600 mb-6">
                                Don't have all required certifications? Our assistance program connects you with experts who can help with:
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <FaCheckCircle className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-700">Trademark registration</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaCheckCircle className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-700">PESO license application</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaCheckCircle className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-700">BIS certification</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaCheckCircle className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-700">Safety compliance documents</span>
                                </div>
                            </div>

                            <button className="w-full mt-6 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-colors">
                                Get Assistance
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand Tools Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                        Tools to Build Your Brand
                    </h3>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        Access powerful tools to showcase products, reach customers, and grow sales
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <FaEdit className="w-8 h-8 text-orange-600 mb-4" />
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Enhanced Listings</h4>
                            <p className="text-gray-600 text-sm mb-4">
                                Add detailed images, videos, safety info, and specifications to product pages
                            </p>
                            <p className="text-xs text-gray-500 italic">
                                Can increase sales by up to 35% during festive seasons
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <FaShieldAlt className="w-8 h-8 text-orange-600 mb-4" />
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Brand Store</h4>
                            <p className="text-gray-600 text-sm mb-4">
                                Create a dedicated store to showcase your complete crackers range
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <FaBullhorn className="w-8 h-8 text-orange-600 mb-4" />
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Festive Campaigns</h4>
                            <p className="text-gray-600 text-sm mb-4">
                                Run targeted ads for Diwali, New Year, and other celebrations
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <FaChartLine className="w-8 h-8 text-orange-600 mb-4" />
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Sales Analytics</h4>
                            <p className="text-gray-600 text-sm mb-4">
                                Track customer preferences, seasonal trends, and regional demand
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <FaStar className="w-8 h-8 text-orange-600 mb-4" />
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Customer Reviews</h4>
                            <p className="text-gray-600 text-sm mb-4">
                                Collect reviews and safety ratings to build customer trust
                            </p>
                            <p className="text-xs text-gray-500 italic">
                                Reviews can increase sales by 4x during Diwali
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <FaTag className="w-8 h-8 text-orange-600 mb-4" />
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Special Offers</h4>
                            <p className="text-gray-600 text-sm mb-4">
                                Create combo packs, bulk discounts, and loyalty rewards
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Protection Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                        Brand Protection Features
                    </h3>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        Advanced tools to protect your brand and ensure customer safety
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaFileAlt className="w-8 h-8 text-orange-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Report Counterfeits</h4>
                            <p className="text-gray-600 text-sm mb-4">
                                Identify and report fake products and safety violations quickly
                            </p>
                            <p className="text-xs text-gray-500">
                                99% of counterfeits blocked automatically
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaLock className="w-8 h-8 text-orange-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Safety Verification</h4>
                            <p className="text-gray-600 text-sm mb-4">
                                Flag unsafe products and protect customers from dangerous items
                            </p>
                            <p className="text-xs text-gray-500">
                                15,000+ brands enrolled
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaCertificate className="w-8 h-8 text-orange-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Authenticity Codes</h4>
                            <p className="text-gray-600 text-sm mb-4">
                                Use QR codes to verify genuine products and track batches
                            </p>
                            <p className="text-xs text-gray-500">
                                500M+ units protected
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Frequently Asked Questions
                    </h3>

                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                                    {openFaq === index ? (
                                        <FaChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                    ) : (
                                        <FaChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                    )}
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-orange-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">
                        Ready to Register Your Brand?
                    </h3>
                    <p className="text-xl text-orange-100 mb-8">
                        Join thousands of trusted crackers brands. Start your registration today.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={() => navigate('/seller-register')}
                            className="bg-white hover:bg-gray-100 text-orange-600 font-semibold px-8 py-3 rounded-lg transition-colors"
                        >
                            Enroll Your Brand
                        </button>
                        <button className="border-2 border-white hover:bg-white hover:text-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                            Contact Support
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-400">
                        © 2024 APK Crackers Brand Registry. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default BrandRegistry;
