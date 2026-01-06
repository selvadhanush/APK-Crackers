import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Homepage from './pages/Homepage'
import './App.css'
import Login from './components/Customer/Login'
import Register from './components/Customer/Register'
import Settings from './pages/Settings'
import SellerRegister from "./components/Seller/SellerRegistratation"
import Productview from './components/Customer/Prouductview'
import CartPage from './pages/CartPage'
import EnquiryList from './components/Customer/EnquiryList'
import QuotationRequest from './components/Customer/QuotationRequest'
import Quotations from './components/Customer/Quotations'
import QuotationDetail from './components/Customer/QuotationDetail'

import SearchResults from './pages/SearchResults'
import PrivacyPolicy from "./components/Customer/Policys/PrivacyPolicy"
import TermsAndConditions from './components/Customer/Policys/TermsAndConditions'
import Support from './components/Customer/Policys/Support'
import Affiliate from "./components/Customer/Affiliate"
import BrandRegistry from "./components/Customer/BrandRegistry"
import Returns from "./components/Customer/Policys/Returns"
import FAQs from "./components/Customer/Policys/FAQs"
import AboutUs from "./components/Customer/Company/AboutUs"
import Contact from "./components/Customer/Company/Contact"
import CategoriesSpecificpage from "./components/Customer/Landing/CategoriesSpecificpage"
import ShopProductsPage from "./pages/ShopProductsPage"
import EnquiriesWorks from "./components/Customer/Policys/EnquiriesWorks"
import SellerContactProcess from "./components/Customer/Policys/SellerContactProcess"
import LegalSafetyGuidelines from "./components/Customer/Policys/LegalSafetyGuidelines"
import SellerEnquiryProgram from "./components/Customer/Policys/SellerEnquiryProgram"
import BrandVisibilityOptions from "./components/Customer/Policys/BrandVisibilityOptions"
import PressMedia from "./components/Customer/Company/PressMedia"
import StoreLocations from "./components/Customer/Company/StoreLocations"
import Advertise from "./components/Customer/Policys/Advertise"

import {
  ProtectedCustomerRoute,
  PublicRoute
} from './components/Customer/ProtectedRoute'
import useDocumentTitle from './hooks/useDocumentTitle'

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
        <Route path="/category/:categorySlug" element={<CategoriesSpecificpage />} />
        <Route path="/shop/:sellerId" element={<ShopProductsPage />} />



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
          path="/seller-register"
          element={
            <PublicRoute>
              <SellerRegister />
            </PublicRoute>
          }
        />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/how-it-works" element={<EnquiriesWorks />} />
        <Route path="/seller-process" element={<SellerContactProcess />} />
        <Route path="/legal" element={<LegalSafetyGuidelines />} />
        <Route path="/seller-program" element={<SellerEnquiryProgram />} />
        <Route path="/brand-visibility" element={<BrandVisibilityOptions />} />
        <Route path="/press" element={<PressMedia />} />
        <Route path="/stores" element={<StoreLocations />} />
        <Route path="/advertise" element={<Advertise />} />


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
          path="/enquiry-list"
          element={
            <ProtectedCustomerRoute>
              <EnquiryList />
            </ProtectedCustomerRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedCustomerRoute>
              <QuotationRequest />
            </ProtectedCustomerRoute>
          }
        />
        <Route
          path="/Payment"
          element={
            <ProtectedCustomerRoute>
              <QuotationRequest />
            </ProtectedCustomerRoute>
          }
        />
        <Route
          path="/request-quotation"
          element={
            <ProtectedCustomerRoute>
              <QuotationRequest />
            </ProtectedCustomerRoute>
          }
        />
        <Route
          path="/quotations"
          element={
            <ProtectedCustomerRoute>
              <Quotations />
            </ProtectedCustomerRoute>
          }
        />
        <Route
          path="/quotation/:id"
          element={
            <ProtectedCustomerRoute>
              <QuotationDetail />
            </ProtectedCustomerRoute>
          }
        />


        <Route path="/Support" element={<Support />} />
        <Route path="/Affiliate" element={<Affiliate />} />
        <Route path="/BrandRegistry" element={<BrandRegistry />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        icon={false}
        closeButton={false}
      />
    </Router>
  )
}

export default App
