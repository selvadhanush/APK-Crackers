import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBell, FaLock, FaPalette, FaShoppingBag, FaMapMarkerAlt, FaCreditCard, FaGlobe, FaSave, FaEnvelope, FaPhone, FaKey, FaDownload, FaTrash, FaCheck, FaPlus, FaEdit, FaTimes } from 'react-icons/fa';
import API from '../../api';

const Settings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('account');
    const [settings, setSettings] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
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

    // Fetch addresses when addresses tab is active
    useEffect(() => {
        if (activeTab === 'addresses') {
            fetchAddresses();
        }
    }, [activeTab]);

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

    const handleSave = () => {
        console.log('Settings saved:', settings);
    };

    const tabs = [
        { id: 'account', label: 'Account', icon: FaUser, description: 'Personal information' },
        { id: 'addresses', label: 'Addresses', icon: FaMapMarkerAlt, description: 'Manage delivery addresses' },
        { id: 'notifications', label: 'Notifications', icon: FaBell, description: 'Manage alerts' },
        { id: 'privacy', label: 'Privacy', icon: FaLock, description: 'Security settings' },
        { id: 'preferences', label: 'Preferences', icon: FaPalette, description: 'Customize experience' }
    ];

    const inputClasses = "w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all placeholder:text-gray-400 bg-white hover:border-gray-300";
    const labelClasses = "block text-sm font-semibold text-gray-700 mb-2.5";

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50">
            {/* Enhanced Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <FaUser className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                            <p className="mt-1 text-sm text-gray-500">Manage your account and preferences</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Enhanced Sidebar Navigation */}
                    <div className="lg:w-72 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 space-y-2">
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

                    {/* Enhanced Main Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8">
                                {/* Account Settings */}
                                {activeTab === 'account' && (
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
                                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                                <FaUser className="w-6 h-6 text-orange-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900">Account Information</h2>
                                                <p className="text-sm text-gray-500">Update your personal details and information</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className={labelClasses}>First Name</label>
                                                <input
                                                    type="text"
                                                    value={settings.firstName}
                                                    onChange={(e) => handleChange('firstName', e.target.value)}
                                                    className={inputClasses}
                                                    placeholder="Enter first name"
                                                />
                                            </div>

                                            <div>
                                                <label className={labelClasses}>Last Name</label>
                                                <input
                                                    type="text"
                                                    value={settings.lastName}
                                                    onChange={(e) => handleChange('lastName', e.target.value)}
                                                    className={inputClasses}
                                                    placeholder="Enter last name"
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className={labelClasses}>
                                                    <FaEnvelope className="inline mr-2 text-orange-500" />
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    value={settings.email}
                                                    onChange={(e) => handleChange('email', e.target.value)}
                                                    className={inputClasses}
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
                                                    value={settings.phone}
                                                    onChange={(e) => handleChange('phone', e.target.value)}
                                                    className={inputClasses}
                                                    placeholder="+91 98765 43210"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-gray-100">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                    <FaKey className="w-5 h-5 text-orange-600" />
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900">Password & Security</h3>
                                            </div>
                                            <button className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all shadow-sm hover:shadow">
                                                Change Password
                                            </button>
                                        </div>
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

                                {/* Privacy */}
                                {activeTab === 'privacy' && (
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
                                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                                <FaLock className="w-6 h-6 text-orange-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900">Privacy & Security</h2>
                                                <p className="text-sm text-gray-500">Manage your privacy preferences</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                                                <label className={labelClasses}>
                                                    <FaGlobe className="inline mr-2 text-orange-500" />
                                                    Profile Visibility
                                                </label>
                                                <select
                                                    value={settings.profileVisibility}
                                                    onChange={(e) => handleChange('profileVisibility', e.target.value)}
                                                    className={inputClasses}
                                                >
                                                    <option value="public">🌍 Public - Everyone can see</option>
                                                    <option value="private">🔒 Private - Only you</option>
                                                    <option value="friends">👥 Friends Only</option>
                                                </select>
                                            </div>

                                            {[
                                                { key: 'showPurchaseHistory', title: 'Show Purchase History', desc: 'Allow others to see your purchase history' },
                                                { key: 'dataSharing', title: 'Data Sharing', desc: 'Share data with partners for better experience' }
                                            ].map((item) => (
                                                <div key={item.key} className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-orange-200 transition-all">
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                                        <p className="text-sm text-gray-500">{item.desc}</p>
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
                                            ))}
                                        </div>

                                        <div className="pt-6 border-t border-gray-100">
                                            <h3 className="text-lg font-bold text-gray-900 mb-6">Account Actions</h3>
                                            <div className="flex flex-wrap gap-3">
                                                <button className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all shadow-sm hover:shadow flex items-center gap-2">
                                                    <FaDownload className="w-4 h-4" />
                                                    Download My Data
                                                </button>
                                                <button className="px-6 py-3 bg-gradient-to-r from-red-50 to-red-100 text-red-600 font-semibold rounded-xl hover:from-red-100 hover:to-red-200 transition-all shadow-sm hover:shadow flex items-center gap-2">
                                                    <FaTrash className="w-4 h-4" />
                                                    Delete Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Preferences */}
                                {activeTab === 'preferences' && (
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
                                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                                <FaPalette className="w-6 h-6 text-orange-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900">Preferences</h2>
                                                <p className="text-sm text-gray-500">Customize your experience</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                                                <label className={labelClasses}>
                                                    <FaGlobe className="inline mr-2 text-orange-500" />
                                                    Language
                                                </label>
                                                <select
                                                    value={settings.language}
                                                    onChange={(e) => handleChange('language', e.target.value)}
                                                    className={inputClasses}
                                                >
                                                    <option value="en">🇬🇧 English</option>
                                                    <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
                                                    <option value="ta">🇮🇳 தமிழ் (Tamil)</option>
                                                    <option value="te">🇮🇳 తెలుగు (Telugu)</option>
                                                </select>
                                            </div>

                                            <div className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                                                <label className={labelClasses}>
                                                    <FaCreditCard className="inline mr-2 text-orange-500" />
                                                    Currency
                                                </label>
                                                <select
                                                    value={settings.currency}
                                                    onChange={(e) => handleChange('currency', e.target.value)}
                                                    className={inputClasses}
                                                >
                                                    <option value="INR">₹ INR - Indian Rupee</option>
                                                    <option value="USD">$ USD - US Dollar</option>
                                                    <option value="EUR">€ EUR - Euro</option>
                                                </select>
                                            </div>

                                            <div className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                                                <label className={labelClasses}>Theme Appearance</label>
                                                <div className="grid grid-cols-3 gap-4 mt-4">
                                                    {[
                                                        { value: 'light', label: 'Light', gradient: 'from-white to-gray-100' },
                                                        { value: 'dark', label: 'Dark', gradient: 'from-gray-800 to-gray-900' },
                                                        { value: 'auto', label: 'Auto', gradient: 'from-white via-gray-400 to-gray-800' }
                                                    ].map((theme) => (
                                                        <button
                                                            key={theme.value}
                                                            onClick={() => handleChange('theme', theme.value)}
                                                            className={`p-5 rounded-xl border-2 transition-all ${settings.theme === theme.value
                                                                ? 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-500/20'
                                                                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                                                                }`}
                                                        >
                                                            <div className={`w-full h-16 mx-auto mb-3 bg-gradient-to-br ${theme.gradient} rounded-lg shadow-inner`}></div>
                                                            <span className={`text-sm font-semibold ${settings.theme === theme.value ? 'text-orange-600' : 'text-gray-700'}`}>
                                                                {theme.label}
                                                            </span>
                                                            {settings.theme === theme.value && (
                                                                <FaCheck className="w-4 h-4 text-orange-600 mx-auto mt-2" />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Enhanced Save Button */}
                            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                <p className="text-sm text-gray-500">Changes will be saved to your account</p>
                                <div className="flex gap-3">
                                    <button className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all">
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 flex items-center gap-2"
                                    >
                                        <FaSave className="w-4 h-4" />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
