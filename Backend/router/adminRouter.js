import express from "express";
import { loginAdmin, getUnapprovedRegistrations, approveRegistration, rejectRegistration, placeOrder, getAllOrders } from "../controller/adminController.js";
import {sendEmail} from "../config/ResendConfig.js"

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/registrations", getUnapprovedRegistrations); 
router.post("/placeOrder", placeOrder)
router.get("/getPlacedOrder", getAllOrders)
router.post("/registrations/:id/approve", approveRegistration);
router.post("/registrations/:id/reject", rejectRegistration); 
router.post("/sendEmail", sendEmail )
export default router;
