import React, { useState, useEffect } from 'react';
import { MdPerson, MdEmail, MdPhone, MdBusiness, MdLocationOn, MdEdit } from 'react-icons/md';

const SellerProfile = () => {
    const [sellerData, setSellerData] = useState({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        businessType: '',
        businessAddress: '',
        kycStatus: 'not_submitted'
    });

    useEffect(() => {
        // Load seller data from sessionStorage (priority) or localStorage
        const user = sessionStorage.getItem('user') || localStorage.getItem('user');
        if (user) {
            try {
                const userData = JSON.parse(user);
                console.log('Loaded seller data:', userData); // Debug log
                setSellerData({
                    name: userData.name || '',
                    email: userData.email || '',
                    phone: userData.phone || '',
                    businessName: userData.businessName || '',
                    businessType: userData.businessType || '',
                    businessAddress: userData.businessAddress || '',
                    kycStatus: userData.kycStatus || 'not_submitted'
                });
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        } else {
            console.warn('No seller data found in storage');
        }
    }, []);

    const getKycStatusBadge = (status) => {
        const statusConfig = {
            'not_submitted': { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Not Submitted' },
            'pending_review': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending Review' },
            'approved': { bg: 'bg-green-100', text: 'text-green-700', label: 'Approved' },
            'rejected': { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejected' },
            'license_expired': { bg: 'bg-orange-100', text: 'text-orange-700', label: 'License Expired' }
        };

        const config = statusConfig[status] || statusConfig['not_submitted'];
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    return (
        <div className="flex-1 bg-gray-50 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
                    <p className="text-gray-600">Manage your seller account information</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <MdPerson className="w-12 h-12 text-orange-600" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-white mb-1">{sellerData.name}</h2>
                                <p className="text-orange-100 mb-3">{sellerData.email}</p>
                                {getKycStatusBadge(sellerData.kycStatus)}
                            </div>
                            <button className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-all flex items-center gap-2">
                                <MdEdit className="w-5 h-5" />
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                                    Personal Information
                                </h3>

                                <div className="flex items-start gap-3">
                                    <MdPerson className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Full Name</p>
                                        <p className="text-sm font-medium text-gray-900">{sellerData.name || 'Not provided'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MdEmail className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Email Address</p>
                                        <p className="text-sm font-medium text-gray-900">{sellerData.email || 'Not provided'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MdPhone className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                                        <p className="text-sm font-medium text-gray-900">{sellerData.phone || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Business Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                                    Business Information
                                </h3>

                                <div className="flex items-start gap-3">
                                    <MdBusiness className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Business Name</p>
                                        <p className="text-sm font-medium text-gray-900">{sellerData.businessName || 'Not provided'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MdBusiness className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Business Type</p>
                                        <p className="text-sm font-medium text-gray-900 capitalize">
                                            {sellerData.businessType || 'Not provided'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MdLocationOn className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Business Address</p>
                                        <p className="text-sm font-medium text-gray-900">{sellerData.businessAddress || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* KYC Status Info */}
                        {sellerData.kycStatus === 'not_submitted' && (
                            <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                <p className="text-sm text-orange-800">
                                    <strong>Action Required:</strong> Complete your KYC verification to start selling products.
                                    Go to <strong>KYC Verification</strong> from the sidebar to submit your documents.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerProfile;
