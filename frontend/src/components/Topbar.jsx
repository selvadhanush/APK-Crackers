import { useState } from 'react';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Searchbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    return (
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between gap-6">
                {/* Left Section - Enhanced Search Bar */}
                <div className="flex-1 max-w-2xl">
                    <div className="relative group">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-orange-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search for crackers, brands, categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-full text-md text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white hover:border-gray-300 transition-all cursor-text shadow-sm"
                        />
                    </div>
                </div>

                {/* Right Section - Notification, Login, Signup, Profile */}
                <div className="flex items-center gap-3">
                    {/* Notification Bell */}
                    <button className="relative p-2.5 hover:bg-orange-50 rounded-full transition-all cursor-pointer group">
                        <FaBell className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
                        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                    </button>

                    {/* Login Button */}
                    <button
                        onClick={() => navigate('/Login')}
                        className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-full hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all cursor-pointer shadow-sm hover:shadow"
                    >
                        Login
                    </button>

                    {/* Signup Button */}
                    <button
                        onClick={() => navigate('/Register')}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full hover:from-orange-600 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105">
                        Sign Up
                    </button>

                    {/* Profile Picture */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-orange-500 hover:ring-offset-2 transition-all shadow-md hover:shadow-lg transform hover:scale-105">
                        <FaUser className="w-4 h-4 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Searchbar;
