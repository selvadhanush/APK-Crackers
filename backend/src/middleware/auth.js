import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";
import Customer from "../models/Customer.js";
import Admin from "../models/Admin.js";

export const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userRole = decoded.role;

    if (decoded.role === "seller") {
      req.user = await Seller.findById(decoded.id);
    } else if (decoded.role === "customer") {
      req.user = await Customer.findById(decoded.id);
    } else if (decoded.role === "admin") {
      req.user = await Admin.findById(decoded.id);
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
