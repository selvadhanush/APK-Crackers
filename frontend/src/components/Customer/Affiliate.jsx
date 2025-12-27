import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHandPointer, FaShareAlt, FaMoneyBillWave, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Affiliate = () => {
    const navigate = useNavigate();
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const testimonials = [
        {
            text: "The Associates Program has given us the data that we need to quickly and continually grow our earnings.",
            author: "Content Creator",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
        },
        {
            text: "Thanks to the Associates Program, we've been able to scale our earnings and reach a wider audience.",
            author: "Tech Blogger",
            image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80"
        },
        {
            text: "The program is simple to sign up, expand and manage. It's been a game changer for our business.",
            author: "Digital Marketer",
            image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80"
        }
    ];

    const faqs = [
        {
            question: "How does the Associates Program work?",
            answer: "You can share products and available programs on our platform with your audience through customized linking tools and earn money on qualifying purchases and customer actions like signing up for a free trial program."
        },
        {
            question: "How do I earn in this program?",
            answer: "You earn from qualifying purchases through the traffic you drive to our platform. Advertising fees for qualifying purchases differ based on product category."
        },
        {
            question: "How do I qualify for this program?",
            answer: "Bloggers, publishers and content creators with a qualifying website or mobile app can participate in this program."
        },
        {
            question: "How do I sign up to the program?",
            answer: "Sign up to the program using the sign-up button. We will review your application and approve it if you meet the qualifying criteria."
        }
    ];

    const [openFaq, setOpenFaq] = useState(null);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">
                            <span className="text-gray-900">APK</span>
                            <span className="text-orange-500">Crackers</span>
                            <span className="text-sm text-gray-600 ml-2">associates</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                            <option>EN</option>
                        </select>
                        <button
                            onClick={() => navigate('/seller-register')}
                            className="text-sm text-gray-700 hover:text-orange-600 transition-colors"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[400px] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Recommend Products. Earn Advertising Fees.
                        </h2>
                        <button
                            onClick={() => navigate('/seller-register')}
                            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Introduction */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        APK Crackers Associates - Our affiliate marketing program
                    </h3>
                    <p className="text-gray-700 leading-relaxed max-w-4xl">
                        Welcome to one of the largest affiliate marketing programs in the world. The APK Crackers Associates Program helps content creators, publishers and bloggers monetize their traffic. With millions of products and programs available on our platform, associates use easy link-building tools to direct their audience to their recommendations, and earn from qualifying purchases and programs.
                    </p>
                </div>

                {/* Three Steps Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {/* Step 1 */}
                    <div className="text-center">
                        <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaHandPointer className="w-10 h-10 text-gray-900" />
                        </div>
                        <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold">1</span>
                        </div>
                        <h4 
                        onClick={() => navigate('/seller-register')}
                        className="text-xl font-bold text-gray-900 mb-3 cursor-pointer">Sign up</h4>
                        <p className="text-gray-600">
                            Join tens of thousands of creators, publishers and bloggers who are earning with the APK Crackers Associates Program.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="text-center">
                        <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaShareAlt className="w-10 h-10 text-gray-900" />
                        </div>
                        <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold">2</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">Recommend</h4>
                        <p className="text-gray-600">
                            Share millions of products with your audience. We have customized linking tools for large publishers, individual bloggers and social media influencers.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="text-center">
                        <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaMoneyBillWave className="w-10 h-10 text-gray-900" />
                        </div>
                        <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold">3</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">Earn</h4>
                        <p className="text-gray-600">
                            Earn up to 10% in affiliate fees from qualifying purchases and programs. Our competitive conversion rates help maximize earnings.
                        </p>
                    </div>
                </div>

                {/* Testimonials Carousel */}
                <div className="mb-16 bg-gray-50 rounded-2xl overflow-hidden">
                    <div className="relative h-[400px]">
                        <img
                            src={testimonials[currentTestimonial].image}
                            alt="Testimonial"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
                            <div className="max-w-2xl px-8 md:px-16 text-white">
                                <p className="text-2xl md:text-3xl font-bold mb-4 leading-relaxed">
                                    "{testimonials[currentTestimonial].text}"
                                </p>
                                <p className="text-lg font-semibold">
                                    {testimonials[currentTestimonial].author}
                                </p>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevTestimonial}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                        >
                            <FaChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                        >
                            <FaChevronRight className="w-6 h-6 text-white" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentTestimonial
                                            ? 'bg-white w-8'
                                            : 'bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Frequently Asked Questions
                    </h3>
                    <div className="max-w-4xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                                >
                                    <span className="font-semibold text-gray-900">{faq.question}</span>
                                    <span className="text-gray-500 text-xl">
                                        {openFaq === index ? '−' : '+'}
                                    </span>
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA Section */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-12 text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <h2 className="text-3xl font-bold">
                            <span className="text-gray-900">APK</span>
                            <span className="text-orange-500">Crackers</span>
                            <span className="text-lg text-gray-600 ml-2">associates</span>
                        </h2>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        Recommend Products. Earn Advertising Fees.
                    </h3>
                    <button
                        onClick={() => navigate('/seller-register')}
                        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Sign up
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-400">
                        © 2024 APK Crackers Associates. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Affiliate;
