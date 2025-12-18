import React, { useState, useEffect } from 'react';
import { MdUploadFile, MdCheckCircle, MdCancel, MdPending, MdWarning, MdClose } from 'react-icons/md';
import { FaIdCard, FaFileAlt, FaStore, FaFire, FaUniversity } from 'react-icons/fa';
import API from '../../../../api';

const KycVerify = () => {
    const [formData, setFormData] = useState({
        // Identity Documents
        aadhaarFront: null,
        aadhaarBack: null,
        panCard: null,
        // Business Documents
        tradeLicense: null,
        gstCertificate: null,
        // Explosive License
        licenseType: '',
        licenseNumber: '',
        licenseImage: null,
        expiryDate: '',
        // Fire NOC
        fireNOC: null,
        fireNOCExpiry: '',
        // Bank Details
        bankAccountNumber: '',
        ifsc: '',
        chequeImage: null
    });

    const [previews, setPreviews] = useState({});
    const [loading, setLoading] = useState(false);
    const [fetchingKyc, setFetchingKyc] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [kycStatus, setKycStatus] = useState('not_submitted');
    const [existingKycData, setExistingKycData] = useState(null);

    useEffect(() => {
        loadKycStatus();
    }, []);

    const loadKycStatus = async () => {
        try {
            setFetchingKyc(true);

            // Try to fetch existing KYC data from backend
            const response = await API.get('/seller/kyc/status');

            if (response.data.kyc) {
                const kycData = response.data.kyc;
                setKycStatus(kycData.status || 'not_submitted');
                setExistingKycData(kycData);

                // Update user data in storage
                const user = sessionStorage.getItem('user') || localStorage.getItem('user');
                if (user) {
                    const userData = JSON.parse(user);
                    userData.kycStatus = kycData.status;

                    // Update both storages
                    if (sessionStorage.getItem('user')) {
                        sessionStorage.setItem('user', JSON.stringify(userData));
                    }
                    if (localStorage.getItem('user')) {
                        localStorage.setItem('user', JSON.stringify(userData));
                    }
                }
            } else {
                // No KYC data found, check local storage
                const user = sessionStorage.getItem('user') || localStorage.getItem('user');
                if (user) {
                    const userData = JSON.parse(user);
                    setKycStatus(userData.kycStatus || 'not_submitted');
                }
            }
        } catch (error) {
            console.error('Error fetching KYC status:', error);
            // Fallback to localStorage/sessionStorage
            const user = sessionStorage.getItem('user') || localStorage.getItem('user');
            if (user) {
                try {
                    const userData = JSON.parse(user);
                    setKycStatus(userData.kycStatus || 'not_submitted');
                } catch (parseError) {
                    console.error('Error parsing user data:', parseError);
                }
            }
        } finally {
            setFetchingKyc(false);
        }
    };

    const documentSections = [
        {
            title: 'Identity Documents',
            icon: FaIdCard,
            fields: [
                { key: 'aadhaarFront', label: 'Aadhaar Card (Front)', required: true },
                { key: 'aadhaarBack', label: 'Aadhaar Card (Back)', required: true },
                { key: 'panCard', label: 'PAN Card', required: true }
            ]
        },
        {
            title: 'Business Documents',
            icon: FaStore,
            fields: [
                { key: 'tradeLicense', label: 'Trade License', required: true },
                { key: 'gstCertificate', label: 'GST Certificate', required: true }
            ]
        },
        {
            title: 'Explosive License',
            icon: FaFire,
            fields: [
                { key: 'licenseImage', label: 'License Document', required: true, isFile: true }
            ],
            textFields: [
                { key: 'licenseType', label: 'License Type', type: 'text', placeholder: 'e.g., Manufacturing, Storage, Sale' },
                { key: 'licenseNumber', label: 'License Number', type: 'text', placeholder: 'Enter license number' },
                { key: 'expiryDate', label: 'Expiry Date', type: 'date' }
            ]
        },
        {
            title: 'Fire NOC',
            icon: FaFire,
            fields: [
                { key: 'fireNOC', label: 'Fire NOC Document', required: true, isFile: true }
            ],
            textFields: [
                { key: 'fireNOCExpiry', label: 'NOC Expiry Date', type: 'date' }
            ]
        },
        {
            title: 'Bank Details',
            icon: FaUniversity,
            fields: [
                { key: 'chequeImage', label: 'Cancelled Cheque', required: true, isFile: true }
            ],
            textFields: [
                { key: 'bankAccountNumber', label: 'Account Number', type: 'text', placeholder: 'Enter account number' },
                { key: 'ifsc', label: 'IFSC Code', type: 'text', placeholder: 'Enter IFSC code' }
            ]
        }
    ];

    const handleFileChange = (key, file) => {
        if (file) {
            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError(`${key}: File size must be less than 5MB`);
                return;
            }

            setFormData(prev => ({ ...prev, [key]: file }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [key]: reader.result }));
            };
            reader.readAsDataURL(file);
            setError('');
        }
    };

    const handleTextChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleRemoveFile = (key) => {
        setFormData(prev => ({ ...prev, [key]: null }));
        setPreviews(prev => {
            const newPreviews = { ...prev };
            delete newPreviews[key];
            return newPreviews;
        });
    };

    const validateForm = () => {
        // Check required files
        const requiredFiles = [
            'aadhaarFront', 'aadhaarBack', 'panCard',
            'tradeLicense', 'gstCertificate',
            'licenseImage', 'fireNOC', 'chequeImage'
        ];

        for (const field of requiredFiles) {
            if (!formData[field]) {
                setError(`Please upload ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return false;
            }
        }

        // Check required text fields
        if (!formData.licenseType || !formData.licenseNumber) {
            setError('Please fill in all explosive license details');
            return false;
        }

        if (!formData.bankAccountNumber || !formData.ifsc) {
            setError('Please fill in all bank details');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const submitData = new FormData();

            // Append files
            Object.keys(formData).forEach(key => {
                if (formData[key] instanceof File) {
                    submitData.append(key, formData[key]);
                } else if (formData[key] && typeof formData[key] === 'string') {
                    submitData.append(key, formData[key]);
                }
            });

            const response = await API.post('/seller/kyc/upload', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccess('KYC documents submitted successfully! Your application is under review.');
            setKycStatus('pending_review');

            // Update both localStorage and sessionStorage
            const user = sessionStorage.getItem('user') || localStorage.getItem('user');
            if (user) {
                const userData = JSON.parse(user);
                userData.kycStatus = 'pending_review';

                if (sessionStorage.getItem('user')) {
                    sessionStorage.setItem('user', JSON.stringify(userData));
                }
                if (localStorage.getItem('user')) {
                    localStorage.setItem('user', JSON.stringify(userData));
                }
            }

        } catch (err) {
            console.error('KYC submission error:', err);
            setError(err.response?.data?.message || 'Failed to submit KYC documents. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusInfo = () => {
        const statusConfig = {
            'not_submitted': {
                color: 'text-gray-600',
                bgColor: 'bg-gray-100',
                icon: MdWarning,
                label: 'Not Submitted',
                message: 'Please upload all required documents to complete your KYC verification.'
            },
            'pending_review': {
                color: 'text-orange-600',
                bgColor: 'bg-orange-100',
                icon: MdPending,
                label: 'Pending Review',
                message: 'Your documents are under review. This process typically takes 2-3 business days.'
            },
            'approved': {
                color: 'text-green-600',
                bgColor: 'bg-green-100',
                icon: MdCheckCircle,
                label: 'Approved',
                message: 'Your KYC is approved! You can now add products to your store.'
            },
            'rejected': {
                color: 'text-red-600',
                bgColor: 'bg-red-100',
                icon: MdCancel,
                label: 'Rejected',
                message: 'Your KYC was rejected. Please re-upload valid documents.'
            },
            'license_expired': {
                color: 'text-orange-600',
                bgColor: 'bg-orange-100',
                icon: MdWarning,
                label: 'License Expired',
                message: 'Your license has expired. Please upload renewed documents.'
            }
        };
        return statusConfig[kycStatus] || statusConfig['not_submitted'];
    };

    const statusInfo = getStatusInfo();
    const StatusIcon = statusInfo.icon;

    // Show loading state while fetching KYC data
    if (fetchingKyc) {
        return (
            <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading KYC status...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">KYC Verification</h1>
                <p className="text-sm text-gray-500 mt-1">Complete your KYC verification to start selling</p>
            </div>

            {/* Success/Error Messages */}
            {success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    <p className="text-sm font-medium">{success}</p>
                </div>
            )}

            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            {/* KYC Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${statusInfo.bgColor}`}>
                        <StatusIcon className={`w-8 h-8 ${statusInfo.color}`} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">KYC Status</h2>
                        <p className={`text-sm font-semibold ${statusInfo.color}`}>
                            {statusInfo.label}
                        </p>
                    </div>
                </div>
                <div className={`p-4 rounded-lg border ${statusInfo.bgColor.replace('100', '50')} border-${statusInfo.color.split('-')[1]}-200`}>
                    <p className="text-sm">{statusInfo.message}</p>
                </div>
            </div>

            {/* KYC Form */}
            <form onSubmit={handleSubmit}>
                {documentSections.map((section, sectionIndex) => {
                    const SectionIcon = section.icon;
                    return (
                        <div key={sectionIndex} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <SectionIcon className="w-5 h-5 text-orange-600" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                            </div>

                            {/* Text Fields */}
                            {section.textFields && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {section.textFields.map(field => (
                                        <div key={field.key}>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {field.label} {field.required && <span className="text-red-500">*</span>}
                                            </label>
                                            <input
                                                type={field.type}
                                                value={formData[field.key] || ''}
                                                onChange={(e) => handleTextChange(field.key, e.target.value)}
                                                placeholder={field.placeholder}
                                                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* File Upload Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {section.fields.map(field => (
                                    <div key={field.key}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {field.label} {field.required && <span className="text-red-500">*</span>}
                                        </label>
                                        {!previews[field.key] ? (
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-500 transition-colors cursor-pointer">
                                                <input
                                                    type="file"
                                                    accept="image/*,.pdf"
                                                    onChange={(e) => handleFileChange(field.key, e.target.files[0])}
                                                    className="hidden"
                                                    id={`upload-${field.key}`}
                                                />
                                                <label htmlFor={`upload-${field.key}`} className="cursor-pointer">
                                                    <MdUploadFile className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                    <p className="text-xs text-gray-600">Click to upload</p>
                                                    <p className="text-xs text-gray-400">PNG, JPG, PDF (Max 5MB)</p>
                                                </label>
                                            </div>
                                        ) : (
                                            <div className="relative">
                                                <img
                                                    src={previews[field.key]}
                                                    alt={field.label}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveFile(field.key)}
                                                    className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                >
                                                    <MdClose className="w-3 h-3" />
                                                </button>
                                                <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
                                                    ✓ Uploaded
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {/* Submit Button */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-gray-900">Ready to Submit?</h3>
                            <p className="text-sm text-gray-500">Make sure all required documents are uploaded</p>
                        </div>
                        <button
                            type="submit"
                            disabled={loading || kycStatus === 'pending_review' || kycStatus === 'approved'}
                            className={`px-6 py-3 text-white font-semibold rounded-lg transition-all shadow-lg flex items-center gap-2 ${loading || kycStatus === 'pending_review' || kycStatus === 'approved'
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/30'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Submitting...
                                </>
                            ) : kycStatus === 'approved' ? (
                                <>
                                    <MdCheckCircle className="w-5 h-5" />
                                    Already Approved
                                </>
                            ) : kycStatus === 'pending_review' ? (
                                <>
                                    <MdPending className="w-5 h-5" />
                                    Under Review
                                </>
                            ) : (
                                <>
                                    <MdUploadFile className="w-5 h-5" />
                                    Submit for Verification
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default KycVerify;
