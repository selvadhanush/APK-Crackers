import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Homepage from './pages/Homepage'
import './App.css'
import Login from './components/Customer/Login'
import Register from './components/Customer/Register'
import Settings from './pages/Settings'
import SellerRegister from './components/Seller/components/SellerRegister'
import SellerLogin from './components/Seller/components/SellerLogin'
import SellerHome from "./components/Seller/Seller/SellerHome"
import Productview from './components/Customer/Prouductview'
import Payment from './components/Customer/Payment'
import Checkout from './components/Customer/Checkout'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import SearchResults from './pages/SearchResults'
import AdminHome from './components/Admin/Adminpages/Adminhome'
import Adminlogin from './components/Admin/components/Adminlogin'
import PrivacyPolicy from "./components/Customer/Policys/PrivacyPolicy"
import TermsAndConditions from './components/Customer/Policys/TermsAndConditions'
import Support from './components/Customer/Policys/Support'
import Affiliate from "./components/Customer/Affiliate"
import BrandRegistry from "./components/Customer/BrandRegistry"
import Shipping from "./components/Customer/Policys/Shipping"
import Returns from "./components/Customer/Policys/Returns"
import TrackOrder from "./components/Customer/Policys/TrackOrder"
import FAQs from "./components/Customer/Policys/FAQs"
import AboutUs from "./components/Customer/Company/AboutUs"
import Contact from "./components/Customer/Company/Contact"

import {
  ProtectedCustomerRoute,
  ProtectedSellerRoute,
  ProtectedAdminRoute,
  PublicRoute
} from './components/Customer/ProtectedRoute'
import useDocumentTitle from './hooks/useDocumentTitle'

// Component to update document title (must be inside Router)
const DocumentTitleUpdater = () => {
  useDocumentTitle();
  return null;
};

function App() {
  return (
    <Router>
      <DocumentTitleUpdater />
      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<Productview />} />
        <Route path="/search" element={<SearchResults />} />


        <Route
          path="/Login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/Register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/seller-login"
          element={
            <PublicRoute>
              <SellerLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/seller-register"
          element={
            <PublicRoute>
              <SellerRegister />
            </PublicRoute>
          }
        />
        <Route
          path="/admin-login"
          element={
            <PublicRoute>
              <Adminlogin />
            </PublicRoute>
          }
        />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />


        <Route
          path="/Settings"
          element={
            <ProtectedCustomerRoute>
              <Settings />
            </ProtectedCustomerRoute>
          }
        />
        <Route
          path="/Cart"
          element={
            <ProtectedCustomerRoute>
              <CartPage />
            </ProtectedCustomerRoute>
          }
        />
        <Route
          path="/Wishlist"
          element={
            <ProtectedCustomerRoute>
              <WishlistPage />
            </ProtectedCustomerRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedCustomerRoute>
              <Payment />
            </ProtectedCustomerRoute>
          }
        />
        <Route
          path="/Payment"
          element={
            <ProtectedCustomerRoute>
              <Payment />
            </ProtectedCustomerRoute>
          }
        />

        {/* Protected Seller Routes */}
        <Route
          path="/seller-home"
          element={
            <ProtectedSellerRoute>
              <SellerHome />
            </ProtectedSellerRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin-Dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminHome />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/Support" element={<Support />} />
        <Route path="/Affiliate" element={<Affiliate />} />
        <Route path="/BrandRegistry" element={<BrandRegistry />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  )
}

export default App
