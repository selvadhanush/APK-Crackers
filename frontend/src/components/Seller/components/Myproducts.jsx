import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdSearch, MdFilterList, MdInventory } from 'react-icons/md';
import API from '../../../../api';

const Myproducts = ({ onNavigate }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const categoryOptions = [
        'All',
        'Sparklers',
        'Ground Spinners',
        'Aerial Fireworks',
        'Rockets',
        'Fountains',
        'Crackers',
        'Novelties',
        'Gift Boxes',
        'Others'
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            console.log('🔍 Fetching seller products...');
            const response = await API.get('/products/my-products');
            console.log('✅ Products response:', response.data);

            // Backend returns { count, products }, so extract the products array
            const productsData = response.data.products || response.data;
            setProducts(Array.isArray(productsData) ? productsData : []);
            setLoading(false);
        } catch (err) {
            console.error('❌ Error fetching products:', err);
            console.error('Error response:', err.response?.data);
            console.error('Error status:', err.response?.status);
            setError(err.response?.data?.message || 'Failed to load products');
            setProducts([]); // Set empty array on error
            setLoading(false);
        }
    };

    const handleEditProduct = (productId) => {
        // TODO: Implement edit functionality when backend route is available
        alert('Edit functionality is not yet available. Please contact admin to modify products.');
    };

    const handleDeleteProduct = async (productId) => {
        // TODO: Implement delete functionality when backend route is available
        alert('Delete functionality is not yet available. Please contact admin to remove products.');
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            'pending': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending Approval' },
            'approved': { bg: 'bg-green-100', text: 'text-green-700', label: 'Approved' },
            'rejected': { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejected' }
        };

        const config = statusConfig[status] || statusConfig['pending'];
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    // Safety check: ensure products is always an array
    const filteredProducts = Array.isArray(products) ? products.filter(product => {
        const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    }) : [];

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
                <p className="text-sm text-gray-500 mt-1">Manage and view all your listed products</p>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                        />
                    </div>

                    {/* Filter and Refresh Button */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <MdFilterList className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="pl-10 pr-8 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all appearance-none bg-white"
                            >
                                {categoryOptions.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={fetchProducts}
                            className="px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                        Showing <span className="font-semibold">{filteredProducts.length}</span> of <span className="font-semibold">{products.length}</span> products
                    </p>
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading products...</p>
                </div>
            ) : error ? (
                <div className="text-center py-12">
                    <p className="text-red-600">{error}</p>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
                    <div className="text-center max-w-md mx-auto">
                        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MdInventory className="w-12 h-12 text-orange-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            {products.length === 0 ? 'No Products Added Yet' : 'No Products Found'}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {products.length === 0
                                ? 'You haven\'t added any products to your store yet. Start by adding your first product to begin selling!'
                                : 'Try adjusting your search or filter criteria to find the products you\'re looking for.'}
                        </p>
                        {products.length === 0 && (
                            <button
                                onClick={() => onNavigate && onNavigate('Add Products')}
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 inline-flex items-center gap-2"
                            >
                                <MdInventory className="w-5 h-5" />
                                Add Your First Product
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                /* Products Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                            {/* Product Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={product.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                                    alt={product.name}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* Status Badge */}
                                <div className="absolute top-2 left-2">
                                    {getStatusBadge(product.status)}
                                </div>
                                {/* Edit/Delete Overlay */}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEditProduct(product._id)}
                                        className="p-2 bg-white rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors"
                                        title="Edit Product"
                                    >
                                        <MdEdit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(product._id)}
                                        className="p-2 bg-white rounded-lg shadow-md hover:bg-red-500 hover:text-white transition-colors"
                                        title="Delete Product"
                                    >
                                        <MdDelete className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="p-4">
                                {/* Product Name and Category */}
                                <div className="mb-3">
                                    <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h3>
                                    <p className="text-xs text-gray-500">{product.category}</p>
                                </div>

                                {/* Description */}
                                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                                {/* Stock Info */}
                                <div className="flex items-center justify-between text-xs mb-3 pb-3 border-b border-gray-100">
                                    <div>
                                        <p className="text-gray-500 mb-1">Stock</p>
                                        <p className={`font-semibold ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                                            {product.stock} units
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-500 mb-1">Added</p>
                                        <p className="font-semibold text-gray-900">
                                            {new Date(product.createdAt).toLocaleDateString('en-IN', {
                                                day: '2-digit',
                                                month: 'short'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-gray-900">₹{product.price?.toLocaleString('en-IN')}</span>
                                    <button className="px-3 py-1.5 bg-orange-500 text-white text-xs font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Myproducts;
