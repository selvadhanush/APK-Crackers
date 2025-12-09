import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/product/:id" element={<Productview />} />
        <Route path="/checkout" element={<Payment />} />
        <Route path="/seller-login" element={<SellerLogin />} />
        <Route path="/seller-register" element={<SellerRegister />} />
        <Route path="/seller-home" element={<SellerHome />} />
      </Routes>
    </Router>
  )
}

export default App
