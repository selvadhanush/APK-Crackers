import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';

const FAQs = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Questions' },
        { id: 'orders', name: 'Orders & Payment' },
        { id: 'shipping', name: 'Shipping & Delivery' },
        { id: 'returns', name: 'Returns & Refunds' },
        { id: 'products', name: 'Products & Safety' },
        { id: 'account', name: 'Account & Support' }
    ];

    const faqs = [
        {
            category: 'orders',
            question: 'How do I place an order?',
            answer: 'Browse our products, add items to cart, proceed to checkout, enter delivery details, and complete payment. You\'ll receive an order confirmation email immediately.'
        },
        {
            category: 'orders',
            question: 'What payment methods do you accept?',
            answer: 'We accept Credit/Debit Cards, Net Banking, UPI, and popular digital wallets. All payments are processed securely through encrypted gateways.'
        },
        {
            category: 'orders',
            question: 'Can I cancel my order?',
            answer: 'Yes, you can cancel your order before it is shipped. Go to My Orders, select the order, and click Cancel. Refund will be processed within 5-7 business days.'
        },
        {
            category: 'orders',
            question: 'Do you provide invoices?',
            answer: 'Yes, a tax invoice is included with every order. You can also download it from your account\'s order history section.'
        },
        {
            category: 'shipping',
            question: 'What are the delivery charges?',
            answer: 'Shipping is FREE on orders above ₹999. For orders below ₹999, a shipping charge of ₹99 applies. Express shipping is available in select cities for ₹199.'
        },
        {
            category: 'shipping',
            question: 'How long does delivery take?',
            answer: 'Metro cities: 3-5 business days, Tier 2 cities: 5-7 business days, Tier 3 & Rural: 7-10 business days. Delivery times may vary during festive seasons.'
        },
        {
            category: 'shipping',
            question: 'Do you deliver to my area?',
            answer: 'We deliver across India, subject to local regulations. Enter your pincode at checkout to check delivery availability in your area.'
        },
        {
            category: 'shipping',
            question: 'How can I track my order?',
            answer: 'You\'ll receive a tracking number via email and SMS once your order is shipped. Use it on our Track Order page or the courier partner\'s website for real-time updates.'
        },
        {
            category: 'returns',
            question: 'What is your return policy?',
            answer: 'Returns are accepted within 48 hours for damaged, defective, or wrong items. Due to safety regulations, opened or used crackers cannot be returned.'
        },
        {
            category: 'returns',
            question: 'How do I return a product?',
            answer: 'Contact our support team within 48 hours with photos/videos of the issue. Once approved, we\'ll arrange pickup and process your refund within 5-7 business days.'
        },
        {
            category: 'returns',
            question: 'When will I receive my refund?',
            answer: 'Refunds are processed within 5-7 business days after we receive and inspect the returned item. The amount will be credited to your original payment method.'
        },
        {
            category: 'returns',
            question: 'Can I exchange a product?',
            answer: 'Yes, you can request a replacement for damaged or defective items. We\'ll send a replacement of the same product subject to availability.'
        },
        {
            category: 'products',
            question: 'Are your crackers safe and certified?',
            answer: 'Yes, all our products are BIS certified and PESO approved. We only sell crackers that meet all safety standards and regulations.'
        },
        {
            category: 'products',
            question: 'How should I store crackers?',
            answer: 'Store in a cool, dry place away from heat, moisture, and direct sunlight. Keep away from children and flammable materials. Follow all safety instructions on the package.'
        },
        {
            category: 'products',
            question: 'What safety precautions should I follow?',
            answer: 'Always light crackers in open spaces, maintain safe distance, keep water/sand nearby, never hold lit crackers, supervise children, and follow all instructions on the package.'
        },
        {
            category: 'products',
            question: 'Do you sell eco-friendly crackers?',
            answer: 'Yes, we have a dedicated section for green crackers that produce less smoke and noise. Look for the "Eco-Friendly" tag on product pages.'
        },
        {
            category: 'account',
            question: 'How do I create an account?',
            answer: 'Click on "Sign Up" at the top right, enter your details (name, email, phone, password), and verify your email/phone. You can also sign up during checkout.'
        },
        {
            category: 'account',
            question: 'I forgot my password. What should I do?',
            answer: 'Click "Forgot Password" on the login page, enter your registered email, and follow the reset link sent to your email to create a new password.'
        },
        {
            category: 'account',
            question: 'How do I contact customer support?',
            answer: 'Email us at support@apkcrackers.com, call +91 98765 43210 (Mon-Sat, 9 AM - 6 PM), or use the contact form on our Support page.'
        },
        {
            category: 'account',
            question: 'Can I save my address for future orders?',
            answer: 'Yes, you can save multiple addresses in your account. Go to My Account > Addresses to add, edit, or delete saved addresses.'
        }
    ];

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Header */}
            <div className="bg-white border-b-2 border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-6">
                            Help Center
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed mb-8">
                            Find quick answers to common questions about orders, shipping, returns, and more
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto">
                            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for answers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:bg-white outline-none transition-all text-gray-900"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeCategory === category.id
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-300'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* FAQs List */}
                <div className="space-y-3">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-orange-300 transition-colors"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                                    {openFaq === index ? (
                                        <FiChevronUp className="w-5 h-5 text-orange-600 flex-shrink-0" />
                                    ) : (
                                        <FiChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                    )}
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-200">
                                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No questions found matching your search.</p>
                            <p className="text-gray-400 text-sm mt-2">Try different keywords or browse all categories.</p>
                        </div>
                    )}
                </div>

                {/* Still Need Help */}
                <div className="mt-12 bg-orange-600 rounded-2xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
                    <p className="text-orange-100 mb-6">
                        Can't find the answer you're looking for? Our support team is here to help.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="/Support"
                            className="bg-white hover:bg-gray-100 text-orange-600 font-semibold px-6 py-3 rounded-lg transition-colors"
                        >
                            Contact Support
                        </a>
                        <a
                            href="mailto:support@apkcrackers.com"
                            className="border-2 border-white hover:bg-white hover:text-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                        >
                            Email Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQs;
