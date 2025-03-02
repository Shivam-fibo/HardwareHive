import Registration from "../model/registrationModel.js";



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
  

// ✅ Get all unapproved Registrations
export const getUnapprovedRegistrations = async (req, res) => {
  try {
    const Registrations = await Registration.find({ isApproved: false }); // Fetch only unapproved Registrations
    res.json(Registrations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Registrations" });
  }
};

// ✅ Approve Registration
import Registration from "../models/Registration.js";
import User from "../models/User.js"; // Import your User model

export const approveRegistration = async (req, res) => {
  try {
    const { email, password } = req.body;
    await Registration.findByIdAndUpdate(req.params.id, { isApproved: true });
    const updatedUser = await User.findOneAndUpdate(
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


// ✅ Reject Registration
export const rejectRegistration = async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: "Registration rejected and deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting Registration" });
  }
};
