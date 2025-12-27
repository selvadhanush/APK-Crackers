import { FiAward, FiShield, FiUsers, FiTrendingUp, FiHeart, FiTarget } from 'react-icons/fi';

const AboutUs = () => {
    const stats = [
        { number: '25+', label: 'Years of Excellence' },
        { number: '10M+', label: 'Happy Customers' },
        { number: '500+', label: 'Product Varieties' },
        { number: '100%', label: 'Safety Certified' }
    ];

    const values = [
        {
            icon: FiShield,
            title: 'Safety First',
            description: 'All products are PESO and BIS certified, ensuring the highest safety standards for our customers.'
        },
        {
            icon: FiAward,
            title: 'Quality Excellence',
            description: 'We maintain strict quality control at every stage, from manufacturing to delivery.'
        },
        {
            icon: FiHeart,
            title: 'Customer Satisfaction',
            description: 'Your happiness is our priority. We go the extra mile to ensure a delightful experience.'
        },
        {
            icon: FiTrendingUp,
            title: 'Innovation',
            description: 'Constantly evolving with eco-friendly crackers and sustainable manufacturing practices.'
        },
        {
            icon: FiUsers,
            title: 'Community Focus',
            description: 'Supporting local artisans and contributing to the growth of Sivakasi\'s cracker industry.'
        },
        {
            icon: FiTarget,
            title: 'Transparency',
            description: 'Honest pricing, clear product information, and authentic customer reviews.'
        }
    ];

    const milestones = [
        { year: '1998', event: 'APK Crackers founded in Sivakasi, Tamil Nadu' },
        { year: '2005', event: 'Received BIS certification for all products' },
        { year: '2010', event: 'Expanded to online sales platform' },
        { year: '2015', event: 'Launched eco-friendly green crackers range' },
        { year: '2020', event: 'Reached 5 million satisfied customers' },
        { year: '2024', event: 'Serving 10M+ customers across India' }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-4xl font-bold text-gray-900">About APK Crackers</h1>
                    <p className="text-lg text-gray-600 mt-2">Lighting up celebrations since 1998</p>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-16 bg-orange-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">India's Trusted Crackers Brand</h2>
                    <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
                        For over 25 years, APK Crackers has been bringing joy and light to millions of celebrations
                        across India. Based in Sivakasi, the fireworks capital of India, we combine traditional
                        craftsmanship with modern safety standards.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-5xl font-bold text-orange-600 mb-2">{stat.number}</div>
                                <p className="text-gray-600 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
                        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                            <p>
                                APK Crackers was founded in 1998 in Sivakasi, Tamil Nadu, the fireworks capital of India.
                                What started as a small family business has grown into one of India's most trusted names
                                in the crackers industry.
                            </p>
                            <p>
                                Our journey began with a simple mission: to bring safe, high-quality crackers to every
                                household in India. Over the years, we've stayed true to this mission while embracing
                                innovation and sustainability.
                            </p>
                            <p>
                                Today, we serve over 10 million customers annually, offering 500+ varieties of crackers,
                                sparklers, and fireworks. Every product is manufactured under strict safety guidelines
                                and carries PESO and BIS certifications.
                            </p>
                            <p>
                                We're proud to be pioneers in eco-friendly crackers, reducing pollution while keeping
                                the joy of celebrations alive. Our commitment to quality, safety, and customer satisfaction
                                has made us a household name across India.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                                    <value.icon className="w-8 h-8 text-orange-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Journey */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Journey</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="flex gap-6">
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                                            {milestone.year}
                                        </div>
                                        {index < milestones.length - 1 && (
                                            <div className="w-1 h-full bg-orange-200 mt-2" />
                                        )}
                                    </div>
                                    <div className="flex-1 pb-8">
                                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                                            <p className="text-gray-700 text-lg">{milestone.event}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose APK Crackers?</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">100% Certified Products</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Every product carries PESO and BIS certifications. We never compromise on safety
                                and quality standards.
                            </p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Eco-Friendly Options</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our green crackers range produces less smoke and noise, making celebrations
                                environmentally responsible.
                            </p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Direct from Sivakasi</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Manufactured in Sivakasi, the fireworks capital, ensuring authentic quality
                                and competitive pricing.
                            </p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Pan-India Delivery</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Safe and timely delivery across India with PESO-compliant packaging and
                                real-time tracking.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Commitment */}
            <section className="py-16 bg-orange-50 border-y border-orange-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment to You</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            At APK Crackers, we're committed to making your celebrations memorable, safe, and
                            environmentally responsible. We continuously invest in research and development to
                            bring you innovative products that meet the highest safety standards.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Our team of experts works tirelessly to ensure every cracker that leaves our facility
                            is perfect. From sourcing raw materials to final quality checks, we maintain strict
                            standards at every step.
                        </p>
                    </div>
                </div>
            </section>

            {/* Location */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Visit Us</h2>
                    <div className="max-w-3xl mx-auto bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">APK Crackers Headquarters</h3>
                        <p className="text-gray-700 mb-2">123, Sivakasi Main Road</p>
                        <p className="text-gray-700 mb-2">Sivakasi, Tamil Nadu</p>
                        <p className="text-gray-700 mb-6">India - 626123</p>
                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div>
                                <p className="font-bold text-gray-900 mb-1">Email</p>
                                <p className="text-gray-600">info@apkcrackers.com</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 mb-1">Phone</p>
                                <p className="text-gray-600">+91 98765 43210</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-orange-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6">Join Our Family</h2>
                    <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                        Experience the APK Crackers difference. Safe, certified, and joyful celebrations await you.
                    </p>
                    <button className="bg-white hover:bg-gray-100 text-orange-600 font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
                        Shop Now
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
