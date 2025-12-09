import React, { useState } from 'react';
import { MdUploadFile, MdClose, MdCheckCircle, MdVolumeUp } from 'react-icons/md';
import { FaStar, FaBolt } from 'react-icons/fa';
import { GiThunderStruck } from 'react-icons/gi';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        productName: '',
        price: '',
        age: '',
        rating: '',
        description: '',
        tags: [],
        soundTags: [], // sound, thunder, blast
        image: null
    });

    const [imagePreview, setImagePreview] = useState(null);

    const tagOptions = ['Eco-Friendly', 'Green Crackers', 'Premium', 'Best Seller', 'New Arrival', 'Limited Edition'];
    const soundTagOptions = [
        { name: 'Sound', icon: MdVolumeUp },
        { name: 'Thunder', icon: GiThunderStruck },
        { name: 'Blast', icon: FaBolt }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTagToggle = (tag) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag]
        }));
    };

    const handleSoundTagToggle = (tag) => {
        setFormData(prev => ({
            ...prev,
            soundTags: prev.soundTags.includes(tag)
                ? prev.soundTags.filter(t => t !== tag)
                : [...prev.soundTags, tag]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Handle form submission here
    };

    const handleCancel = () => {
        setFormData({
            productName: '',
            price: '',
            age: '',
            rating: '',
            description: '',
            tags: [],
            soundTags: [],
            image: null
        });
        setImagePreview(null);
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
                <p className="text-sm text-gray-500 mt-1">Fill in the details to add a new product to your store</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Product Image */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Product Image</h2>

                            {/* Image Upload */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Image <span className="text-red-500">*</span>
                                </label>

                                {!imagePreview ? (
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 transition-colors cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label htmlFor="image-upload" className="cursor-pointer">
                                            <MdUploadFile className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-sm text-gray-600 mb-1">Click to upload product image</p>
                                            <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                                        </label>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={imagePreview}
                                            alt="Product preview"
                                            className="w-full h-64 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImagePreview(null);
                                                setFormData(prev => ({ ...prev, image: null }));
                                            }}
                                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <MdClose className="w-4 h-4" />
                                        </button>
                                        <div className="absolute bottom-2 right-2 p-2 bg-green-500 text-white rounded-full">
                                            <MdCheckCircle className="w-4 h-4" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Preview Card */}
                            {imagePreview && formData.productName && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Preview</h3>
                                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h4 className="font-bold text-gray-900 mb-2">{formData.productName}</h4>
                                            <div className="flex items-center justify-between text-sm mb-3">
                                                <span className="text-gray-600">AGE</span>
                                                <span className="text-gray-600">Tags</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm mb-3">
                                                <span className="font-semibold text-gray-900">{formData.age || '16'}+</span>
                                                <div className="flex gap-1">
                                                    {formData.soundTags.slice(0, 3).map((tag, idx) => (
                                                        <div key={idx} className="w-6 h-6 bg-gray-800 rounded-full"></div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xl font-bold text-gray-900">₹{formData.price || '499'}.00</span>
                                                <button type="button" className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold">
                                                    Buy now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Middle & Right Columns - Form Fields */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Product Name */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="productName"
                                        value={formData.productName}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Example Cracker"
                                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                                        required
                                    />
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price (₹) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="499.00"
                                        step="0.01"
                                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                                        required
                                    />
                                </div>

                                {/* Age Restriction */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Age Restriction <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                                        required
                                    >
                                        <option value="">Select age</option>
                                        <option value="12">12+</option>
                                        <option value="14">14+</option>
                                        <option value="16">16+</option>
                                        <option value="18">18+</option>
                                    </select>
                                </div>

                                {/* Rating */}
                                
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Product Description</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter detailed product description..."
                                    rows="6"
                                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all resize-none"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Provide a detailed description of the product, including features, specifications, and usage instructions.
                                </p>
                            </div>
                        </div>

                        {/* Sound Tags - NEW */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Sound Tags</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Select Sound Type(s)
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {soundTagOptions.map((tag) => {
                                        const Icon = tag.icon;
                                        return (
                                            <button
                                                key={tag.name}
                                                type="button"
                                                onClick={() => handleSoundTagToggle(tag.name)}
                                                className={`px-5 py-3 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${formData.soundTags.includes(tag.name)
                                                        ? 'bg-orange-500 text-white shadow-md'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                <Icon className="w-5 h-5" />
                                                {tag.name}
                                                {formData.soundTags.includes(tag.name) && <MdCheckCircle className="w-4 h-4" />}
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Selected: {formData.soundTags.length}
                                </p>
                            </div>
                        </div>

                        {/* Category Tags */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Category Tags</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Select Tags (Select up to 3)
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {tagOptions.map((tag) => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => handleTagToggle(tag)}
                                            disabled={!formData.tags.includes(tag) && formData.tags.length >= 3}
                                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${formData.tags.includes(tag)
                                                    ? 'bg-orange-500 text-white shadow-md'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
                                                }`}
                                        >
                                            {formData.tags.includes(tag) && <MdCheckCircle className="inline w-4 h-4 mr-1" />}
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Selected: {formData.tags.length}/3
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40"
                                >
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
