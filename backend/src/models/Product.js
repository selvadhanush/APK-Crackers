import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },

  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,

  images: [String],

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
