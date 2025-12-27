import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Contact form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
                    <p className="text-lg text-gray-600 mt-2">We'd love to hear from you</p>
                </div>
            </header>

            {/* Contact Info Cards */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiPhone className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
                            <p className="text-gray-600">+91 98765 43210</p>
                            <p className="text-sm text-gray-500 mt-1">Mon-Sat, 9 AM - 6 PM</p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiMail className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                            <p className="text-gray-600">support@apkcrackers.com</p>
                            <p className="text-sm text-gray-500 mt-1">24-hour response</p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiMapPin className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Address</h3>
                            <p className="text-gray-600">Sivakasi, Tamil Nadu</p>
                            <p className="text-sm text-gray-500 mt-1">India - 626123</p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiClock className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Working Hours</h3>
                            <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                            <p className="text-sm text-gray-500 mt-1">Monday to Saturday</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Form */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                            <p className="text-gray-600 mb-8">
                                Fill out the form below and we'll get back to you within 24 hours.
                            </p>

                            {submitted ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FiSend className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-600">
                                        Thank you for contacting us. We'll respond to your inquiry shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                                Subject *
                                            </label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="order">Order Status</option>
                                                <option value="product">Product Information</option>
                                                <option value="shipping">Shipping & Delivery</option>
                                                <option value="return">Returns & Refunds</option>
                                                <option value="bulk">Bulk Orders</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            Your Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="6"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 resize-none"
                                            placeholder="Tell us how we can help you..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <FiSend className="w-5 h-5" />
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Additional Info */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                            <p className="text-gray-600 mb-8">
                                Have questions about our products or services? Our team is here to help you
                                with any inquiries you may have.
                            </p>

                            <div className="space-y-6">
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                    <h3 className="font-bold text-gray-900 mb-3">Customer Support</h3>
                                    <p className="text-gray-600 mb-4">
                                        For order-related queries, product information, or general assistance.
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-gray-700">
                                            <strong>Email:</strong> support@apkcrackers.com
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Phone:</strong> +91 98765 43210
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                    <h3 className="font-bold text-gray-900 mb-3">Business Inquiries</h3>
                                    <p className="text-gray-600 mb-4">
                                        For bulk orders, partnerships, or business collaborations.
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-gray-700">
                                            <strong>Email:</strong> business@apkcrackers.com
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Phone:</strong> +91 98765 43211
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                    <h3 className="font-bold text-gray-900 mb-3">Visit Our Store</h3>
                                    <p className="text-gray-600 mb-4">
                                        Come visit our showroom in Sivakasi to see our complete range of products.
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-gray-700">
                                            123, Sivakasi Main Road<br />
                                            Sivakasi, Tamil Nadu<br />
                                            India - 626123
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Hours:</strong> Mon-Sat, 9:00 AM - 6:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Quick Links */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Help</h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                            <h3 className="font-bold text-gray-900 mb-2">Track Your Order</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Check the status of your order in real-time
                            </p>
                            <a href="/track-order" className="text-orange-600 font-semibold hover:text-orange-700">
                                Track Now →
                            </a>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                            <h3 className="font-bold text-gray-900 mb-2">FAQs</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Find answers to commonly asked questions
                            </p>
                            <a href="/faqs" className="text-orange-600 font-semibold hover:text-orange-700">
                                View FAQs →
                            </a>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                            <h3 className="font-bold text-gray-900 mb-2">Returns & Refunds</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Learn about our return and refund policy
                            </p>
                            <a href="/returns" className="text-orange-600 font-semibold hover:text-orange-700">
                                Learn More →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-orange-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
                    <p className="text-xl text-orange-100 mb-8">
                        Call us now for instant support
                    </p>
                    <a
                        href="tel:+919876543210"
                        className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-orange-600 font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
                    >
                        <FiPhone className="w-5 h-5" />
                        +91 98765 43210
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Contact;
