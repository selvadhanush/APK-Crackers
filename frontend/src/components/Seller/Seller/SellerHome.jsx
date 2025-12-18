import React, { useState } from 'react';
import Sellersidebar from '../components/Sellersidebar';
import Sellerdashboard from '../components/Sellerdashboard';
import SellerOrders from '../components/SellerOrders';
import SellerOrderview from '../components/SellerOrderview';
import ProductForm from '../components/ProductForm';
import Myproducts from '../components/Myproducts';
import KycVerify from '../components/KycVerify';
import SellerSettings from '../components/settings';
import SellerProfile from '../components/SellerProfile';
import SellerPayouts from '../components/SellerPayouts';

const SellerHome = () => {
    const [activePage, setActivePage] = useState('Dashboard');
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleNavigation = (pageName) => {
        setActivePage(pageName);
        setSelectedOrderId(null); // Reset selected order when navigating
    };

    const handleViewOrder = (orderId) => {
        setSelectedOrderId(orderId);
        setActivePage('OrderView');
    };

    const renderPage = () => {
        switch (activePage) {
            case 'Dashboard':
                return <Sellerdashboard />;
            case 'Orders':
                return <SellerOrders onViewOrder={handleViewOrder} />;
            case 'OrderView':
                return <SellerOrderview orderId={selectedOrderId} />;
            case 'Payouts':
                return <SellerPayouts />;
            case 'Add Products':
                return <ProductForm />;
            case 'My Products':
                return <Myproducts onNavigate={handleNavigation} />;
            case 'KYC Verification':
                return <KycVerify />;
            case 'Profile':
                return <SellerProfile />;
            case 'Settings':
                return <SellerSettings />;
            default:
                return <Sellerdashboard />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Seller Sidebar */}
            <Sellersidebar onNavigate={handleNavigation} activePage={activePage} />

            {/* Main Content - Dynamic Page */}
            <div className="flex-1 overflow-y-auto">
                {renderPage()}
            </div>
        </div>
    );
};

export default SellerHome;
