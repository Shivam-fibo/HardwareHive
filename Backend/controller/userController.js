import Registration from "../model/registrationModel.js";
import Order from "../model/orderModel.js";
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
