import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },

  quantity: Number,
  totalPrice: Number,
  
  status: {
    type: String,
    enum: ["placed", "packed", "shipped", "delivered", "cancelled"],
    default: "placed"
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
