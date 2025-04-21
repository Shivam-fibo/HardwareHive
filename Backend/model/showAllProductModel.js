import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  category: { type: String, required: true },  // Added category field
});

export default mongoose.model("Image", ImageSchema);
