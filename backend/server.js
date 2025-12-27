import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
// import mongoSanitize from "express-mongo-sanitize";
// import xss from "xss-clean";

import connectDB from "./src/config/db.js";

// =========================
// ⭐ Load Environment Variables & Connect DB
// =========================
dotenv.config();
connectDB();

const app = express();

// =========================
// ⭐ Security Middlewares
// =========================
app.use(helmet());
// app.use(mongoSanitize());
// app.use(xss());

app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 200,
    message: "Too many requests from this IP, please try again later.",
  })
);

// Disable Express signature in production
if (process.env.NODE_ENV === "production") {
  app.disable("x-powered-by");
}

// =========================
// ⭐ CORS
// =========================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://yourfrontend.com"
    ],
    credentials: true,
  })
);

app.use(express.json());

// =========================
// ⭐ ROUTE IMPORTS
// =========================
import customerAuthRoutes from "./src/routes/customerAuthRoutes.js";
import sellerAuthRoutes from "./src/routes/sellerAuthRoutes.js";

import productRoutes from "./src/routes/productRoutes.js";
import customerProductRoutes from "./src/routes/customerProductRoutes.js";

import cartRoutes from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";

import kycRoutes from "./src/routes/kycRoutes.js";
import sellerOrderRoutes from "./src/routes/sellerOrderRoutes.js";
import sellerAnalyticsRoutes from "./src/routes/sellerAnalyticsRoutes.js";

import adminAuthRoutes from "./src/routes/adminAuthRoutes.js";
import adminProductRoutes from "./src/routes/adminProductRoutes.js";
import adminKycRoutes from "./src/routes/adminKycRoutes.js";
import adminOrderRoutes from "./src/routes/adminOrderRoutes.js";
import adminAnalyticsRoutes from "./src/routes/adminAnalyticsRoutes.js";

import addressRoutes from "./src/routes/addressRoutes.js";
import wishlistRoutes from "./src/routes/wishlistRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import adminSellerRoutes from "./src/routes/adminSellerRoutes.js";
import searchRoutes from "./src/routes/searchRoutes.js";

import notificationRoutes from "./src/routes/notificationRoutes.js";
import payoutRoutes from "./src/routes/payoutRoutes.js";
import sellerProfileRoutes from "./src/routes/sellerProfileRoutes.js";


// =========================
// ⭐ ADMIN ROUTES
// =========================
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/kyc", adminKycRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/analytics", adminAnalyticsRoutes);
app.use("/api/admin/sellers", adminSellerRoutes);
app.use("/api/admin/payouts", payoutRoutes);


// =========================
// ⭐ SELLER ROUTES
// =========================
app.use("/api/seller/auth", sellerAuthRoutes);
app.use("/api/seller/kyc", kycRoutes);
app.use("/api/seller/orders", sellerOrderRoutes);
app.use("/api/seller/analytics", sellerAnalyticsRoutes);
app.use("/api/seller/payouts", payoutRoutes);
app.use("/api/seller", sellerProfileRoutes);


// =========================
// ⭐ CUSTOMER ROUTES
// =========================
app.use("/api/customer/auth", customerAuthRoutes);
app.use("/api/products/customer", customerProductRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);


// =========================
// ⭐ GLOBAL ROUTES (USED BY ALL)
// =========================
app.use("/api/products", productRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/notifications", notificationRoutes);


// =========================
// ⭐ DEFAULT ROUTE
// =========================
app.get("/", (req, res) => {
  res.json({ message: "🔥 Firecracker Marketplace API Running Successfully!" });
});


// =========================
// ⭐ GLOBAL ERROR HANDLER
// =========================
app.use((err, req, res, next) => {
  console.error("=== Global Error Handler ===");
  console.error(err);

  if (err.name === "MulterError") {
    return res.status(400).json({
      message: "File upload error",
      error: err.message,
      code: err.code,
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    error: err.name,
  });
});


// =========================
// ⭐ START SERVER
// =========================
app.listen(process.env.PORT, () => {
  console.log(`🔥 Server running on port ${process.env.PORT}`);
});

export default app;
