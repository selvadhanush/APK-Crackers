import { useNavigate } from 'react-router-dom';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaLinkedinIn,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaCreditCard,
    FaTruck,
    FaShieldAlt,
    FaHeadset
} from 'react-icons/fa';

const Footer = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: 'About Us', path: '/about' },
            { name: 'Contact Us', path: '/contact' },
            { name: 'Careers', path: '/careers' },
            { name: 'Press & Media', path: '/press' },
            { name: 'Our Stores', path: '/stores' }
        ],
        help: [
            { name: 'Customer Support', path: '/support' },
            { name: 'Shipping & Delivery', path: '/shipping' },
            { name: 'Returns & Refunds', path: '/returns' },
            { name: 'Track Order', path: '/track-order' },
            { name: 'FAQs', path: '/faqs' }
        ],
        policy: [
            { name: 'Sell on APK Crackers', path: '/seller-register' },
            { name: 'Sell under APK Crackers Accelerator', path: '/Affiliate' },
            { name: 'Protect and Build Your Brand', path: '/BrandRegistry' },
            { name: 'Become an Affiliate', path: '/affiliate' },
            { name: 'Advertise Your Products', path: '/advertise' }
        ],
        categories: [
            { name: 'Sparklers', path: '/category/sparklers' },
            { name: 'Rockets', path: '/category/rockets' },
            { name: 'Flower Pots', path: '/category/flowerpots' },
            { name: 'Chakras', path: '/category/chakras' },
            { name: 'Gift Boxes', path: '/category/giftboxes' }
        ]
    };

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">


            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="mb-4">
                            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                                APK Crackers
                            </h2>
                            <p className="text-gray-400 text-sm mt-2">
                                Your trusted destination for premium quality crackers and fireworks
                            </p>
                        </div>

                        {/* Social Media Links */}
                        <div className="mt-6">
                            <h4 className="text-sm font-semibold mb-3 text-gray-300">Follow Us</h4>
                            <div className="flex gap-3">
                                {[
                                    { icon: FaFacebookF, color: 'hover:bg-blue-600' },
                                    { icon: FaTwitter, color: 'hover:bg-sky-500' },
                                    { icon: FaInstagram, color: 'hover:bg-pink-600' },
                                    { icon: FaYoutube, color: 'hover:bg-red-600' },
                                    { icon: FaLinkedinIn, color: 'hover:bg-blue-700' }
                                ].map((social, index) => (
                                    <button
                                        key={index}
                                        className={`w-10 h-10 rounded-full bg-gray-800 ${social.color} flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 border border-gray-700 hover:border-transparent cursor-pointer`}
                                    >
                                        <social.icon className="w-4 h-4" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white">Company</h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => navigate(link.path)}
                                        className="text-gray-400 hover:text-orange-500 transition-colors text-sm hover:translate-x-1 inline-block transform duration-200 cursor-pointer"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help & Support */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white cursor-pointer hover:text-orange-500 transition-colors">Help & Support</h4>
                        <ul className="space-y-2">
                            {footerLinks.help.map((link, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => navigate(link.path)}
                                        className="text-gray-400 hover:text-orange-500 transition-colors text-sm hover:translate-x-1 inline-block transform duration-200"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white cursor-pointer hover:text-orange-500 transition-colors">Make Money with Us</h4>
                        <ul className="space-y-2">
                            {footerLinks.policy.map((link, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => navigate(link.path)}
                                        className="text-gray-400 hover:text-orange-500 transition-colors text-sm hover:translate-x-1 inline-block transform duration-200 cursor-pointer"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">
                                    123 Sivakasi Main Road,<br />
                                    Tamil Nadu, India - 626123
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <a href="tel:+911234567890" className="text-gray-400 hover:text-orange-500 text-sm transition-colors cursor-pointer">
                                    +91 12345 67890
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <a href="mailto:support@apkcrackers.com" className="text-gray-400 hover:text-orange-500 text-sm transition-colors cursor-pointer">
                                    support@apkcrackers.com
                                </a>
                            </li>
                        </ul>

                        {/* Download App Section */}
                        <div className="mt-6">
                            <h5 className="text-sm font-semibold mb-3 text-gray-300">Download Our App</h5>
                            <div className="flex flex-col gap-2">
                                <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95 transform">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-8" />
                                </button>
                                <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95 transform">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Bar */}
            <div className="border-y border-gray-700 bg-gray-900/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FaTruck className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-white">Free Delivery</p>
                                <p className="text-xs text-gray-400">On Every orders</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FaShieldAlt className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-white">100% Safe</p>
                                <p className="text-xs text-gray-400">Certified products</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FaCreditCard className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-white">Secure Payment</p>
                                <p className="text-xs text-gray-400">Multiple options</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FaHeadset className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-white">24/7 Support</p>
                                <p className="text-xs text-gray-400">Always here to help</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="border-b border-gray-700 bg-gray-900/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left">
                            <p className="text-sm font-semibold text-gray-300 mb-2">We Accept</p>
                            <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
                                {['Visa', 'Mastercard', 'PayPal', 'UPI', 'Paytm', 'GPay'].map((method, index) => (
                                    <div key={index} className="bg-white rounded px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
                                        {method}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-center sm:text-right">
                            <p className="text-sm font-semibold text-gray-300 mb-2 cursor-pointer hover:text-orange-500 transition-colors">Certified By</p>
                            <div className="flex items-center gap-3 justify-center sm:justify-end">
                                <div className="bg-white rounded px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
                                    ISO 9001
                                </div>
                                <div className="bg-white rounded px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
                                    BIS Certified
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-black/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-400 text-center md:text-left">
                            © {currentYear} <span className="text-orange-500 font-semibold">APK Crackers</span>. All rights reserved.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
                            <button onClick={() => navigate('/sitemap')} className="hover:text-orange-500 transition-colors cursor-pointer">
                                Sitemap
                            </button>
                            <span className="text-gray-700">|</span>
                            <button onClick={() => navigate('/accessibility')} className="hover:text-orange-500 transition-colors cursor-pointer">
                                Accessibility
                            </button>
                            <span className="text-gray-700">|</span>
                            <button onClick={() => navigate('/legal')} className="hover:text-orange-500 transition-colors cursor-pointer">
                                Legal
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 text-center md:text-right">
                            Made with ❤️ in India
                        </p>
                    </div>
                </div>
            </div>

            {/* Safety Warning */}
            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-t border-orange-800/50 pb-16 md:pb-0">
                <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
                    <p className="text-[10px] sm:text-xs md:text-sm text-center text-orange-200 leading-relaxed">
                        ⚠️ <span className="font-semibold">Safety First:</span> Always follow safety guidelines when using crackers and fireworks. Keep away from children. Use in open areas only.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
