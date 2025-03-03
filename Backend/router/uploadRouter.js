import express from "express";
import { uploadProduct, upload } from "../controller/uploadProductController.js";

const router = express.Router();

router.post("/uploadProduct", upload.single("image"), uploadProduct);

export default router;
