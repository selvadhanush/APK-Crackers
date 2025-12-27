import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

export const addToWishlist = async (req, res) => {
  try {
    const customerId = req.user._id;
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const item = await Wishlist.create({ customerId, productId });

    res.json({
      message: "Added to wishlist",
      item
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already in wishlist" });
    }
    res.status(500).json({ error: err.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const customerId = req.user._id;
    const { productId } = req.params;

    await Wishlist.findOneAndDelete({ customerId, productId });

    res.json({ message: "Removed from wishlist" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const customerId = req.user._id;

    const items = await Wishlist.find({ customerId })
      .populate("productId");

    // Filter out items with null/deleted products
    const validItems = items.filter(item => item.productId !== null);

    // If any items had null products, remove them from database
    if (validItems.length !== items.length) {
      const invalidItemIds = items
        .filter(item => item.productId === null)
        .map(item => item._id);

      await Wishlist.deleteMany({ _id: { $in: invalidItemIds } });
      console.log(`🧹 Cleaned up ${invalidItemIds.length} deleted products from wishlist for user ${customerId}`);
    }

    res.json(validItems);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
