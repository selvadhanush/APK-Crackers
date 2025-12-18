import KYC from "../models/KYC.js";
import Seller from "../models/Seller.js";
import { createNotification } from "./notificationController.js";

export const uploadKYC = async (req, res) => {
  try {
    console.log("📦 req.files:", req.files);
    console.log("📦 req.body:", req.body);
    console.log("📦 content-type:", req.headers["content-type"]);

    const sellerId = req.user._id;
    const files = req.files;

    // 🔒 Basic validation
    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({
        message: "KYC documents are required",
      });
    }

    // 🔒 Double safety check (controller-level)
    const existingKyc = await KYC.findOne({ sellerId });

    if (existingKyc && existingKyc.status === "pending_review") {
      return res.status(400).json({
        message: "KYC already submitted and under review",
      });
    }

    if (existingKyc && existingKyc.status === "approved") {
      return res.status(400).json({
        message: "KYC already approved",
      });
    }

    const {
      licenseType,
      licenseNumber,
      expiryDate,
      fireNOCExpiry,
      bankAccountNumber,
      ifsc,
    } = req.body;

    const kycData = {
      sellerId,

      identity: {
        aadhaarFront: files?.aadhaarFront?.[0]?.path,
        aadhaarBack: files?.aadhaarBack?.[0]?.path,
        panCard: files?.panCard?.[0]?.path,
      },

      business: {
        tradeLicense: files?.tradeLicense?.[0]?.path,
        gstCertificate: files?.gstCertificate?.[0]?.path,
      },

      explosiveLicense: {
        licenseType,
        licenseNumber,
        licenseImage: files?.licenseImage?.[0]?.path,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
      },

      fireNOC: {
        nocDocument: files?.fireNOC?.[0]?.path,
        expiryDate: fireNOCExpiry ? new Date(fireNOCExpiry) : null,
      },

      bank: {
        accountNumber: bankAccountNumber,
        ifsc,
        chequeImage: files?.chequeImage?.[0]?.path,
      },

      status: "pending_review",
    };

    let kyc;

    // ✅ Allow re-upload ONLY if previously rejected
    if (existingKyc && existingKyc.status === "rejected") {
      kyc = await KYC.findOneAndUpdate(
        { sellerId },
        kycData,
        { new: true }
      );
    } else {
      kyc = await KYC.create(kycData);
    }

    // ✅ Sync Seller KYC status
    await Seller.findByIdAndUpdate(sellerId, {
      kycStatus: "pending_review",
    });

    // 🔔 Notify seller
    await createNotification({
      userId: sellerId,
      userType: "seller",
      title: "KYC Submitted",
      message: "Your KYC has been submitted and is under admin review.",
      type: "kyc",
    });

    return res.status(201).json({
      message: "KYC submitted successfully. Waiting for admin approval.",
      kyc,
    });

  } catch (err) {
    return res.status(500).json({
      message: "KYC upload failed",
      error: err.message,
    });
  }
};

// Get KYC Status
export const getKYCStatus = async (req, res) => {
  try {
    const sellerId = req.user._id;

    // Find KYC data for this seller
    const kyc = await KYC.findOne({ sellerId });

    if (!kyc) {
      return res.json({
        message: "No KYC data found",
        kyc: null
      });
    }

    return res.json({
      message: "KYC data retrieved successfully",
      kyc
    });

  } catch (err) {
    console.error("Error fetching KYC status:", err);
    return res.status(500).json({
      message: "Failed to fetch KYC status",
      error: err.message
    });
  }
};
