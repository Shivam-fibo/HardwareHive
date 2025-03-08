import express from "express";
import { uploadImage, getAllImages, uploadMiddleware, deleteImage } from "../controller/showAllProudctController.js"

const router = express.Router();

// Upload Image Route
router.post("/upload", uploadMiddleware, uploadImage);

// Fetch All Images Route
router.get("/images", getAllImages);

router.delete('/:id', deleteImage);

export default router;
