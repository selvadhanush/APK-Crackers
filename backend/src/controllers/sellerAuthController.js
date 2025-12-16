import Seller from "../models/Seller.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ⭐ Token generator function
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" } // fallback to 7 days
  );
};

// ==============================
// ⭐ REGISTER SELLER
// ==============================
export const registerSeller = async (req, res) => {
  try {
    const { name, email, phone, password, businessName, businessType, businessAddress } = req.body;

    // Check if seller already exists
    const exists = await Seller.findOne({ email });
    if (exists) return res.status(400).json({ message: "Seller already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const seller = await Seller.create({
      name,
      email,
      phone,
      password: hashed,
      businessName,
      businessType,
      businessAddress,
      kycStatus: "not_submitted",
      status: "active"                // ⭐ default active
    });

    const token = generateToken(seller._id);

    res.json({
      message: "Seller registered successfully",
      token,
      seller
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==============================
// ⭐ LOGIN SELLER
// ==============================
export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email }).select("+password");
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    if (seller.status === "blocked") {
      return res.status(403).json({
        message: "Your account has been blocked by admin. Contact support."
      });
    }

    const match = await bcrypt.compare(password, seller.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(seller._id);

    seller.password = undefined;

    res.json({
      message: "Login successful",
      token,
      seller
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
