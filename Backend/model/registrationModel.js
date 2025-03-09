import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  mobile: { type: String, required: true },
  whatsapp: { type: String, required: true }, 
  email: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  gstType: { type: String, enum: ["gst", "non-gst"], default: "non-gst" }, 
  gstNumber: { type: String, default: "" }, 
  visitingCardUrl: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  isApproved: { type: Boolean, default: false },
  password: { type: String, required: false },
});

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
