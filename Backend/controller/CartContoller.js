import { CartItem } from "../model/CartItemModel.js";

export const addItemToCart = async (req, res) => {
  try {
    const { productId, title, price, image, quantity, userId } = req.body;

    let item = await CartItem.findOne({ productId, userId });
    
    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = new CartItem({ productId, title, price, image, quantity, userId });
      await item.save();
    }

    res.status(200).json({ message: 'Item added/updated successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
};


export const getCartItems = async (req, res) => {
    try {
      const { userId } = req.params; 
      console.log("user id is" , userId)
      if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
      }
  
      const items = await CartItem.find({ userId });
  
      res.status(200).json({ items });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cart items', error });
    }
  };
  