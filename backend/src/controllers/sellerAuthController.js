import Seller from "../models/Seller.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ⭐ Token generator function
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" } // Token expires in 24 hours
  );
};

// ==============================
// ⭐ REGISTER SELLER
// ==============================
export const registerSeller = async (req, res) => {
  try {
    console.log("📝 Registration request received:", req.body);

    const { name, email, phone, password, businessName, businessType, businessAddress } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password || !businessName || !businessType || !businessAddress) {
      console.log("❌ Missing required fields");
      return res.status(400).json({
        message: "All fields are required",
        missing: {
          name: !name,
          email: !email,
          phone: !phone,
          password: !password,
          businessName: !businessName,
          businessType: !businessType,
          businessAddress: !businessAddress
        }
      });
    }

    // Check if seller already exists
    const exists = await Seller.findOne({ email });
    if (exists) {
      console.log("❌ Seller already exists:", email);
      return res.status(400).json({ message: "Seller with this email already exists" });
    }

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

    console.log("✅ Seller created successfully:", seller.email);

    const token = generateToken(seller._id);

    res.json({
      message: "Seller registered successfully",
      token,
      seller
    });

  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ==============================
// ⭐ LOGIN SELLER
// ==============================
export const loginSeller = async (req, res) => {
  try {
    console.log("🔐 Login request received:", { email: req.body.email });

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    const seller = await Seller.findOne({ email }).select("+password");
    if (!seller) {
      console.log("❌ Seller not found:", email);
      return res.status(404).json({ message: "Seller not found" });
    }

    console.log("✅ Seller found:", seller.email, "Status:", seller.status);

    if (seller.status === "blocked") {
      console.log("❌ Seller is blocked:", email);
      return res.status(403).json({
        message: "Your account has been blocked by admin. Contact support."
      });
    }

    const match = await bcrypt.compare(password, seller.password);
    if (!match) {
      console.log("❌ Invalid password for:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(seller._id);

    seller.password = undefined;

    console.log("✅ Login successful for:", seller.email);

    res.json({
      message: "Login successful",
      token,
      seller
    });

  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: err.message });
  }
};
