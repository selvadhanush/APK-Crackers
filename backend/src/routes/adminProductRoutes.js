import express from "express";
import { authenticate } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";  // ⭐ UPDATED NAME

import {
  getPendingProducts,
  approveProduct,
  rejectProduct,
  getAllProductsCount,
  getAllProducts
} from "../controllers/adminProductController.js";

const router = express.Router();

// Get all products (with optional status filter)
router.get("/all", authenticate, isAdmin, getAllProducts);

// Get all pending products
router.get("/pending", authenticate, isAdmin, getPendingProducts);

// Get total products count
router.get("/count", authenticate, isAdmin, getAllProductsCount);

// Approve product
router.put("/approve/:productId", authenticate, isAdmin, approveProduct);

// Reject product
router.put("/reject/:productId", authenticate, isAdmin, rejectProduct);

export default router;
