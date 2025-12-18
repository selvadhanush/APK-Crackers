import express from "express";
import { authenticate } from "../middleware/auth.js";
import { sellerGuard } from "../middleware/sellerGuard.js";

import {
  getSellerOrders,
  getSellerOrderById,
  updateOrderStatus
} from "../controllers/sellerOrderController.js";

const router = express.Router();

// ⭐ Get all orders for this seller
router.get(
  "/",
  authenticate,
  sellerGuard,     // ⬅ Seller KYC must be approved
  getSellerOrders
);

// ⭐ Get single order by ID for this seller
router.get(
  "/:orderId",
  authenticate,
  sellerGuard,
  getSellerOrderById
);

// ⭐ Update order status
router.put(
  "/:orderId",
  authenticate,
  sellerGuard,     // ⬅ Prevent unverified sellers
  updateOrderStatus
);

export default router;
