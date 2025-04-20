import Registration from "../model/registrationModel.js";
import Order from "../model/orderModel.js";
import SibApiV3Sdk from 'sib-api-v3-sdk';
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




const generatePassword = () => Math.floor(100000 + Math.random() * 900000);
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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'; 
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();


export const approveRegistration = async (req, res) => {
  try {
    const { email, name } = req.body;
    console.log("Request body:", req.body);

    const otp = generatePassword();

    await Registration.findByIdAndUpdate(req.params.id, { isApproved: true });

    const updatedUser = await Registration.findOneAndUpdate(
      { email },
      { password: otp.toString(), isApproved: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const sendSmtpEmail = {
      sender: { name: 'SS Power Tool', email: 'sspowertool.in@gmail.com' },
      to: [{ email, name }],
      subject: 'SS Power Tool: Your Account Approval',
      textContent: `Hi ${name},\n\nYour account has been approved.\nYour  password is: ${otp}\n\nPlease log in`,
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    res.json({
      message: 'Registration approved, password updated, and email sent using Brevo API.',
    });
  } catch (error) {
    console.error('Error sending email via Brevo API:', error);
    res.status(500).json({ message: 'Error approving registration' });
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
    const orders = await Order.find().populate("userId", "name email companyName mobile whatsapp address city state pincode gstNumber"); // Fetch user details

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
