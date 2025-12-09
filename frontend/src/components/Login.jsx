import { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login submitted:', { email, password, rememberMe });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 p-4 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {/* Animated Circles */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-orange-300/20 to-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-orange-200/10 to-yellow-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Main Container */}
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Illustration */}
                    <div className="lg:w-1/2 bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-500 p-12 flex flex-col items-center justify-center relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white/20 rounded-full"></div>
                            <div className="absolute bottom-20 right-10 w-32 h-32 border-4 border-white/20 rounded-full"></div>
                            <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-white/20 rounded-full"></div>
                        </div>

                        {/* SVG Illustration */}
                        <div className="relative z-10 w-full max-w-md">
                            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
                                {/* Firework Burst 1 */}
                                <g className="animate-pulse" style={{ transformOrigin: '200px 150px' }}>
                                    <circle cx="200" cy="150" r="8" fill="#FFD700" />
                                    <line x1="200" y1="150" x2="200" y2="100" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
                                    <line x1="200" y1="150" x2="240" y2="120" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
                                    <line x1="200" y1="150" x2="250" y2="150" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
                                    <line x1="200" y1="150" x2="240" y2="180" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
                                    <line x1="200" y1="150" x2="200" y2="200" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
                                    <line x1="200" y1="150" x2="160" y2="180" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
                                    <line x1="200" y1="150" x2="150" y2="150" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
                                    <line x1="200" y1="150" x2="160" y2="120" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
                                    {/* Sparkles */}
                                    <circle cx="200" cy="100" r="4" fill="#FFF" />
                                    <circle cx="240" cy="120" r="4" fill="#FFF" />
                                    <circle cx="250" cy="150" r="4" fill="#FFF" />
                                    <circle cx="240" cy="180" r="4" fill="#FFF" />
                                    <circle cx="200" cy="200" r="4" fill="#FFF" />
                                    <circle cx="160" cy="180" r="4" fill="#FFF" />
                                    <circle cx="150" cy="150" r="4" fill="#FFF" />
                                    <circle cx="160" cy="120" r="4" fill="#FFF" />
                                </g>

                                {/* Firework Burst 2 */}
                                <g className="animate-pulse" style={{ transformOrigin: '120px 250px', animationDelay: '0.5s' }}>
                                    <circle cx="120" cy="250" r="6" fill="#FF6B6B" />
                                    <line x1="120" y1="250" x2="120" y2="220" stroke="#FF6B6B" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="120" y1="250" x2="145" y2="230" stroke="#FF6B6B" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="120" y1="250" x2="150" y2="250" stroke="#FF6B6B" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="120" y1="250" x2="145" y2="270" stroke="#FF6B6B" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="120" y1="250" x2="120" y2="280" stroke="#FF6B6B" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="120" y1="250" x2="95" y2="270" stroke="#FF6B6B" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="120" y1="250" x2="90" y2="250" stroke="#FF6B6B" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="120" y1="250" x2="95" y2="230" stroke="#FF6B6B" strokeWidth="2.5" strokeLinecap="round" />
                                    {/* Sparkles */}
                                    <circle cx="120" cy="220" r="3" fill="#FFF" />
                                    <circle cx="145" cy="230" r="3" fill="#FFF" />
                                    <circle cx="150" cy="250" r="3" fill="#FFF" />
                                    <circle cx="145" cy="270" r="3" fill="#FFF" />
                                </g>

                                {/* Firework Burst 3 */}
                                <g className="animate-pulse" style={{ transformOrigin: '280px 280px', animationDelay: '1s' }}>
                                    <circle cx="280" cy="280" r="6" fill="#4ECDC4" />
                                    <line x1="280" y1="280" x2="280" y2="250" stroke="#4ECDC4" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="280" y1="280" x2="305" y2="260" stroke="#4ECDC4" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="280" y1="280" x2="310" y2="280" stroke="#4ECDC4" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="280" y1="280" x2="305" y2="300" stroke="#4ECDC4" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="280" y1="280" x2="280" y2="310" stroke="#4ECDC4" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="280" y1="280" x2="255" y2="300" stroke="#4ECDC4" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="280" y1="280" x2="250" y2="280" stroke="#4ECDC4" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="280" y1="280" x2="255" y2="260" stroke="#4ECDC4" strokeWidth="2.5" strokeLinecap="round" />
                                    {/* Sparkles */}
                                    <circle cx="280" cy="250" r="3" fill="#FFF" />
                                    <circle cx="310" cy="280" r="3" fill="#FFF" />
                                    <circle cx="280" cy="310" r="3" fill="#FFF" />
                                    <circle cx="250" cy="280" r="3" fill="#FFF" />
                                </g>

                                {/* Decorative Stars */}
                                <g fill="#FFF" opacity="0.8">
                                    <polygon points="50,80 52,86 58,86 53,90 55,96 50,92 45,96 47,90 42,86 48,86" className="animate-pulse" />
                                    <polygon points="340,120 342,126 348,126 343,130 345,136 340,132 335,136 337,130 332,126 338,126" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                                    <polygon points="80,320 82,326 88,326 83,330 85,336 80,332 75,336 77,330 72,326 78,326" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                                    <polygon points="350,340 352,346 358,346 353,350 355,356 350,352 345,356 347,350 342,346 348,346" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
                                </g>
                            </svg>
                        </div>

                        {/* Welcome Text */}
                        <div className="mt-8 text-center relative z-10">
                            <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">Welcome Back!</h2>
                            <p className="text-white/90 text-lg font-medium">Light up your celebrations with APK Crackers</p>
                            <div className="mt-6 flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="lg:w-1/2 p-12 flex flex-col justify-center">
                        <div className="max-w-md mx-auto w-full">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h1>
                                <p className="text-gray-600">Enter your credentials to access your account</p>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all group cursor-pointer shadow-sm hover:shadow-md">
                                    <FaGoogle className="w-5 h-5 text-red-500" />
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">Google</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all group cursor-pointer shadow-sm hover:shadow-md">
                                    <FaFacebook className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">Facebook</span>
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500 font-medium">Or continue with email</span>
                                </div>
                            </div>

                            {/* Login Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-gray-800 placeholder-gray-400"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-gray-800 placeholder-gray-400 pr-12"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500 transition-colors cursor-pointer"
                                        >
                                            {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors">Remember me</span>
                                    </label>
                                    <a href="#" className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                                        Forgot Password?
                                    </a>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
                                >
                                    Sign In
                                </button>
                            </form>

                            {/* Sign Up Link */}
                            <p className="mt-6 text-center text-gray-600">
                                Don't have an account?{' '}
                                <a href="/Register" className="font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
