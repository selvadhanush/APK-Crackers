import Seller from "../models/Seller.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const registerSeller = async (req, res) => {
  try {
    const { name, email, phone, password, businessName, businessType, businessAddress } = req.body;

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
      businessAddress
    });

    const token = generateToken(seller._id, "seller");

    res.json({ message: "Seller registered", token, seller });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    const match = await bcrypt.compare(password, seller.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(seller._id, "seller");

    res.json({ message: "Login successful", token, seller });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
