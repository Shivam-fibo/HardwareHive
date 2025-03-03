import cloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const uploadProduct = async (req, res) => {
  try {
    const { title, subheading,category, price } = req.body;

    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      uploadStream.end(req.file.buffer);
    });

    const newProduct = new Product({
      title,
      subheading,
      category,
      price,
      image: result.secure_url,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Product Upload Error:", error);
    res.status(500).json({ error: "Product upload failed" });
  }
};

export { upload };
