import Product from "../models/Product.js";
import { createNotification } from "../controllers/notificationController.js"; // ⭐ UPDATED


// ⭐ GET ALL PENDING PRODUCTS FOR ADMIN REVIEW
export const getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "pending" }).populate("sellerId");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ⭐ APPROVE PRODUCT
export const approveProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.status = "approved";
    await product.save();


    // ⭐ SEND NOTIFICATION TO SELLER — PRODUCT APPROVED
    await createNotification({
      userId: product.sellerId,
      userType: "seller",
      title: "Product Approved",
      message: `Your product "${product.name}" has been approved and is now live.`,
      type: "product"
    });


    res.json({ message: "Product approved successfully", product });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ⭐ REJECT PRODUCT
export const rejectProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { reason } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.status = "rejected";
    product.rejectionReason = reason || "Not specified";
    await product.save();


    // ⭐ SEND NOTIFICATION TO SELLER — PRODUCT REJECTED
    await createNotification({
      userId: product.sellerId,
      userType: "seller",
      title: "Product Rejected",
      message: `Your product "${product.name}" was rejected. Reason: ${reason || "Not provided"}`,
      type: "product"
    });


    res.json({ message: "Product rejected", product });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ⭐ GET TOTAL PRODUCTS COUNT FOR ADMIN DASHBOARD
export const getAllProductsCount = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    res.json({ totalProducts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ⭐ GET ALL PRODUCTS (APPROVED, PENDING, REJECTED) FOR ADMIN
export const getAllProducts = async (req, res) => {
  try {
    const { status } = req.query; // Optional filter by status

    let query = {};
    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      query.status = status;
    }

    const products = await Product.find(query)
      .populate('sellerId', 'name businessName email')
      .sort({ createdAt: -1 }); // Newest first

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
