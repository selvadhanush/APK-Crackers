import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Homepage from './pages/Homepage'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Settings from './pages/Settings'
import SellerRegister from './components/Seller/components/SellerRegister'
import SellerLogin from './components/Seller/components/SellerLogin'
import SellerHome from "./components/Seller/Seller/SellerHome"
import Productview from './components/Prouductview'
import Payment from './components/Payment'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'
import SearchResults from './pages/SearchResults'
import AdminHome from './components/Admin/Adminpages/Adminhome'
import Adminlogin from './components/Admin/components/Adminlogin'
import {
  ProtectedCustomerRoute,
  ProtectedSellerRoute,
  ProtectedAdminRoute,
  PublicRoute
} from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<Productview />} />
        <Route path="/search" element={<SearchResults />} />

        {/* Auth Routes - Redirect to home if already logged in */}
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

        {/* Protected Customer Routes */}
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
              <Cart />
            </ProtectedCustomerRoute>
          }
        />
        <Route
          path="/Wishlist"
          element={
            <ProtectedCustomerRoute>
              <Wishlist />
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
