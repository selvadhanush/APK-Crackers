import React, { useState } from 'react';
import {
    MdBusiness,
    MdEmail,
    MdPhone,
    MdLocationOn,
    MdCheckCircle,
    MdStore,
    MdPerson,
    MdLock
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import API from '../../../../api';

const SellerRegister = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        businessName: '',
        businessType: '',
        businessAddress: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password length
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setLoading(true);

        try {
            const registrationData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                businessName: formData.businessName,
                businessType: formData.businessType,
                businessAddress: formData.businessAddress
            };

            const response = await API.post('/seller/auth/register', registrationData);

            if (response.data.token) {
                // Store token in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.seller));
                localStorage.setItem('userRole', 'seller');

                setSuccess('Registration successful! Redirecting to seller dashboard...');

                // Redirect to seller dashboard after 2 seconds
                setTimeout(() => {
                    navigate('/seller-home');
                }, 2000);
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all placeholder:text-gray-400 bg-white hover:border-gray-300";
    const labelClasses = "block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2";

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 flex items-center justify-center p-3 sm:p-4 md:p-6 py-6 sm:py-8">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg">
                        <MdStore className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 px-4">Seller Registration</h1>
                    <p className="text-sm sm:text-base text-gray-600 px-4">Register your business to start selling on APK Crackers</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 sm:mb-6 bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg">
                            <p className="text-xs sm:text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="mb-4 sm:mb-6 bg-green-50 border border-green-200 text-green-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg">
                            <p className="text-xs sm:text-sm font-medium">{success}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                        {/* Business Information */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-2 pb-2 sm:pb-3 border-b border-gray-200">
                                <MdBusiness className="text-orange-600 text-lg sm:text-xl" />
                                <h2 className="text-base sm:text-lg font-bold text-gray-900">Business Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label className={labelClasses}>Business Name *</label>
                                    <input
                                        type="text"
                                        name="businessName"
                                        value={formData.businessName}
                                        onChange={handleInputChange}
                                        className={inputClasses}
                                        placeholder="Enter your business name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelClasses}>Business Type *</label>
                                    <select
                                        name="businessType"
                                        value={formData.businessType}
                                        onChange={handleInputChange}
                                        className={inputClasses}
                                        required
                                    >
                                        <option value="">Select business type</option>
                                        <option value="manufacturer">Manufacturer</option>
                                        <option value="wholesaler">Wholesaler</option>
                                        <option value="retailer">Retailer</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className={labelClasses}>Business Address *</label>
                                <textarea
                                    name="businessAddress"
                                    value={formData.businessAddress}
                                    onChange={handleInputChange}
                                    className={inputClasses}
                                    placeholder="Complete business address with city, state, and pincode"
                                    rows="3"
                                    required
                                />
                            </div>
                        </div>

                        {/* Owner Information */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-2 pb-2 sm:pb-3 border-b border-gray-200">
                                <MdPerson className="text-orange-600 text-lg sm:text-xl" />
                                <h2 className="text-base sm:text-lg font-bold text-gray-900">Owner Information</h2>
                            </div>

                            <div>
                                <label className={labelClasses}>Owner Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={inputClasses}
                                    placeholder="Full name of business owner"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label className={labelClasses}>Email Address *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                            <MdEmail className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`${inputClasses} pl-10 sm:pl-11`}
                                            placeholder="business@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClasses}>Phone Number *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                            <MdPhone className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`${inputClasses} pl-10 sm:pl-11`}
                                            placeholder="+91 98765 43210"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-2 pb-2 sm:pb-3 border-b border-gray-200">
                                <MdLock className="text-orange-600 text-lg sm:text-xl" />
                                <h2 className="text-base sm:text-lg font-bold text-gray-900">Security</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label className={labelClasses}>Password *</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={inputClasses}
                                        placeholder="Create a strong password (min 8 characters)"
                                        minLength="8"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelClasses}>Confirm Password *</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className={inputClasses}
                                        placeholder="Re-enter your password"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white font-semibold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 ${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/30 hover:shadow-xl'
                                    }`}
                            >
                                <MdCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                {loading ? 'Registering...' : 'Register as Seller'}
                            </button>
                        </div>

                        {/* Login Link */}
                        <p className="text-center text-xs sm:text-sm text-gray-600 pt-3 sm:pt-4">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/seller-login')}
                                className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                            >
                                Sign In
                            </button>
                        </p>
                    </form>
                </div>

                {/* Info Note */}
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-xs sm:text-sm text-orange-800">
                        <strong>Note:</strong> After registration, you'll need to complete KYC verification to start selling. You can upload your business licenses and documents from the seller dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SellerRegister;
