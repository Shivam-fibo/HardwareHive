import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Registration", required: true }, // Only store user ID
    items: [
      {
        title: String,
        price: Number,
        quantity: Number,
        image: String,
        subheading: String,
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["Pending", "Confirm"],
      default: "Pending",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
