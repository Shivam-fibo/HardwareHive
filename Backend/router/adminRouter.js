import express from "express";
import { loginAdmin, getUnapprovedRegistrations, approveRegistration, rejectRegistration, placeOrder, getAllOrders, confirmOrder, updateOrder } from "../controller/adminController.js";
import {sendEmail} from "../config/ResendConfig.js"
import { uploadProduct, upload } from "../controller/uploadProductController.js";
import { uploadImage, getAllImages, uploadMiddleware, deleteImage } from "../controller/showAllProudctController.js"

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/registrations", getUnapprovedRegistrations); 
router.post("/placeOrder", placeOrder)
router.get("/getPlacedOrder", getAllOrders)
router.patch("/confirm/:id", confirmOrder)
router.patch("/updateQuantity", updateOrder)
router.post("/registrations/:id/approve", approveRegistration);
router.post("/registrations/:id/reject", rejectRegistration); 
router.post("/sendEmail", sendEmail )
router.post("/uploadProduct", upload.single("image"), uploadProduct);
router.post("/upload", uploadMiddleware, uploadImage);
router.get("/images", getAllImages);
router.delete('/delete/:id', deleteImage);
export default router;
