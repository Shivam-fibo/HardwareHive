import Registration from "../model/registrationModel.js";
import Order from "../model/orderModel.js";
import Notification from "../model/NotificationModel.js";
// Get User by ID
export const getUser = async (req, res) => {
  try {
    const user = await Registration.findById(req.params.id).select("-password -__v");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update User Details
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};



export const getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId, status: "Confirm" });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order history", error });
  }
};






export const Notifications = async(req, res) =>{
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    // Get last checked time from DB (or set to oldest date)
    let notification = await Notification.findOne({ userId });
    if (!notification) {
      notification = new Notification({ userId });
      await notification.save();
    }

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 10);
    const newConfirmedOrders = await Order.find({
      userId: userId,
      status: "Confirm",
      updatedAt: { $gt: oneDayAgo }
    });
    
    // Update last checked time in DB
    notification.lastChecked = new Date();
    await notification.save();

    res.json(newConfirmedOrders);
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ message: "Server error" });
  }
}