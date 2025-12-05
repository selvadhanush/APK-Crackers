import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: String,
  address: String
}, { timestamps: true });

export default mongoose.model("Customer", customerSchema);
