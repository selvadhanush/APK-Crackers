import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  role: { type: String, default: "admin" }
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
