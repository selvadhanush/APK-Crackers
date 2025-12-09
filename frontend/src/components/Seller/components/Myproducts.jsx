import React, { useState } from 'react';
import { MdEdit, MdDelete, MdSearch, MdFilterList } from 'react-icons/md';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

const Myproducts = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    // Sample products data
    const products = [
        {
            id: 1,
            name: 'Exaple Cracker',
            image: 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000',
            rating: 4.2,
            reviews: 902,
            age: '16+',
            tags: ['sound', 'thunder', 'blast'],
            price: 499.00,
            category: 'Crackers'
        },
        {
            id: 2,
            name: 'Exaple Cracker',
            image: 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000',
            rating: 4.2,
            reviews: 902,
            age: '16+',
            tags: ['sound', 'thunder', 'blast'],
            price: 499.00,
            category: 'Crackers'
        },
        {
            id: 3,
            name: 'Exaple Cracker',
            image: 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000',
            rating: 4.2,
            reviews: 902,
            age: '16+',
            tags: ['sound', 'thunder', 'blast'],
            price: 499.00,
            category: 'Crackers'
        },
        {
            id: 4,
            name: 'Exaple Cracker',
            image: 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000',
            rating: 4.2,
            reviews: 902,
            age: '16+',
            tags: ['sound', 'thunder', 'blast'],
            price: 499.00,
            category: 'Crackers'
        },
        {
            id: 5,
            name: 'Exaple Cracker',
            image: 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000',
            rating: 4.2,
            reviews: 902,
            age: '16+',
            tags: ['sound', 'thunder', 'blast'],
            price: 499.00,
            category: 'Crackers'
        },
        {
            id: 6,
            name: 'Exaple Cracker',
            image: 'https://img.freepik.com/premium-photo/illustration-diwali-crackers-in-the-sky-white-background_756405-49701.jpg?w=2000',
            rating: 4.2,
            reviews: 902,
            age: '16+',
            tags: ['sound', 'thunder', 'blast'],
            price: 499.00,
            category: 'Crackers'
        },
    ];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

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

                    {/* Filter and Add Button */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <MdFilterList className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="pl-10 pr-8 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all appearance-none bg-white"
                            >
                                <option value="All">All Categories</option>
                                <option value="Crackers">Crackers</option>
                                <option value="Sparklers">Sparklers</option>
                                <option value="Rockets">Rockets</option>
                            </select>
                        </div>

                        <button className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30">
                            + Add Product
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

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                        {/* Product Image */}
                        <div className="relative overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Edit/Delete Overlay */}
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 bg-white rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors">
                                    <MdEdit className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-white rounded-lg shadow-md hover:bg-red-500 hover:text-white transition-colors">
                                    <MdDelete className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="p-4">
                            {/* Product Name and Rating */}
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="font-bold text-gray-900 text-sm">{product.name}</h3>
                                <div className="flex items-center gap-1 text-xs">
                                    <FaStar className="w-3 h-3 text-yellow-500" />
                                    <span className="font-semibold text-gray-900">{product.rating}</span>
                                    <span className="text-gray-500">({product.reviews})</span>
                                </div>
                            </div>

                            {/* Age and Tags */}
                            <div className="flex items-center justify-between text-xs mb-3">
                                <div>
                                    <p className="text-gray-500 mb-1">AGE</p>
                                    <p className="font-semibold text-gray-900">{product.age}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 mb-1 text-right">Tags</p>
                                    <div className="flex gap-1">
                                        {product.tags.map((tag, idx) => (
                                            <div key={idx} className="w-5 h-5 bg-gray-800 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Price and Actions */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <span className="text-lg font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                                <div className="flex gap-2">
                                    <button className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                                        <FaShoppingCart className="w-4 h-4" />
                                    </button>
                                    <button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:border-orange-500 hover:text-orange-500 transition-all">
                                        Buy now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MdFilterList className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            )}
        </div>
    );
};

export default Myproducts;
