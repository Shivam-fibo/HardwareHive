import Registration from "../model/registrationModel.js";
import Order from "../model/orderModel.js";
export const loginAdmin = (req, res) => {
    const { email, password } = req.body;
  
    const ADMIN_EMAIL = "abc";
    const ADMIN_PASSWORD = "abc";
  
    if (password === ADMIN_PASSWORD) {
      return res.json({ message: "Registration Authenticated" });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  };
  

// Get all unapproved Registrations
export const getUnapprovedRegistrations = async (req, res) => {
  try {
    const Registrations = await Registration.find(); // Fetch only unapproved Registrations
    res.json(Registrations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Registrations" });
  }
};



export const approveRegistration = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("request body", req.body)
    await Registration.findByIdAndUpdate(req.params.id, { isApproved: true });
    const updatedUser = await Registration.findOneAndUpdate(
      { email: email },
      { password: password, isApproved: true },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Registration approved and password updated" });
  } catch (error) {
    console.error("Error approving registration:", error);
    res.status(500).json({ message: "Error approving registration" });
  }
};


// Reject Registration
export const rejectRegistration = async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: "Registration rejected and deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting Registration" });
  }
};




export const placeOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = new Order({ userId, items, totalAmount, status: "Pending" });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email companyName mobile address city state pincode gstNumber"); // Fetch user details

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




export const confirmOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(
      id,
      { status: "Confirm" },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order confirmed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error confirming order", error });
  }
};

export const updateOrder = async(req, res) =>{
  const { orderId, itemId, quantity } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const item = order.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await order.save();

    res.json({ message: "Quantity updated", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
