import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBell, FaLock, FaPalette, FaShoppingBag, FaMapMarkerAlt, FaCreditCard, FaGlobe, FaSave, FaEnvelope, FaPhone, FaKey, FaDownload, FaTrash, FaCheck, FaPlus, FaEdit, FaTimes, FaEye, FaEyeSlash, FaBox } from 'react-icons/fa';
import API from '../../api';
import OrdersPage from './Orderspage';

const Settings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('account');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    // User Data State
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    // Edit Mode State
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editedData, setEditedData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    // Password Change State
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    // Settings State
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        orderUpdates: true,
        promotions: true,
        newsletter: true,
        profileVisibility: 'public',
        showPurchaseHistory: false,
        dataSharing: false,
        language: 'en',
        currency: 'INR',
        theme: 'light'
    });

    // Address Management State
    const [addresses, setAddresses] = useState([]);
    const [loadingAddresses, setLoadingAddresses] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [addressForm, setAddressForm] = useState({
        fullname: '',
        phone: '',
        pincode: '',
        state: '',
        city: '',
        addressLine: '',
        landmark: ''
    });

    // Fetch user data on component mount
    useEffect(() => {
        fetchUserData();
    }, []);

    // Fetch addresses when addresses tab is active
    useEffect(() => {
        if (activeTab === 'addresses') {
            fetchAddresses();
        }
    }, [activeTab]);

    // Update document title based on active tab
    useEffect(() => {
        const tabTitles = {
            'account': 'Account Settings',
            'orders': 'My Orders',
            'addresses': 'My Addresses',
            'notifications': 'Notifications'
        };
        document.title = `${tabTitles[activeTab] || 'Settings'} - APK Crackers`;
    }, [activeTab]);

    // Fetch user profile data
    const fetchUserData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');

            if (!token) {
                navigate('/Login');
                return;
            }

            let response;
            // Fetch profile based on user role
            if (userRole === 'seller') {
                response = await API.get('/seller/profile');
            } else if (userRole === 'admin') {
                // For admin, we'll use the stored user data
                const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    setUserData({
                        name: user.name || user.username || 'Admin',
                        email: user.email || '',
                        phone: user.phone || ''
                    });
                    setEditedData({
                        name: user.name || user.username || 'Admin',
                        email: user.email || '',
                        phone: user.phone || ''
                    });
                }
                setLoading(false);
                return;
            } else {
                // For customer, use stored data
                const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    setUserData({
                        name: user.name || user.username || 'User',
                        email: user.email || '',
                        phone: user.phone || ''
                    });
                    setEditedData({
                        name: user.name || user.username || 'User',
                        email: user.email || '',
                        phone: user.phone || ''
                    });
                }
                setLoading(false);
                return;
            }

            // For seller
            if (response && response.data) {
                const profile = response.data;
                setUserData({
                    name: profile.businessName || profile.name || 'Seller',
                    email: profile.email || '',
                    phone: profile.phone || ''
                });
                setEditedData({
                    name: profile.businessName || profile.name || 'Seller',
                    email: profile.email || '',
                    phone: profile.phone || ''
                });
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('Failed to load user data');
        } finally {
            setLoading(false);
        }
    };

    // Save profile changes
    const handleSaveProfile = async () => {
        try {
            setSaving(true);
            const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');

            // Update based on role
            if (userRole === 'seller') {
                await API.put('/seller/profile', {
                    businessName: editedData.name,
                    email: editedData.email,
                    phone: editedData.phone
                });
            } else {
                // For customer/admin, update local storage
                const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    user.name = editedData.name;
                    user.email = editedData.email;
                    user.phone = editedData.phone;

                    if (localStorage.getItem('user')) {
                        localStorage.setItem('user', JSON.stringify(user));
                    }
                    if (sessionStorage.getItem('user')) {
                        sessionStorage.setItem('user', JSON.stringify(user));
                    }
                }
            }

            setUserData(editedData);
            setIsEditingProfile(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    // Handle password change
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPasswordError('');

        // Validation
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return;
        }

        if (passwordData.oldPassword === passwordData.newPassword) {
            setPasswordError('New password must be different from old password');
            return;
        }

        try {
            setSaving(true);
            const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');

            // Call appropriate password change endpoint based on role
            if (userRole === 'customer') {
                await API.put('/customer/auth/change-password', {
                    oldPassword: passwordData.oldPassword,
                    newPassword: passwordData.newPassword
                });
            } else {
                // For seller and admin, show message that it's not implemented
                setPasswordError('Password change is only available for customers');
                setSaving(false);
                return;
            }

            alert('Password changed successfully!');
            setShowPasswordForm(false);
            setPasswordData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error('Error changing password:', error);
            setPasswordError(error.response?.data?.message || 'Failed to change password. Please check your old password.');
        } finally {
            setSaving(false);
        }
    };

    // Fetch all addresses
    const fetchAddresses = async () => {
        try {
            setLoadingAddresses(true);
            const response = await API.get('/address');
            setAddresses(response.data || []);
        } catch (error) {
            console.error('Error fetching addresses:', error);
            alert('Failed to load addresses');
        } finally {
            setLoadingAddresses(false);
        }
    };

    // Add new address
    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            await API.post('/address', addressForm);
            alert('Address added successfully!');
            setShowAddressForm(false);
            resetAddressForm();
            fetchAddresses();
        } catch (error) {
            console.error('Error adding address:', error);
            alert(error.response?.data?.message || 'Failed to add address');
        }
    };

    // Update address
    const handleUpdateAddress = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/address/${editingAddress}`, addressForm);
            alert('Address updated successfully!');
            setEditingAddress(null);
            setShowAddressForm(false);
            resetAddressForm();
            fetchAddresses();
        } catch (error) {
            console.error('Error updating address:', error);
            alert(error.response?.data?.message || 'Failed to update address');
        }
    };

    // Delete address
    const handleDeleteAddress = async (addressId) => {
        if (!confirm('Are you sure you want to delete this address?')) return;
        try {
            await API.delete(`/address/${addressId}`);
            alert('Address deleted successfully!');
            fetchAddresses();
        } catch (error) {
            console.error('Error deleting address:', error);
            alert(error.response?.data?.message || 'Failed to delete address');
        }
    };

    // Set default address
    const handleSetDefaultAddress = async (addressId) => {
        try {
            await API.put(`/address/default/${addressId}`);
            alert('Default address updated!');
            fetchAddresses();
        } catch (error) {
            console.error('Error setting default address:', error);
            alert(error.response?.data?.message || 'Failed to set default address');
        }
    };

    // Edit address
    const handleEditAddress = (address) => {
        setEditingAddress(address._id);
        setAddressForm({
            fullname: address.fullname,
            phone: address.phone,
            pincode: address.pincode,
            state: address.state,
            city: address.city,
            addressLine: address.addressLine,
            landmark: address.landmark || ''
        });
        setShowAddressForm(true);
    };

    // Reset form
    const resetAddressForm = () => {
        setAddressForm({
            fullname: '',
            phone: '',
            pincode: '',
            state: '',
            city: '',
            addressLine: '',
            landmark: ''
        });
        setEditingAddress(null);
    };

    const handleChange = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveSettings = () => {
        // Save settings to localStorage
        localStorage.setItem('userSettings', JSON.stringify(settings));
        alert('Settings saved successfully!');
    };

    const tabs = [
        { id: 'account', label: 'Account', icon: FaUser, description: 'Personal information' },
        { id: 'orders', label: 'My Orders', icon: FaBox, description: 'Track your orders' },
        { id: 'addresses', label: 'Addresses', icon: FaMapMarkerAlt, description: 'Manage delivery addresses' },
        { id: 'notifications', label: 'Notifications', icon: FaBell, description: 'Manage alerts' }
    ];

    const inputClasses = "w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all placeholder:text-gray-400 bg-white hover:border-gray-300";
    const labelClasses = "block text-sm font-semibold text-gray-700 mb-2.5";

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 flex flex-col">
            {/* Enhanced Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                    <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                            <FaUser className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Settings</h1>
                            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500">Manage your account and preferences</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Tabs - Horizontal Scroll */}
            <div className="lg:hidden bg-white border-b border-gray-200 overflow-x-auto">
                <div className="flex gap-2 p-3 min-w-max">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                <div className="flex w-full">
                    {/* Desktop Sidebar Navigation - Full Height */}
                    <div className="hidden lg:block w-80 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
                        <div className="p-6 space-y-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all group ${activeTab === tab.id
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                                            : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'
                                            } transition-all`}>
                                            <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-600'}`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className={`font-semibold ${activeTab === tab.id ? 'text-white' : 'text-gray-900'}`}>
                                                {tab.label}
                                            </div>
                                            <div className={`text-xs ${activeTab === tab.id ? 'text-white/80' : 'text-gray-500'}`}>
                                                {tab.description}
                                            </div>
                                        </div>
                                        {activeTab === tab.id && (
                                            <FaCheck className="w-4 h-4 text-white" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Enhanced Main Content - Full Height */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="bg-white h-full">
                            <div className="p-4 sm:p-6 lg:p-8">
                                {/* Account Settings */}
                                {activeTab === 'account' && (
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-2 sm:gap-3 pb-4 sm:pb-6 border-b border-gray-100">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                                                <FaUser className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Account Information</h2>
                                                <p className="text-xs sm:text-sm text-gray-500">Update your personal details and information</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 sm:gap-6">
                                            <div>
                                                <label className={labelClasses}>
                                                    <FaUser className="inline mr-2 text-orange-500" />
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={isEditingProfile ? editedData.name : userData.name}
                                                    onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                                    disabled={!isEditingProfile}
                                                    className={`${inputClasses} ${!isEditingProfile ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                                                    placeholder="Enter your name"
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className={labelClasses}>
                                                    <FaEnvelope className="inline mr-2 text-orange-500" />
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    value={isEditingProfile ? editedData.email : userData.email}
                                                    onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                                                    disabled={!isEditingProfile}
                                                    className={`${inputClasses} ${!isEditingProfile ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                                                    placeholder="your.email@example.com"
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className={labelClasses}>
                                                    <FaPhone className="inline mr-2 text-orange-500" />
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={isEditingProfile ? editedData.phone : userData.phone}
                                                    onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                                                    disabled={!isEditingProfile}
                                                    className={`${inputClasses} ${!isEditingProfile ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                                                    placeholder="+91 98765 43210"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                            {!isEditingProfile ? (
                                                <button
                                                    onClick={() => setIsEditingProfile(true)}
                                                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
                                                >
                                                    <FaEdit className="inline mr-2" />
                                                    Edit Profile
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={handleSaveProfile}
                                                        disabled={saving}
                                                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30 disabled:opacity-50"
                                                    >
                                                        <FaSave className="inline mr-2" />
                                                        {saving ? 'Saving...' : 'Save Changes'}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIsEditingProfile(false);
                                                            setEditedData(userData);
                                                        }}
                                                        className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        {/* Password Section */}
                                        <div className="pt-6 border-t border-gray-100">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                    <FaKey className="w-5 h-5 text-orange-600" />
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900">Password & Security</h3>
                                            </div>

                                            {!showPasswordForm ? (
                                                <button
                                                    onClick={() => setShowPasswordForm(true)}
                                                    className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all shadow-sm hover:shadow"
                                                >
                                                    <FaLock className="inline mr-2" />
                                                    Change Password
                                                </button>
                                            ) : (
                                                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <h4 className="text-xl font-bold text-gray-900">Change Password</h4>
                                                        <button
                                                            onClick={() => {
                                                                setShowPasswordForm(false);
                                                                setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
                                                                setPasswordError('');
                                                            }}
                                                            className="p-2 hover:bg-white rounded-lg transition-all"
                                                        >
                                                            <FaTimes className="w-5 h-5 text-gray-600" />
                                                        </button>
                                                    </div>

                                                    <form onSubmit={handleChangePassword} className="space-y-6">
                                                        {passwordError && (
                                                            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 font-medium">
                                                                {passwordError}
                                                            </div>
                                                        )}

                                                        <div>
                                                            <label className={labelClasses}>Old Password</label>
                                                            <div className="relative">
                                                                <input
                                                                    type={showOldPassword ? "text" : "password"}
                                                                    value={passwordData.oldPassword}
                                                                    onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                                                    className={inputClasses}
                                                                    placeholder="Enter old password"
                                                                    required
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                                >
                                                                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className={labelClasses}>New Password</label>
                                                            <div className="relative">
                                                                <input
                                                                    type={showNewPassword ? "text" : "password"}
                                                                    value={passwordData.newPassword}
                                                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                                    className={inputClasses}
                                                                    placeholder="Enter new password"
                                                                    required
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                                >
                                                                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className={labelClasses}>Confirm New Password</label>
                                                            <div className="relative">
                                                                <input
                                                                    type={showConfirmPassword ? "text" : "password"}
                                                                    value={passwordData.confirmPassword}
                                                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                                    className={inputClasses}
                                                                    placeholder="Confirm new password"
                                                                    required
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                                >
                                                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-3 pt-4">
                                                            <button
                                                                type="submit"
                                                                disabled={saving}
                                                                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 disabled:opacity-50"
                                                            >
                                                                {saving ? 'Changing...' : 'Change Password'}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setShowPasswordForm(false);
                                                                    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
                                                                    setPasswordError('');
                                                                }}
                                                                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* My Orders */}
                                {activeTab === 'orders' && (
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
                                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                                <FaBox className="w-6 h-6 text-orange-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
                                                <p className="text-sm text-gray-500">Track and manage your orders</p>
                                            </div>
                                        </div>

                                        <OrdersPage />
                                    </div>
                                )}

                                {/* Address Management */}
                                {activeTab === 'addresses' && (
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                                    <FaMapMarkerAlt className="w-6 h-6 text-orange-600" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-gray-900">Delivery Addresses</h2>
                                                    <p className="text-sm text-gray-500">Manage your saved addresses</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    resetAddressForm();
                                                    setShowAddressForm(true);
                                                }}
                                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 flex items-center gap-2"
                                            >
                                                <FaPlus className="w-4 h-4" />
                                                Add New Address
                                            </button>
                                        </div>

                                        {/* Address Form */}
                                        {showAddressForm && (
                                            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200">
                                                <div className="flex items-center justify-between mb-6">
                                                    <h3 className="text-xl font-bold text-gray-900">
                                                        {editingAddress ? 'Edit Address' : 'Add New Address'}
                                                    </h3>
                                                    <button
                                                        onClick={() => {
                                                            setShowAddressForm(false);
                                                            resetAddressForm();
                                                        }}
                                                        className="p-2 hover:bg-white rounded-lg transition-all"
                                                    >
                                                        <FaTimes className="w-5 h-5 text-gray-600" />
                                                    </button>
                                                </div>

                                                <form onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress} className="space-y-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <label className={labelClasses}>Full Name</label>
                                                            <input
                                                                type="text"
                                                                value={addressForm.fullname}
                                                                onChange={(e) => setAddressForm({ ...addressForm, fullname: e.target.value })}
                                                                className={inputClasses}
                                                                placeholder="Enter full name"
                                                                required
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className={labelClasses}>Phone Number</label>
                                                            <input
                                                                type="tel"
                                                                value={addressForm.phone}
                                                                onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                                                                className={inputClasses}
                                                                placeholder="+91 98765 43210"
                                                                required
                                                            />
                                                        </div>

                                                        <div className="md:col-span-2">
                                                            <label className={labelClasses}>Address Line</label>
                                                            <input
                                                                type="text"
                                                                value={addressForm.addressLine}
                                                                onChange={(e) => setAddressForm({ ...addressForm, addressLine: e.target.value })}
                                                                className={inputClasses}
                                                                placeholder="House No., Building Name, Street"
                                                                required
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className={labelClasses}>Landmark (Optional)</label>
                                                            <input
                                                                type="text"
                                                                value={addressForm.landmark}
                                                                onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                                                                className={inputClasses}
                                                                placeholder="Near..."
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className={labelClasses}>City</label>
                                                            <input
                                                                type="text"
                                                                value={addressForm.city}
                                                                onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                                                className={inputClasses}
                                                                placeholder="City"
                                                                required
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className={labelClasses}>State</label>
                                                            <input
                                                                type="text"
                                                                value={addressForm.state}
                                                                onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                                                className={inputClasses}
                                                                placeholder="State"
                                                                required
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className={labelClasses}>PIN Code</label>
                                                            <input
                                                                type="text"
                                                                value={addressForm.pincode}
                                                                onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                                                                className={inputClasses}
                                                                placeholder="600001"
                                                                pattern="[0-9]{6}"
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-3 pt-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setShowAddressForm(false);
                                                                resetAddressForm();
                                                            }}
                                                            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
                                                        >
                                                            <FaSave className="inline mr-2" />
                                                            {editingAddress ? 'Update Address' : 'Save Address'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        )}

                                        {/* Address List */}
                                        {loadingAddresses ? (
                                            <div className="flex items-center justify-center py-12">
                                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                                            </div>
                                        ) : addresses.length === 0 ? (
                                            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                                                <FaMapMarkerAlt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No addresses saved</h3>
                                                <p className="text-gray-600 mb-6">Add your first delivery address to get started</p>
                                                <button
                                                    onClick={() => {
                                                        resetAddressForm();
                                                        setShowAddressForm(true);
                                                    }}
                                                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
                                                >
                                                    <FaPlus className="inline mr-2" />
                                                    Add Address
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {addresses.map((address) => (
                                                    <div
                                                        key={address._id}
                                                        className={`p-6 rounded-2xl border-2 transition-all ${address.isDefault
                                                            ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50 shadow-lg shadow-orange-500/20'
                                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                                            }`}
                                                    >
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${address.isDefault ? 'bg-orange-500' : 'bg-gray-100'
                                                                    }`}>
                                                                    <FaMapMarkerAlt className={`w-5 h-5 ${address.isDefault ? 'text-white' : 'text-gray-600'
                                                                        }`} />
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-bold text-gray-900">{address.fullname}</h4>
                                                                    {address.isDefault && (
                                                                        <span className="inline-block px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded mt-1">
                                                                            Default
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2 mb-4 text-sm text-gray-700">
                                                            <p>{address.addressLine}</p>
                                                            {address.landmark && <p className="text-gray-600">Landmark: {address.landmark}</p>}
                                                            <p>{address.city}, {address.state} - {address.pincode}</p>
                                                            <p className="font-semibold">Phone: {address.phone}</p>
                                                        </div>

                                                        <div className="flex gap-2 pt-4 border-t border-gray-200">
                                                            {!address.isDefault && (
                                                                <button
                                                                    onClick={() => handleSetDefaultAddress(address._id)}
                                                                    className="flex-1 px-4 py-2 bg-orange-100 text-orange-600 font-semibold rounded-lg hover:bg-orange-200 transition-all text-sm"
                                                                >
                                                                    <FaCheck className="inline mr-1" />
                                                                    Set Default
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleEditAddress(address)}
                                                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all text-sm"
                                                            >
                                                                <FaEdit className="inline mr-1" />
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteAddress(address._id)}
                                                                className="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-all text-sm"
                                                            >
                                                                <FaTrash className="inline" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Notifications */}
                                {activeTab === 'notifications' && (
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
                                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                                <FaBell className="w-6 h-6 text-orange-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900">Notification Preferences</h2>
                                                <p className="text-sm text-gray-500">Choose how you want to be notified</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {[
                                                { key: 'emailNotifications', title: 'Email Notifications', desc: 'Receive notifications via email', icon: FaEnvelope },
                                                { key: 'smsNotifications', title: 'SMS Notifications', desc: 'Receive notifications via SMS', icon: FaPhone },
                                                { key: 'orderUpdates', title: 'Order Updates', desc: 'Get updates about your orders', icon: FaShoppingBag },
                                                { key: 'promotions', title: 'Promotions & Offers', desc: 'Receive exclusive deals and offers', icon: FaGlobe },
                                                { key: 'newsletter', title: 'Newsletter', desc: 'Stay updated with our newsletter', icon: FaBell }
                                            ].map((item) => {
                                                const ItemIcon = item.icon;
                                                return (
                                                    <div key={item.key} className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-orange-200 transition-all group">
                                                        <div className="flex items-center gap-4 flex-1">
                                                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow transition-all">
                                                                <ItemIcon className="w-5 h-5 text-orange-500" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                                                <p className="text-sm text-gray-500">{item.desc}</p>
                                                            </div>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={settings[item.key]}
                                                                onChange={(e) => handleChange(item.key, e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-orange-600 shadow-inner"></div>
                                                        </label>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}




                            </div>

                            {/* Enhanced Save Button */}
                            {activeTab === 'notifications' && (
                                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                    <p className="text-sm text-gray-500">Changes will be saved to your account</p>
                                    <button
                                        onClick={handleSaveSettings}
                                        className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 flex items-center gap-2"
                                    >
                                        <FaSave className="w-4 h-4" />
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
