import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import showAllProductModel from "../model/showAllProductModel.js";

// Multer Storage Setup (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Image Upload Controller
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileBase64 = `data:image/png;base64,${req.file.buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: "mern_project",
    });

    // Store Image URL in MongoDB
    const newImage = new showAllProductModel({ url: result.secure_url });
    await newImage.save();

    res.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
};

// Fetch All Images Controller
export const getAllImages = async (req, res) => {
  try {
    const images = await showAllProductModel.find();
    res.json(images);
  } catch (error) {
    console.error("Fetching images error:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

// Delete Image Controller
export const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    
    // Find the image first to get its URL
    const image = await showAllProductModel.findById(imageId);
    
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    
    // Extract public_id from the Cloudinary URL
    // The URL format is typically: https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/mern_project/abcdef123456.jpg
    const urlParts = image.url.split('/');
    const publicIdWithExtension = urlParts[urlParts.length - 1];
    const publicId = `mern_project/${publicIdWithExtension.split('.')[0]}`; // Get folder/filename without extension
    
    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);
    
    // Delete from MongoDB
    await showAllProductModel.findByIdAndDelete(imageId);
    
    res.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error("Image deletion error:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
};

// Export Multer Upload Middleware
export const uploadMiddleware = upload.single("image");
