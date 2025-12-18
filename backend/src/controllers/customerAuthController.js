import Customer from "../models/Customer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ==============================
// ⭐ Generate JWT
// ==============================
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }  // Token expires in 24 hours
  );
};

// ==============================
// ⭐ REGISTER CUSTOMER
// ==============================
export const registerCustomer = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const exists = await Customer.findOne({ email });
    if (exists) {
      return res.status(400).json({
        message: "Customer already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Customer.create({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
    });

    const token = generateToken(user._id);

    // remove password before response
    const { password: _, ...safeUser } = user._doc;

    res.status(201).json({
      message: "Customer registered successfully",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({
      message: "Customer registration failed",
    });
  }
};

// ==============================
// ⭐ LOGIN CUSTOMER
// ==============================
export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // ⭐ IMPORTANT: explicitly fetch password
    const user = await Customer.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    // remove password before sending response
    const { password: _, ...safeUser } = user._doc;

    res.json({
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Login failed",
    });
  }
};
