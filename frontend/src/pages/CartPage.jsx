import Sidebar from '../components/Customer/Sidebar';
import Topbar from '../components/Customer/Topbar';
import Cart from '../components/Customer/Cart';
import Footer from '../components/Customer/Footer';

const CartPage = () => {
    return (
        <div className="flex w-full h-screen bg-gray-50">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-y-auto">
                <Topbar />
                <Cart />
                <Footer />
            </div>
        </div>
    );
};

export default CartPage;
