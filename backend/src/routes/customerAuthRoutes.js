import express from "express";
import {
  registerCustomer,
  loginCustomer,
  changePassword,
} from "../controllers/customerAuthController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.put("/change-password", authenticate, changePassword);

export default router;
