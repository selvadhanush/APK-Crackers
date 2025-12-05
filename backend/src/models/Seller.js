import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: String,

  businessName: String,
  businessType: { type: String, enum: ["manufacturer", "wholesaler", "retailer"] },
  businessAddress: String,

  kycStatus: {
    type: String,
    enum: ["not_submitted", "pending_review", "approved", "rejected", "license_expired"],
    default: "not_submitted"
  },

}, { timestamps: true });

export default mongoose.model("Seller", sellerSchema);
