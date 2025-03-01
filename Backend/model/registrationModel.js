import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isApproved: { type: Boolean, default: false },
});

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
