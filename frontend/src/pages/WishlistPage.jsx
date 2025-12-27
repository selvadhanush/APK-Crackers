import Sidebar from '../components/Customer/Sidebar';
import Topbar from '../components/Customer/Topbar';
import Wishlist from '../components/Customer/Wishlist';
import Footer from '../components/Customer/Footer';

const WishlistPage = () => {
    return (
        <div className="flex w-full h-screen bg-gray-50">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-y-auto">
                <Topbar />
                <Wishlist />
                <Footer />
            </div>
        </div>
    );
};

export default WishlistPage;
