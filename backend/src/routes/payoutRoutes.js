import express from "express";
import { authenticate } from "../middleware/auth.js";

import {
  getSellerPayouts,
  getAllPayouts,
  markPayoutPaid
} from "../controllers/payoutController.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// Seller routes
router.get("/seller", authenticate, getSellerPayouts);

// Admin routes
router.get("/admin", authenticate, isAdmin, getAllPayouts);
router.put("/admin/pay/:payoutId", authenticate, isAdmin, markPayoutPaid);

export default router;
