import express from "express";
import { getSellerProfile, updateSellerProfile } from "../controllers/sellerProfileController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// GET seller profile
router.get("/profile", authenticate, getSellerProfile);

// UPDATE seller profile
router.put("/profile", authenticate, updateSellerProfile);

export default router;
