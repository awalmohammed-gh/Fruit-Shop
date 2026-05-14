import { Order } from "../models/Order.js";
import userModel from "../models/User.js";

//function to place order
export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address, amount } = req.body;

    const orders = new Order({
      userId,
      items,
      address,
      amount,
      status: "Order Placed",
      paymentMethod: "COD",
      payment: false,
    });

    await orders.save();
    await userModel.findByIdAndUpdate(userId, { cartItems: {} });

    res.status(201).json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error when placing order" });
  }
};

//function to get user order
export const usersOrder = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ userId });

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get user orders",
    });
  }
};

//function to get user order
export const allUserOrders = async (req, res) => {
  try {

    const orders = await Order.find({});

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get user orders",
    });
  }
};


//function to update status
export const updateStatus = async(req,res) =>{
    try {
        const {orderId, status} = req.body;
        await Order.findByIdAndUpdate(orderId, {status})
        res.status(200).json({success:true, message:"Status updated"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Error when updating status"})
    }
}