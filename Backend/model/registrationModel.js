import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  mobile: { type: String, required: true },
  whatsapp: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, default: "" },
  city: { type: String, default: "" },   
  district: { type: String, default: "" },   
  state: { type: String, default: "" },   
  pincode: { type: String, default: "" },   
  gstNumber: { type: String, default: "" },
  isApproved: { type: Boolean, default: false },
  password: {type: String, default:""}
});

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
