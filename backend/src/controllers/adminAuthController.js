import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(admin._id, "admin");

    res.json({ message: "Admin login successful", token, admin });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
