import React, { useState } from 'react';
import {
    MdBusiness,
    MdEmail,
    MdPhone,
    MdLocationOn,
    MdAccountBalance,
    MdUploadFile,
    MdCheckCircle,
    MdStore,
    MdPerson,
    MdDescription,
    MdCategory
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const SellerRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // Business Information
        businessName: '',
        businessType: '',
        gstNumber: '',
        panNumber: '',

        // Contact Information
        ownerName: '',
        email: '',
        phone: '',
        alternatePhone: '',
        password: '',
        confirmPassword: '',

        // Address Information
        businessAddress: '',
        city: '',
        state: '',
        pincode: '',

        // Bank Details
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        bankName: '',

        // Product Information
        productCategory: '',
        businessDescription: '',

        // License Uploads
        placeLicense: null,
        storageLicense: null,
        productionLicense: null,
    });

    const [previews, setPreviews] = useState({
        placeLicense: null,
        storageLicense: null,
        productionLicense: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, [fieldName]: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [fieldName]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your submission logic here
    };

    const inputClasses = "w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all placeholder:text-gray-400 bg-white hover:border-gray-300";
    const labelClasses = "block text-xs font-semibold text-gray-700 mb-1.5";

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 overflow-hidden">

            <div className="h-full flex flex-col">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 shadow-sm px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                <MdStore className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Seller Registration</h1>
                                <p className="text-xs text-gray-500">Register your business to start selling</p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            ← Back to Home
                        </button>
                    </div>
                </div>


                {/* Form Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-8 py-6">
                    <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Left Column - Business & Contact Info */}
                            <div className="space-y-6">
                                {/* Business Information */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                                        <MdBusiness className="text-orange-600 text-lg" />
                                        <h2 className="text-sm font-bold text-gray-900">Business Information</h2>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className={labelClasses}>Business Name *</label>
                                            <input
                                                type="text"
                                                name="businessName"
                                                value={formData.businessName}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                placeholder="Enter business name"
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
                                                <option value="">Select type</option>
                                                <option value="proprietorship">Proprietorship</option>
                                                <option value="partnership">Partnership</option>
                                                <option value="pvt-ltd">Private Limited</option>
                                                <option value="llp">LLP</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className={labelClasses}>GST Number *</label>
                                            <input
                                                type="text"
                                                name="gstNumber"
                                                value={formData.gstNumber}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                placeholder="22AAAAA0000A1Z5"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>PAN Number *</label>
                                            <input
                                                type="text"
                                                name="panNumber"
                                                value={formData.panNumber}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                placeholder="ABCDE1234F"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                                        <MdPerson className="text-orange-600 text-lg" />
                                        <h2 className="text-sm font-bold text-gray-900">Contact Information</h2>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className={labelClasses}>Owner Name *</label>
                                            <input
                                                type="text"
                                                name="ownerName"
                                                value={formData.ownerName}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                placeholder="Full name"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                placeholder="business@example.com"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>Phone Number *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                placeholder="+91 98765 43210"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>Alternate Phone</label>
                                            <input
                                                type="tel"
                                                name="alternatePhone"
                                                value={formData.alternatePhone}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>Password *</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                placeholder="Create a strong password"
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
                            </div>

                            {/* Middle Column - Address & Bank Details */}
                            <div className="space-y-6">
                                {/* Address Information */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                                        <MdLocationOn className="text-orange-600 text-lg" />
                                        <h2 className="text-sm font-bold text-gray-900">Business Address</h2>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className={labelClasses}>Complete Address *</label>
                                            <textarea
                                                name="businessAddress"
                                                value={formData.businessAddress}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                placeholder="Street, Building, Landmark"
                                                rows="2"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>City *</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                placeholder="City name"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>State *</label>
                                            <select
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                required
                                            >
                                                <option value="">Select state</option>
                                                <option value="TN">Tamil Nadu</option>
                                                <option value="KA">Karnataka</option>
                                                <option value="KL">Kerala</option>
                                                <option value="AP">Andhra Pradesh</option>
                                                <option value="MH">Maharashtra</option>
                                                <option value="DL">Delhi</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className={labelClasses}>Pincode *</label>
                                            <input
                                                type="text"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                placeholder="600001"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Bank Details */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                                        <MdAccountBalance className="text-orange-600 text-lg" />
                                        <h2 className="text-sm font-bold text-gray-900">Bank Details</h2>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className={labelClasses}>Account Holder Name *</label>
                                            <input
                                                type="text"
                                                name="accountHolderName"
                                                value={formData.accountHolderName}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                placeholder="As per bank records"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>Account Number *</label>
                                            <input
                                                type="text"
                                                name="accountNumber"
                                                value={formData.accountNumber}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                placeholder="Enter account number"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>IFSC Code *</label>
                                            <input
                                                type="text"
                                                name="ifscCode"
                                                value={formData.ifscCode}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                placeholder="SBIN0001234"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>Bank Name *</label>
                                            <input
                                                type="text"
                                                name="bankName"
                                                value={formData.bankName}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                placeholder="Bank name"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Product Information */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                                        <MdCategory className="text-orange-600 text-lg" />
                                        <h2 className="text-sm font-bold text-gray-900">Product Information</h2>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className={labelClasses}>Product Category *</label>
                                            <select
                                                name="productCategory"
                                                value={formData.productCategory}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                required
                                            >
                                                <option value="">Select category</option>
                                                <option value="crackers">Crackers & Fireworks</option>
                                                <option value="sparklers">Sparklers</option>
                                                <option value="rockets">Rockets</option>
                                                <option value="ground-chakkars">Ground Chakkars</option>
                                                <option value="gift-boxes">Gift Boxes</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className={labelClasses}>Business Description *</label>
                                            <textarea
                                                name="businessDescription"
                                                value={formData.businessDescription}
                                                onChange={handleInputChange}
                                                className={inputClasses}
                                                placeholder="Describe your business and products"
                                                rows="3"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - License Uploads */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                                        <MdUploadFile className="text-orange-600 text-lg" />
                                        <h2 className="text-sm font-bold text-gray-900">License Documents</h2>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Place License */}
                                        <div>
                                            <label className={labelClasses}>Place License *</label>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    id="placeLicense"
                                                    onChange={(e) => handleFileChange(e, 'placeLicense')}
                                                    className="hidden"
                                                    accept="image/*,.pdf"
                                                    required
                                                />
                                                <label
                                                    htmlFor="placeLicense"
                                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50/50 transition-all"
                                                >
                                                    {previews.placeLicense ? (
                                                        <div className="relative w-full h-full">
                                                            <img
                                                                src={previews.placeLicense}
                                                                alt="Place License"
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                            <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                                                                <MdCheckCircle className="w-4 h-4" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <MdUploadFile className="w-8 h-8 text-gray-400 mb-2" />
                                                            <span className="text-xs text-gray-500">Click to upload</span>
                                                            <span className="text-xs text-gray-400">PDF or Image</span>
                                                        </>
                                                    )}
                                                </label>
                                            </div>
                                        </div>

                                        {/* Storage License */}
                                        <div>
                                            <label className={labelClasses}>Storage License *</label>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    id="storageLicense"
                                                    onChange={(e) => handleFileChange(e, 'storageLicense')}
                                                    className="hidden"
                                                    accept="image/*,.pdf"
                                                    required
                                                />
                                                <label
                                                    htmlFor="storageLicense"
                                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50/50 transition-all"
                                                >
                                                    {previews.storageLicense ? (
                                                        <div className="relative w-full h-full">
                                                            <img
                                                                src={previews.storageLicense}
                                                                alt="Storage License"
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                            <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                                                                <MdCheckCircle className="w-4 h-4" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <MdUploadFile className="w-8 h-8 text-gray-400 mb-2" />
                                                            <span className="text-xs text-gray-500">Click to upload</span>
                                                            <span className="text-xs text-gray-400">PDF or Image</span>
                                                        </>
                                                    )}
                                                </label>
                                            </div>
                                        </div>

                                        {/* Production License */}
                                        <div>
                                            <label className={labelClasses}>Production License *</label>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    id="productionLicense"
                                                    onChange={(e) => handleFileChange(e, 'productionLicense')}
                                                    className="hidden"
                                                    accept="image/*,.pdf"
                                                    required
                                                />
                                                <label
                                                    htmlFor="productionLicense"
                                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50/50 transition-all"
                                                >
                                                    {previews.productionLicense ? (
                                                        <div className="relative w-full h-full">
                                                            <img
                                                                src={previews.productionLicense}
                                                                alt="Production License"
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                            <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                                                                <MdCheckCircle className="w-4 h-4" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <MdUploadFile className="w-8 h-8 text-gray-400 mb-2" />
                                                            <span className="text-xs text-gray-500">Click to upload</span>
                                                            <span className="text-xs text-gray-400">PDF or Image</span>
                                                        </>
                                                    )}
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Important Note */}
                                    <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                        <p className="text-xs text-orange-800">
                                            <strong>Note:</strong> All licenses must be valid and clearly visible. Documents will be verified before approval.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer - Submit Button */}
                <div className="bg-white border-t border-gray-200 px-8 py-4 shadow-lg">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <p className="text-xs text-gray-500">
                            All fields marked with * are mandatory
                        </p>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => navigate('/settings')}
                                className="px-6 py-2.5 bg-white border-2 border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="px-8 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 flex items-center gap-2"
                            >
                                <MdCheckCircle className="w-5 h-5" />
                                Submit Registration
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerRegister;
