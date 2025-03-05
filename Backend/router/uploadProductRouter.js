import express from "express";
import { uploadProduct, upload, getAllProducts } from "../controller/uploadProductController.js";

const router = express.Router();

router.post("/uploadProduct", upload.single("image"), uploadProduct);
router.get("/getallProduct", getAllProducts)

export default router;
