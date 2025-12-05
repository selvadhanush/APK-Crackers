import mongoose from "mongoose";

const kycSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },

  identity: {
    aadhaarFront: String,
    aadhaarBack: String,
    panCard: String
  },

  business: {
    tradeLicense: String,
    gstCertificate: String
  },

  explosiveLicense: {
    licenseType: String,
    licenseNumber: String,
    licenseImage: String,
    expiryDate: Date
  },

  fireNOC: {
    nocDocument: String,
    expiryDate: Date
  },

  bank: {
    accountNumber: String,
    ifsc: String,
    chequeImage: String
  },

  status: {
    type: String,
    enum: ["not_submitted", "pending_review", "approved", "rejected", "license_expired"],
    default: "not_submitted"
  }

}, { timestamps: true });

export default mongoose.model("KYC", kycSchema);
