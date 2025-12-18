import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { createNotification } from "../controllers/notificationController.js";  // ⭐ UPDATED


export const createOrder = async (req, res) => {
  try {
    const customerId = req.user._id;
    const { shippingAddress, paymentMethod = "online" } = req.body;

    // Fetch customer cart
    const cart = await Cart.findOne({ customerId }).populate("items.productId");

    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    // Prepare order items
    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    // Calculate total price
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    // Firecrackers come from ONE seller → get sellerId from product
    const sellerId = cart.items[0].productId.sellerId;

    // Deduct stock
    for (const item of cart.items) {
      const product = await Product.findById(item.productId._id);
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: "Insufficient stock for a product" });
      }
      product.stock -= item.quantity;
      await product.save();
    }

    // Create order with payment method
    const order = await Order.create({
      customerId,
      sellerId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: paymentMethod === "cod" ? "paid" : "pending_payment",
      paymentStatus: paymentMethod === "cod" ? "pending" : "pending"
    });

    // ⭐ NOTIFICATION 1 — Notify Seller
    await createNotification({
      userId: sellerId,
      userType: "seller",
      title: "New Order Received",
      message: "A new order has been placed for your products.",
      type: "order"
    });

    // ⭐ NOTIFICATION 2 — Notify Customer
    await createNotification({
      userId: customerId,
      userType: "customer",
      title: "Order Placed",
      message: "Your order has been created. Proceed to payment.",
      type: "order"
    });

    // Clear customer cart
    await Cart.findOneAndUpdate(
      { customerId },
      { $set: { items: [] } }
    );

    res.json({
      message: "Order created successfully. Proceed to payment.",
      order
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
