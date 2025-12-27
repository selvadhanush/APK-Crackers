import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiMessageCircle, FiHelpCircle, FiFileText, FiUsers, FiSend, FiCheck } from 'react-icons/fi';

const Support = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: 'general',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Support request:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                category: 'general',
                message: ''
            });
        }, 3000);
    };

    const contactCards = [
        {
            icon: FiPhone,
            title: 'Phone Support',
            info: '+91 98765 43210',
            subInfo: 'Available Mon-Sat',
            color: 'orange',
            bgColor: 'bg-orange-500',
            hoverBorder: 'hover:border-orange-500',
            textColor: 'text-orange-600'
        },
        {
            icon: FiMail,
            title: 'Email Us',
            info: 'support@apkcrackers.com',
            subInfo: '24-hour response',
            color: 'blue',
            bgColor: 'bg-blue-500',
            hoverBorder: 'hover:border-blue-500',
            textColor: 'text-blue-600'
        },
        {
            icon: FiMapPin,
            title: 'Visit Us',
            info: 'Sivakasi, Tamil Nadu',
            subInfo: 'India - 626123',
            color: 'green',
            bgColor: 'bg-green-500',
            hoverBorder: 'hover:border-green-500',
            textColor: 'text-green-600'
        },
        {
            icon: FiClock,
            title: 'Working Hours',
            info: '9:00 AM - 6:00 PM',
            subInfo: 'Monday to Saturday',
            color: 'purple',
            bgColor: 'bg-purple-500',
            hoverBorder: 'hover:border-purple-500',
            textColor: 'text-purple-600'
        }
    ];

    const quickHelpLinks = [
        {
            icon: FiHelpCircle,
            title: 'FAQs',
            description: 'Find quick answers',
            link: '/faqs',
            color: 'orange',
            bgHover: 'hover:bg-orange-50',
            borderHover: 'hover:border-orange-500',
            iconBgHover: 'group-hover:bg-orange-100',
            iconColorHover: 'group-hover:text-orange-600'
        },
        {
            icon: FiMessageCircle,
            title: 'Live Chat',
            description: 'Chat with support',
            link: '#chat',
            color: 'blue',
            bgHover: 'hover:bg-blue-50',
            borderHover: 'hover:border-blue-500',
            iconBgHover: 'group-hover:bg-blue-100',
            iconColorHover: 'group-hover:text-blue-600'
        },
        {
            icon: FiFileText,
            title: 'Track Ticket',
            description: 'Check ticket status',
            link: '/track-ticket',
            color: 'green',
            bgHover: 'hover:bg-green-50',
            borderHover: 'hover:border-green-500',
            iconBgHover: 'group-hover:bg-green-100',
            iconColorHover: 'group-hover:text-green-600'
        },
        {
            icon: FiUsers,
            title: 'Community',
            description: 'Join discussions',
            link: '/community',
            color: 'purple',
            bgHover: 'hover:bg-purple-50',
            borderHover: 'hover:border-purple-500',
            iconBgHover: 'group-hover:bg-purple-100',
            iconColorHover: 'group-hover:text-purple-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Header */}
            <div className="bg-white border-b-2 border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <div className="max-w-3xl">
                        <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-6">
                            Customer Support
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            We're here to help
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Have a question about your order, our products, or need technical support?
                            Our dedicated team is ready to assist you every step of the way.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Contact Methods */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {contactCards.map((card, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className={`bg-white border-2 border-gray-200 ${card.hoverBorder} rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                                <div className={`w-14 h-14 ${card.bgColor} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                    <card.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2 text-lg">{card.title}</h3>
                                <p className="text-gray-900 font-semibold mb-1">{card.info}</p>
                                <p className="text-sm text-gray-500">{card.subInfo}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 sm:p-10 shadow-sm">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">Send us a message</h2>
                                <p className="text-gray-600 text-lg">
                                    Fill out the form below and we'll get back to you within 24 hours.
                                </p>
                            </div>

                            {submitted ? (
                                <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-12 text-center">
                                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                        <FiCheck className="w-12 h-12 text-white" strokeWidth={3} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Message sent successfully!</h3>
                                    <p className="text-gray-600 text-lg">
                                        Thank you for reaching out. Our team will respond to your inquiry shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('name')}
                                                onBlur={() => setFocusedField('')}
                                                required
                                                className={`w-full px-4 py-3.5 bg-gray-50 border-2 ${focusedField === 'name' ? 'border-orange-500 bg-white' : 'border-gray-300'
                                                    } rounded-xl focus:ring-0 outline-none transition-all text-gray-900 font-medium`}
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('email')}
                                                onBlur={() => setFocusedField('')}
                                                required
                                                className={`w-full px-4 py-3.5 bg-gray-50 border-2 ${focusedField === 'email' ? 'border-orange-500 bg-white' : 'border-gray-300'
                                                    } rounded-xl focus:ring-0 outline-none transition-all text-gray-900 font-medium`}
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                                Phone Number <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('phone')}
                                                onBlur={() => setFocusedField('')}
                                                className={`w-full px-4 py-3.5 bg-gray-50 border-2 ${focusedField === 'phone' ? 'border-orange-500 bg-white' : 'border-gray-300'
                                                    } rounded-xl focus:ring-0 outline-none transition-all text-gray-900 font-medium`}
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                                How can we help?
                                            </label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('category')}
                                                onBlur={() => setFocusedField('')}
                                                required
                                                className={`w-full px-4 py-3.5 bg-gray-50 border-2 ${focusedField === 'category' ? 'border-orange-500 bg-white' : 'border-gray-300'
                                                    } rounded-xl focus:ring-0 outline-none transition-all text-gray-900 font-medium`}
                                            >
                                                <option value="general">General Question</option>
                                                <option value="order">Order Status</option>
                                                <option value="product">Product Information</option>
                                                <option value="payment">Payment Issue</option>
                                                <option value="delivery">Shipping & Delivery</option>
                                                <option value="return">Returns & Refunds</option>
                                                <option value="technical">Technical Support</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('subject')}
                                            onBlur={() => setFocusedField('')}
                                            required
                                            className={`w-full px-4 py-3.5 bg-gray-50 border-2 ${focusedField === 'subject' ? 'border-orange-500 bg-white' : 'border-gray-300'
                                                } rounded-xl focus:ring-0 outline-none transition-all text-gray-900 font-medium`}
                                            placeholder="Brief summary of your issue"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            Your Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('message')}
                                            onBlur={() => setFocusedField('')}
                                            required
                                            rows="6"
                                            className={`w-full px-4 py-3.5 bg-gray-50 border-2 ${focusedField === 'message' ? 'border-orange-500 bg-white' : 'border-gray-300'
                                                } rounded-xl focus:ring-0 outline-none transition-all resize-none text-gray-900 font-medium`}
                                            placeholder="Please describe your issue in detail..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        <FiSend className="w-5 h-5" />
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Help */}
                        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-6 text-xl">Quick Help</h3>
                            <div className="space-y-3">
                                {quickHelpLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.link}
                                        className={`flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 ${link.borderHover} ${link.bgHover} transition-all group hover:-translate-y-0.5 hover:shadow-md`}
                                    >
                                        <div className={`w-11 h-11 bg-gray-100 ${link.iconBgHover} rounded-xl flex items-center justify-center flex-shrink-0 transition-all`}>
                                            <link.icon className={`w-5 h-5 text-gray-600 ${link.iconColorHover} transition-colors`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-900 text-sm mb-0.5">{link.title}</p>
                                            <p className="text-xs text-gray-500">{link.description}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-orange-500 rounded-2xl p-6 text-white shadow-lg">
                            <h3 className="font-bold mb-6 text-xl">Business Hours</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b-2 border-orange-400">
                                    <span className="text-orange-100 font-medium">Monday - Friday</span>
                                    <span className="font-bold">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b-2 border-orange-400">
                                    <span className="text-orange-100 font-medium">Saturday</span>
                                    <span className="font-bold">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-orange-100 font-medium">Sunday</span>
                                    <span className="font-bold">Closed</span>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t-2 border-orange-400">
                                <p className="text-sm text-orange-100 leading-relaxed">
                                    We respond to all emails within 24 hours during business days.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
