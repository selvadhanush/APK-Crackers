import Customer from "../models/Customer.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const registerCustomer = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;

    const exists = await Customer.findOne({ email });
    if (exists) return res.status(400).json({ message: "Customer already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await Customer.create({
      name, email, phone, password: hashed, address
    });

    const token = generateToken(user._id, "customer");

    res.json({ message: "Customer registered", token, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Customer.findOne({ email });
    if (!user) return res.status(404).json({ message: "Customer not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, "customer");

    res.json({ message: "Login successful", token, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
