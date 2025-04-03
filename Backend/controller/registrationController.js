import Registration from "../model/registrationModel.js";

export const registerUser = async (req, res) => {
  try {
    const { 
      name, 
      companyName, 
      mobile, 
      whatsapp, 
      email, 
      address, 
      city, 
      district, 
      state, 
      pincode, 
      gstNumber 
    } = req.body;

    // Step 1 validation: Ensure required fields are provided
    if (!name || !companyName || !mobile || !whatsapp || !email) {
      return res.status(400).json({ message: "Step 1 fields are required" });
    }

    // Step 2 fields are optional, so no validation required here

    // Create and save the new registration
    const newRegistration = new Registration({
      name,
      companyName,
      mobile,
      whatsapp,
      email,
      address: address || "", 
      city: city || "",
      district: district || "",
      state: state || "",
      pincode: pincode || "",
      gstNumber: gstNumber || ""
    });

    await newRegistration.save();
    res.status(201).json({ message: "Registration submitted successfully" });

  } catch (error) {
    console.error("Error registering:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};


export const updateUser = async (req, res) => {
  try {
    const updatedUser = await Registration.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};