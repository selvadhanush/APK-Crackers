import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Products from '../components/Products';
import Searchbar from '../components/Topbar';
import Settings from './Settings';
const Homepage = () => {
    return (
        <div className="flex w-full h-screen bg-gray-50">
            {/* Sidebar Component */}
            <Sidebar />

            {/* Right Section - Searchbar + Products */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Searchbar Component */}
                <Searchbar />

                {/* Products Component */}
                <Products />
                
            </div>
        </div>
    );
};

export default Homepage;
