import Registration from "../model/registrationModel.js";

export const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await Registration.findOne({ email });
    if (!user) {
      return response.status(400).json({ message: "User not found" });
    }

   
    if (user.password !== password) {
      return response.status(400).json({ message: "Invalid credentials" });
    }

    return response.status(200).json({ message: "OK" });
  } catch (error) {
    return response.status(500).json({ message: "Server error" });
  }
};
