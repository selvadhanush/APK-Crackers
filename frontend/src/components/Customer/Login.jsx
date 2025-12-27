import { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import { toast } from 'react-toastify';
import API from '../../../api';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [acceptPolicy, setAcceptPolicy] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const existingRole = sessionStorage.getItem('userRole') || localStorage.getItem('userRole');
        if (existingRole && existingRole !== 'customer') {
            const roleNames = {
                'seller': 'Seller',
                'admin': 'Admin'
            };
            toast.error(`You are already logged in as ${roleNames[existingRole]}. Please logout and try again.`, {
                position: "top-center",
                autoClose: 4000,
            });
            return;
        }

        if (!acceptPolicy) {
            setError('You must accept the Privacy Policy to continue');
            return;
        }

        setLoading(true);

        try {
            const response = await API.post('/customer/auth/login', {
                email,
                password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('userRole', 'customer');

                setSuccess('Login successful! Redirecting...');
                toast.success('Login successful!');

                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            }
        } catch (err) {
            console.error('Login error:', err);
            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-gray-400";
    const labelClasses = "block text-xs sm:text-sm font-medium text-gray-700 mb-1.5";

    return (
        <div className="min-h-screen bg-white flex justify-center py-6 sm:py-8 md:py-12 px-3 sm:px-4 lg:px-8">
            <div className="w-full max-w-md space-y-6 sm:space-y-8">
                <div className="text-center space-y-1.5 sm:space-y-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                        Welcome Back
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-500">
                        Sign in to your APK Crackers account
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg">
                        <p className="text-xs sm:text-sm font-medium">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg">
                        <p className="text-xs sm:text-sm font-medium">{success}</p>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <button type="button" className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95">
                        <FaGoogle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                        <span className="text-xs sm:text-sm font-semibold text-gray-700">Google</span>
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95">
                        <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        <span className="text-xs sm:text-sm font-semibold text-gray-700">Facebook</span>
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs sm:text-sm">
                        <span className="px-3 sm:px-4 bg-white text-gray-500">Or continue with email</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                        <label htmlFor="email" className={labelClasses}>Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClasses}
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className={labelClasses}>Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`${inputClasses} pr-10 sm:pr-11`}
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer active:scale-95"
                            >
                                {showPassword ? <FaEyeSlash className="w-4 h-4 sm:w-5 sm:h-5" /> : <FaEye className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <span className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                        </label>
                        <a href="#" className="text-xs sm:text-sm font-semibold text-orange-600 hover:text-orange-500">
                            Forgot Password?
                        </a>
                    </div>

                    <div className="mt-4">
                        <label className="flex items-start gap-2.5 sm:gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={acceptPolicy}
                                onChange={(e) => setAcceptPolicy(e.target.checked)}
                                className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 mt-0.5"
                                required
                            />
                            <span className="text-xs sm:text-sm text-gray-600">
                                I agree to the{' '}
                                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-500 underline">Privacy Policy</a>
                                {' and '}
                                <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:text-orange-500 underline">Terms & Conditions</a>
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full font-semibold text-sm sm:text-base md:text-lg py-3 sm:py-3.5 md:py-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all shadow-sm active:scale-95 ${loading
                            ? 'bg-orange-400 text-white cursor-not-allowed'
                            : 'bg-orange-600 text-white hover:bg-orange-700'
                            }`}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center text-xs sm:text-sm text-gray-500">
                    Don't have an account?{' '}
                    <a href="/Register" className="font-semibold text-orange-600 hover:text-orange-500">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
