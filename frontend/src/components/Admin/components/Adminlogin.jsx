import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdPerson, MdLock, MdVisibility, MdVisibilityOff, MdAdminPanelSettings } from 'react-icons/md';
import { FaShieldAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import API from '../../../../api';

const Adminlogin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Check if user is already logged in as another role
        const existingRole = sessionStorage.getItem('userRole') || localStorage.getItem('userRole');
        if (existingRole && existingRole !== 'admin') {
            const roleNames = {
                'customer': 'Customer',
                'seller': 'Seller'
            };
            toast.error(`You are already logged in as ${roleNames[existingRole]}. Please logout and try again.`, {
                position: "top-center",
                autoClose: 4000,
            });
            return;
        }

        setLoading(true);

        try {
            const response = await API.post('/admin/auth/login', {
                username: formData.username,
                password: formData.password
            });

            if (response.data.token) {
                // Store token and admin data in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.admin));
                localStorage.setItem('userRole', 'admin');

                // Store login timestamp for session management
                const loginTime = new Date().getTime();
                localStorage.setItem('loginTime', loginTime.toString());

                toast.success('Admin login successful!');

                // Navigate to admin dashboard
                navigate('/admin-dashboard');
            }
        } catch (err) {
            console.error('Admin login error:', err);
            let errorMessage = '';
            if (err.response?.status === 404) {
                errorMessage = 'Admin account not found. Please check your username.';
            } else if (err.response?.status === 400) {
                errorMessage = 'Invalid credentials. Please try again.';
            } else {
                errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
            }
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-2xl shadow-purple-500/50">
                        <FaShieldAlt className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-gray-300">Secure access to administrative dashboard</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg backdrop-blur-sm">
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-200 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="Enter admin username"
                                    className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-200 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter admin password"
                                    className="w-full pl-12 pr-12 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <MdVisibilityOff className="w-5 h-5" />
                                    ) : (
                                        <MdVisibility className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-purple-500"
                                />
                                <span className="ml-2 text-sm text-gray-300">Remember me</span>
                            </label>
                            <button
                                type="button"
                                className="text-sm text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 text-white font-bold rounded-xl transition-all shadow-lg ${loading
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 transform hover:-translate-y-0.5'
                                }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Authenticating...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <MdAdminPanelSettings className="w-5 h-5" />
                                    <span>Sign In as Admin</span>
                                </div>
                            )}
                        </button>
                    </form>

                    {/* Security Notice */}
                    <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg backdrop-blur-sm">
                        <div className="flex items-start gap-3">
                            <FaShieldAlt className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-yellow-200 font-semibold mb-1">Security Notice</p>
                                <p className="text-xs text-yellow-300/80">This is a restricted area. All login attempts are monitored and logged.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate('/')}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Adminlogin;
