// src/controllers/adminAuthController.js

import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ⭐ Generate JWT with expiry
const generateToken = (id) => {
  return jwt.sign(
    { id, role: "admin" },        // include role for authorization
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }  // fallback to 7 days
  );
};

// ==============================
// ⭐ REGISTER ADMIN
// ==============================
export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Username and password required" });

    // Check duplicates
    const existsUsername = await Admin.findOne({ username });
    if (existsUsername)
      return res.status(400).json({ message: "Username already exists" });

    if (email) {
      const existsEmail = await Admin.findOne({ email });
      if (existsEmail)
        return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await Admin.create({
      username,
      email,
      password: hashed,
    });

    // ⭐ Generate token with expiry
    const token = generateToken(admin._id);

    // Remove password before sending response
    const adminObj = admin.toObject();
    delete adminObj.password;

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      admin: adminObj,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==============================
// ⭐ LOGIN ADMIN (FIXED)
// ==============================
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password required" });

    // 🔴 FIX: explicitly select password
    const admin = await Admin.findOne({ username }).select("+password");
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(admin._id);

    const adminObj = admin.toObject();
    delete adminObj.password;

    res.json({
      message: "Admin login successful",
      token,
      admin: adminObj,
    });
  } catch (err) {
    console.error("Admin Login Error:", err);
    res.status(500).json({ error: err.message });
  }
};
