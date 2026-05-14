import Address from "../models/Address.js";
import userModel from "../models/User.js";

// add address

export const addAddress = async (req, res) => {
  try {
    const { ...address } = req.body;
    const userId = req.userId

    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    await Address.create({ ...address, userId });

    res.status(200).json({
      success: true,
      message: "Address added",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// get address

export const getAddresses = async (req, res) => {
  try {
    const  userId  = req.userId;

    const addresses = await Address.find({userId});
    if (!addresses)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};