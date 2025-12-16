import express from "express";
import { authenticate } from "../middleware/auth.js";
import { createOrder, getMyOrders } from "../controllers/orderController.js";

const router = express.Router();

// Create order (Checkout)
router.post("/create", authenticate, createOrder);

// Get customer's orders
router.get("/", authenticate, getMyOrders);

export default router;
