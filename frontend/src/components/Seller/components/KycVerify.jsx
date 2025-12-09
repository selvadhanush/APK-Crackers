import React, { useState } from 'react';
import { MdUploadFile, MdCheckCircle, MdCancel, MdPending, MdWarning, MdClose } from 'react-icons/md';
import { FaIdCard, FaFileAlt, FaStore } from 'react-icons/fa';

const KycVerify = () => {
    const [documents, setDocuments] = useState({
        aadhar: { file: null, status: 'pending', preview: null },
        pan: { file: null, status: 'pending', preview: null },
        gst: { file: null, status: 'pending', preview: null },
        placeOfBusiness: { file: null, status: 'verified', preview: null },
        storageLicense: { file: null, status: 'rejected', preview: null },
        productionLicense: { file: null, status: 'pending', preview: null }
    });

    const [kycStatus, setKycStatus] = useState('pending'); // pending, verified, rejected

    const documentTypes = [
        {
            key: 'aadhar',
            name: 'Aadhar Card',
            icon: FaIdCard,
            description: 'Upload front and back of Aadhar card',
            required: true
        },
        {
            key: 'pan',
            name: 'PAN Card',
            icon: FaIdCard,
            description: 'Upload PAN card for tax verification',
            required: true
        },
        {
            key: 'gst',
            name: 'GST Certificate',
            icon: FaFileAlt,
            description: 'Upload GST registration certificate',
            required: true
        },
        {
            key: 'placeOfBusiness',
            name: 'Place of Business License',
            icon: FaStore,
            description: 'Upload business place license',
            required: true
        },
        {
            key: 'storageLicense',
            name: 'Storage License',
            icon: FaFileAlt,
            description: 'Upload storage facility license',
            required: true
        },
        {
            key: 'productionLicense',
            name: 'Production License',
            icon: FaFileAlt,
            description: 'Upload production license',
            required: true
        }
    ];

    const handleFileUpload = (key, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDocuments(prev => ({
                    ...prev,
                    [key]: {
                        file: file,
                        status: 'pending',
                        preview: reader.result
                    }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveFile = (key) => {
        setDocuments(prev => ({
            ...prev,
            [key]: {
                file: null,
                status: 'pending',
                preview: null
            }
        }));
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'verified':
                return <MdCheckCircle className="w-5 h-5 text-green-600" />;
            case 'rejected':
                return <MdCancel className="w-5 h-5 text-red-600" />;
            case 'pending':
                return <MdPending className="w-5 h-5 text-orange-600" />;
            default:
                return <MdWarning className="w-5 h-5 text-gray-400" />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'verified':
                return 'Verified';
            case 'rejected':
                return 'Rejected';
            case 'pending':
                return 'Pending Review';
            default:
                return 'Not Uploaded';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'verified':
                return 'bg-green-100 text-green-700';
            case 'rejected':
                return 'bg-red-100 text-red-700';
            case 'pending':
                return 'bg-orange-100 text-orange-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const handleSubmit = () => {
        console.log('Submitting KYC documents:', documents);
        // Handle KYC submission
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">KYC Verification</h1>
                <p className="text-sm text-gray-500 mt-1">Complete your KYC verification to start selling</p>
            </div>

            {/* KYC Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${kycStatus === 'verified' ? 'bg-green-100' :
                                kycStatus === 'rejected' ? 'bg-red-100' :
                                    'bg-orange-100'
                            }`}>
                            {getStatusIcon(kycStatus)}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">KYC Status</h2>
                            <p className={`text-sm font-semibold ${kycStatus === 'verified' ? 'text-green-600' :
                                    kycStatus === 'rejected' ? 'text-red-600' :
                                        'text-orange-600'
                                }`}>
                                {getStatusText(kycStatus)}
                            </p>
                        </div>
                    </div>

                    {kycStatus === 'rejected' && (
                        <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all">
                            Re-upload Documents
                        </button>
                    )}
                </div>

                {kycStatus === 'pending' && (
                    <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-sm text-orange-800">
                            <MdWarning className="inline w-4 h-4 mr-1 mb-1" />
                            Your documents are under review. This process typically takes 2-3 business days.
                        </p>
                    </div>
                )}

                {kycStatus === 'rejected' && (
                    <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-sm text-red-800 font-semibold mb-2">
                            <MdCancel className="inline w-4 h-4 mr-1" />
                            Your KYC verification was rejected
                        </p>
                        <p className="text-sm text-red-700">
                            Reason: Storage License document is unclear. Please upload a clear, high-quality image of your storage license.
                        </p>
                    </div>
                )}
            </div>

            {/* Document Upload Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {documentTypes.map((docType) => {
                    const doc = documents[docType.key];
                    const Icon = docType.icon;

                    return (
                        <div key={docType.key} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            {/* Document Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">
                                            {docType.name}
                                            {docType.required && <span className="text-red-500 ml-1">*</span>}
                                        </h3>
                                        <p className="text-xs text-gray-500">{docType.description}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(doc.status)}`}>
                                    {getStatusIcon(doc.status)}
                                    {getStatusText(doc.status)}
                                </span>
                            </div>

                            {/* Upload Area */}
                            {!doc.preview ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        onChange={(e) => handleFileUpload(docType.key, e)}
                                        className="hidden"
                                        id={`upload-${docType.key}`}
                                    />
                                    <label htmlFor={`upload-${docType.key}`} className="cursor-pointer">
                                        <MdUploadFile className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600 mb-1">Click to upload</p>
                                        <p className="text-xs text-gray-400">PNG, JPG, PDF up to 5MB</p>
                                    </label>
                                </div>
                            ) : (
                                <div className="relative">
                                    {doc.file?.type?.startsWith('image/') ? (
                                        <img
                                            src={doc.preview}
                                            alt={docType.name}
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <FaFileAlt className="w-12 h-12 text-gray-400" />
                                        </div>
                                    )}
                                    <button
                                        onClick={() => handleRemoveFile(docType.key)}
                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        <MdClose className="w-4 h-4" />
                                    </button>
                                    <div className="absolute bottom-2 left-2 px-3 py-1 bg-black/70 text-white text-xs rounded-lg">
                                        {doc.file?.name}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Document Checklist */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Document Checklist</h2>

                <div className="space-y-3">
                    {documentTypes.map((docType) => {
                        const doc = documents[docType.key];
                        return (
                            <div key={docType.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    {getStatusIcon(doc.status)}
                                    <span className="text-sm font-medium text-gray-900">{docType.name}</span>
                                </div>
                                <span className={`text-xs font-semibold ${doc.status === 'verified' ? 'text-green-600' :
                                        doc.status === 'rejected' ? 'text-red-600' :
                                            doc.status === 'pending' ? 'text-orange-600' :
                                                'text-gray-500'
                                    }`}>
                                    {getStatusText(doc.status)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Submit Button */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-gray-900">Ready to Submit?</h3>
                        <p className="text-sm text-gray-500">Make sure all required documents are uploaded</p>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
                    >
                        Submit for Verification
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KycVerify;
