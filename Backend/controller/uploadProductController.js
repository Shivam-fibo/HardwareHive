import cloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";
import multer from "multer";

export const upload = multer({ storage: multer.memoryStorage() });

export const uploadProduct = async (req, res) => {
  try {
    const { title, subheading, productInfo, category,subCategory, price, buyingPrice } = req.body;

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
      subCategory,
      productInfo,
      price,
      buyingPrice,
      image: result.secure_url,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Product Upload Error:", error);
    res.status(500).json({ error: "Product upload failed" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); 
    res.json(products);
  } catch (error) {
    console.error("Fetch Products Error:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subheading, productInfo, category,subCategory, price, buyingPrice } = req.body;

    const updateData = { title, subheading, productInfo, category,subCategory, price,  buyingPrice };

    // If a new image is uploaded
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        uploadStream.end(req.file.buffer);
      });
      updateData.image = result.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Product Update Error:", error);
    res.status(500).json({ error: "Product update failed" });
  }
};




export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Extract public_id from image URL
    const urlParts = product.image.split("/");
    const publicIdWithExtension = urlParts[urlParts.length - 1];
    const publicId = `products/${publicIdWithExtension.split(".")[0]}`;

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete product from DB
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product and image deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};




