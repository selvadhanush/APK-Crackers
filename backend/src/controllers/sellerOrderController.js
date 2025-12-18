import Order from "../models/Order.js";
import Payout from "../models/Payout.js";
import { sendNotification } from "../utils/sendNotification.js";   // ⭐ IMPORTANT


// ⭐ GET ALL ORDERS FOR SELLER
export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const orders = await Order.find({ sellerId })
      .populate("customerId")
      .populate("items.productId");

    res.json(orders);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ⭐ GET SINGLE ORDER BY ID FOR SELLER
export const getSellerOrderById = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const { orderId } = req.params;

    const order = await Order.findOne({ _id: orderId, sellerId })
      .populate("customerId")
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ⭐ UPDATE ORDER STATUS (packed → shipped → delivered)
export const updateOrderStatus = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const { orderId } = req.params;
    const { status } = req.body;

    const allowedStatus = ["packed", "shipped", "delivered"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status update" });
    }

    const order = await Order.findOne({ _id: orderId, sellerId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only allow moving forward
    const statusFlow = ["paid", "packed", "shipped", "delivered"];
    const currentIndex = statusFlow.indexOf(order.status);
    const newIndex = statusFlow.indexOf(status);

    if (newIndex <= currentIndex) {
      return res
        .status(400)
        .json({ message: "Cannot move order backward" });
    }

    // ⭐ UPDATE ORDER STATUS
    order.status = status;
    await order.save();

    // ⭐ CREATE PAYOUT FOR COD ORDERS WHEN DELIVERED
    if (status === "delivered" && order.paymentMethod === "cod") {
      // Check if payout already exists for this order
      const existingPayout = await Payout.findOne({ orderId: order._id });

      if (!existingPayout) {
        const commissionRate = 0.1;
        const commission = order.totalAmount * commissionRate;
        const netAmount = order.totalAmount - commission;

        const settlementDate = new Date();
        settlementDate.setDate(settlementDate.getDate() + 7);

        await Payout.create({
          sellerId: order.sellerId,
          orderId: order._id,
          totalAmount: order.totalAmount,
          commission,
          netAmount,
          settlementDate,
          status: "pending",
        });

        // Update payment status to success for COD orders
        order.paymentStatus = "success";
        await order.save();
      }
    }

    // ⭐ SEND NOTIFICATION TO CUSTOMER AFTER STATUS UPDATE
    await sendNotification(
      order.customerId,
      "Customer",
      "Order Updated",
      `Your order status is now: ${status}`,
      "order"
    );


    res.json({
      message: `Order status updated to ${status}`,
      order
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
