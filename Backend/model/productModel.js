import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subheading: { type: String, required: false },
  category:{type: String, required: false},
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
