import Registration from "../model/registrationModel.js";
import SibApiV3Sdk from "sib-api-v3-sdk";
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

    return response.status(200).json({ message: "OK", user });
  } catch (error) {
    return response.status(500).json({ message: "Server error" });
  }
};





const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const generatePassword = () => Math.floor(100000 + Math.random() * 900000); // 6-digit

export const handleForgotPassword = async (req, res) => {
  try {
    const email = req.body.email || req.body; // handle if sent as raw string
    const user = await Registration.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPassword = generatePassword().toString();
    user.password = newPassword;
    await user.save();

    const sendSmtpEmail = {
      sender: { name: 'SS Power Tool', email: 'sspowertool.in@gmail.com' },
      to: [{ email: user.email, name: user.name }],
      subject: 'SS Power Tool: Password Reset',
      textContent: `Hi ${user.name},\n\nYour new password is: ${newPassword}\n\nPlease log in and change it after login.`,
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.json({ message: "New password sent to your email." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};

