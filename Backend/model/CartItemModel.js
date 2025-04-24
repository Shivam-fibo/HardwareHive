import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: String,
  title: String,
  price: Number,
  image: String,
  quantity: {
    type: Number,
    default: 1
  },
  userId: String, 
}, { timestamps: true });

export const CartItem = mongoose.model('CartItem', cartItemSchema);
