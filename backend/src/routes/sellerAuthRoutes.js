import express from "express";
import { registerSeller, loginSeller } from "../controllers/sellerAuthController.js";

const router = express.Router();

// ⭐ Seller Register
router.post("/register", registerSeller);

// ⭐ Seller Login
router.post("/login", loginSeller);

export default router;
