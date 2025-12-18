import express from "express";
import { authenticate } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { uploadKYC, getKYCStatus } from "../controllers/kycController.js";

const router = express.Router();

// Get KYC status
router.get("/status", authenticate, getKYCStatus);

// ❌ NO sellerGuard here
router.post(
  "/upload",
  authenticate,
  upload.fields([
    { name: "aadhaarFront", maxCount: 1 },
    { name: "aadhaarBack", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "tradeLicense", maxCount: 1 },
    { name: "gstCertificate", maxCount: 1 },
    { name: "licenseImage", maxCount: 1 },
    { name: "fireNOC", maxCount: 1 },
    { name: "chequeImage", maxCount: 1 },
  ]),
  uploadKYC
);

export default router;
