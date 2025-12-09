import { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        newsletter: true,
        agreeToTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registration submitted:', formData);
    };

    const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-gray-400";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-1.5";

    return (
        <div className="min-h-screen bg-white flex justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl space-y-10">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Create Your Account
                    </h1>
                    <p className="text-lg text-gray-500">
                        Join APK Crackers and light up your celebrations
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button type="button" className="flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all">
                        <FaGoogle className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-semibold text-gray-700">Google</span>
                    </button>
                    <button type="button" className="flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all">
                        <FaFacebook className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-700">Facebook</span>
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Or register with email</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                            <FaUser className="text-orange-500" />
                            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="firstName" className={labelClasses}>First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder="John"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className={labelClasses}>Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder="Doe"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="email" className={labelClasses}>Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaEnvelope className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`${inputClasses} pl-11`}
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaPhone className="text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`${inputClasses} pl-11`}
                                        placeholder="+91 98765 43210"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                            <FaMapMarkerAlt className="text-orange-500" />
                            <h3 className="text-lg font-semibold text-gray-900">Delivery Address</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label htmlFor="addressLine1" className={labelClasses}>Address Line 1</label>
                                <input
                                    type="text"
                                    id="addressLine1"
                                    name="addressLine1"
                                    value={formData.addressLine1}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder="Street address, P.O. box"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="addressLine2" className={labelClasses}>Address Line 2 <span className="text-gray-400 font-normal">(Optional)</span></label>
                                <input
                                    type="text"
                                    id="addressLine2"
                                    name="addressLine2"
                                    value={formData.addressLine2}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder="Apartment, unit, etc."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="city" className={labelClasses}>City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="state" className={labelClasses}>State</label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="postalCode" className={labelClasses}>PIN Code</label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        pattern="[0-9]{6}"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-100">Security</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="password" className={labelClasses}>Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`${inputClasses} pr-11`}
                                        minLength="8"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className={labelClasses}>Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`${inputClasses} pr-11`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                name="newsletter"
                                checked={formData.newsletter}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 mt-0.5"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                Subscribe to our newsletter for exclusive offers and festival updates
                            </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 mt-0.5"
                                required
                            />
                            <span className="text-sm text-gray-600">
                                I agree to the{' '}
                                <a href="#" className="font-semibold text-orange-600 hover:text-orange-500">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="font-semibold text-orange-600 hover:text-orange-500">Privacy Policy</a>
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white font-semibold text-lg py-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all shadow-sm"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <a href="/Login" className="font-semibold text-orange-600 hover:text-orange-500">
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;