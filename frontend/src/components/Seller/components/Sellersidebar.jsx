import React, { useState } from 'react';
import {
    MdDashboard,
    MdShoppingCart,
    MdAddBox,
    MdInventory,
    MdAccountBalanceWallet,
    MdVerifiedUser,
    MdSettings,
    MdLogout
} from 'react-icons/md';

const Sellersidebar = ({ onNavigate, activePage = 'Dashboard' }) => {
    const menuItems = [
        { name: 'Dashboard', icon: MdDashboard },
        { name: 'Orders', icon: MdShoppingCart },
        { name: 'Add Products', icon: MdAddBox },
        { name: 'My Products', icon: MdInventory },
        
        { name: 'KYC Verification', icon: MdVerifiedUser },
    ];

    const bottomMenuItems = [
        { name: 'Settings', icon: MdSettings },
        { name: 'Logout', icon: MdLogout },
    ];

    const handleItemClick = (itemName) => {
        if (onNavigate) {
            onNavigate(itemName);
        }
    };

    return (
        <div className="w-44 h-screen bg-white border-r border-gray-200 flex flex-col justify-between py-4 shadow-sm">
            {/* Main Menu Items */}
            <div className="flex flex-col gap-1 px-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.name;

                    return (
                        <div
                            key={item.name}
                            onClick={() => handleItemClick(item.name)}
                            className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer
                transition-all duration-200 ease-in-out
                ${isActive
                                    ? 'bg-orange-100 text-orange-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }
              `}
                        >
                            <Icon className={`text-lg ${isActive ? 'text-orange-600' : 'text-gray-500'}`} />
                            <span className={`text-sm font-medium ${isActive ? 'text-orange-600' : 'text-gray-700'}`}>
                                {item.name}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Menu Items */}
            <div className="flex flex-col gap-1 px-2 border-t border-gray-200 pt-4">
                {bottomMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.name;

                    return (
                        <div
                            key={item.name}
                            onClick={() => handleItemClick(item.name)}
                            className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer
                transition-all duration-200 ease-in-out
                ${isActive
                                    ? 'bg-orange-100 text-orange-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }
              `}
                        >
                            <Icon className={`text-lg ${isActive ? 'text-orange-600' : 'text-gray-500'}`} />
                            <span className={`text-sm font-medium ${isActive ? 'text-orange-600' : 'text-gray-700'}`}>
                                {item.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Sellersidebar;
