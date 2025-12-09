import React, { useState } from 'react';
import { MdStore, MdNotifications, MdSecurity, MdPayment, MdSettings, MdEdit, MdSave, MdCancel } from 'react-icons/md';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBell, FaLock, FaCreditCard } from 'react-icons/fa';

const SellerSettings = () => {
    const [activeTab, setActiveTab] = useState('business');
    const [isEditing, setIsEditing] = useState(false);

    const [businessInfo, setBusinessInfo] = useState({
        businessName: 'Firecracker Emporium',
        ownerName: 'John Doe',
        email: 'john@firecrackers.com',
        phone: '+91 98765 43210',
        gstNumber: '29ABCDE1234F1Z5',
        address: '123 Main Street, Business District',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
    });

    const [notifications, setNotifications] = useState({
        orderUpdates: true,
        newOrders: true,
        lowStock: true,
        kycUpdates: true,
        paymentAlerts: true,
        promotions: false
    });

    const [paymentSettings, setPaymentSettings] = useState({
        bankName: 'State Bank of India',
        accountNumber: '1234567890',
        ifscCode: 'SBIN0001234',
        upiId: 'seller@paytm',
        paymentMethod: 'bank'
    });

    const tabs = [
        { id: 'business', name: 'Business Info', icon: MdStore },
        { id: 'notifications', name: 'Notifications', icon: MdNotifications },
        { id: 'payment', name: 'Payment', icon: MdPayment },
        { id: 'security', name: 'Security', icon: MdSecurity }
    ];

    const handleInputChange = (e, section) => {
        const { name, value, type, checked } = e.target;

        if (section === 'business') {
            setBusinessInfo(prev => ({ ...prev, [name]: value }));
        } else if (section === 'notifications') {
            setNotifications(prev => ({ ...prev, [name]: checked }));
        } else if (section === 'payment') {
            setPaymentSettings(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = () => {
        console.log('Saving settings...');
        setIsEditing(false);
        // Handle save logic
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Seller Settings</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your seller account and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Tabs */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-6">
                        <div className="space-y-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id
                                                ? 'bg-orange-100 text-orange-600'
                                                : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-orange-600' : 'text-gray-500'}`} />
                                        <span className={`font-medium text-sm ${activeTab === tab.id ? 'text-orange-600' : 'text-gray-700'}`}>
                                            {tab.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3">
                    {/* Business Info Tab */}
                    {activeTab === 'business' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-gray-900">Business Information</h2>
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
                                        >
                                            <MdEdit className="w-4 h-4" />
                                            Edit
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSave}
                                                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                                            >
                                                <MdSave className="w-4 h-4" />
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                                            >
                                                <MdCancel className="w-4 h-4" />
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <MdStore className="inline w-4 h-4 mr-1 mb-1" />
                                            Business Name
                                        </label>
                                        <input
                                            type="text"
                                            name="businessName"
                                            value={businessInfo.businessName}
                                            onChange={(e) => handleInputChange(e, 'business')}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all disabled:bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaUser className="inline w-4 h-4 mr-1 mb-1" />
                                            Owner Name
                                        </label>
                                        <input
                                            type="text"
                                            name="ownerName"
                                            value={businessInfo.ownerName}
                                            onChange={(e) => handleInputChange(e, 'business')}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all disabled:bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaEnvelope className="inline w-4 h-4 mr-1 mb-1" />
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={businessInfo.email}
                                            onChange={(e) => handleInputChange(e, 'business')}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all disabled:bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaPhone className="inline w-4 h-4 mr-1 mb-1" />
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={businessInfo.phone}
                                            onChange={(e) => handleInputChange(e, 'business')}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all disabled:bg-gray-50"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            GST Number
                                        </label>
                                        <input
                                            type="text"
                                            name="gstNumber"
                                            value={businessInfo.gstNumber}
                                            onChange={(e) => handleInputChange(e, 'business')}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all disabled:bg-gray-50"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaMapMarkerAlt className="inline w-4 h-4 mr-1 mb-1" />
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={businessInfo.address}
                                            onChange={(e) => handleInputChange(e, 'business')}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all disabled:bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={businessInfo.city}
                                            onChange={(e) => handleInputChange(e, 'business')}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all disabled:bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={businessInfo.state}
                                            onChange={(e) => handleInputChange(e, 'business')}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all disabled:bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={businessInfo.pincode}
                                            onChange={(e) => handleInputChange(e, 'business')}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all disabled:bg-gray-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Notification Preferences</h2>

                            <div className="space-y-4">
                                {Object.entries(notifications).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <FaBell className="w-5 h-5 text-orange-500" />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Receive notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                                </p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name={key}
                                                checked={value}
                                                onChange={(e) => handleInputChange(e, 'notifications')}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Payment Tab */}
                    {activeTab === 'payment' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Payment Settings</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setPaymentSettings(prev => ({ ...prev, paymentMethod: 'bank' }))}
                                            className={`p-4 border-2 rounded-lg transition-all ${paymentSettings.paymentMethod === 'bank'
                                                    ? 'border-orange-500 bg-orange-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <FaCreditCard className={`w-6 h-6 mx-auto mb-2 ${paymentSettings.paymentMethod === 'bank' ? 'text-orange-500' : 'text-gray-400'
                                                }`} />
                                            <p className="text-sm font-medium text-gray-900">Bank Account</p>
                                        </button>
                                        <button
                                            onClick={() => setPaymentSettings(prev => ({ ...prev, paymentMethod: 'upi' }))}
                                            className={`p-4 border-2 rounded-lg transition-all ${paymentSettings.paymentMethod === 'upi'
                                                    ? 'border-orange-500 bg-orange-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <MdPayment className={`w-6 h-6 mx-auto mb-2 ${paymentSettings.paymentMethod === 'upi' ? 'text-orange-500' : 'text-gray-400'
                                                }`} />
                                            <p className="text-sm font-medium text-gray-900">UPI</p>
                                        </button>
                                    </div>
                                </div>

                                {paymentSettings.paymentMethod === 'bank' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                                            <input
                                                type="text"
                                                name="bankName"
                                                value={paymentSettings.bankName}
                                                onChange={(e) => handleInputChange(e, 'payment')}
                                                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                                            <input
                                                type="text"
                                                name="accountNumber"
                                                value={paymentSettings.accountNumber}
                                                onChange={(e) => handleInputChange(e, 'payment')}
                                                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                                            <input
                                                type="text"
                                                name="ifscCode"
                                                value={paymentSettings.ifscCode}
                                                onChange={(e) => handleInputChange(e, 'payment')}
                                                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                )}

                                {paymentSettings.paymentMethod === 'upi' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                                        <input
                                            type="text"
                                            name="upiId"
                                            value={paymentSettings.upiId}
                                            onChange={(e) => handleInputChange(e, 'payment')}
                                            placeholder="yourname@paytm"
                                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                                        />
                                    </div>
                                )}

                                <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30">
                                    Save Payment Settings
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-6">Change Password</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaLock className="inline w-4 h-4 mr-1 mb-1" />
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Enter current password"
                                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaLock className="inline w-4 h-4 mr-1 mb-1" />
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Enter new password"
                                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaLock className="inline w-4 h-4 mr-1 mb-1" />
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Confirm new password"
                                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                                        />
                                    </div>
                                    <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30">
                                        Update Password
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Two-Factor Authentication</h2>
                                <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account</p>
                                <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all">
                                    Enable 2FA
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SellerSettings;
