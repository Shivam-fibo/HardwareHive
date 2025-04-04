import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Registration", required: true },
  lastChecked: { type: Date, default: new Date(0) } // Default: Oldest possible date
});

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
