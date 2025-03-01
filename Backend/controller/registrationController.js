import Registration from "../model/registrationModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, companyName, mobile, email, city, district, state } = req.body;

    if (!name || !companyName || !mobile || !email || !city || !district || !state) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRegistration = new Registration({ name, companyName, mobile, email, city, district, state });
    await newRegistration.save();

    res.status(201).json({ message: "Registration submitted successfully" });
  } catch (error) {
    console.error("Error registering:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};
