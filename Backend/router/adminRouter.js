import express from "express";
import { loginAdmin, getUnapprovedRegistrations, approveRegistration, rejectRegistration } from "../controller/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/registrations", getUnapprovedRegistrations); 
router.post("/registrations/:id/approve", approveRegistration);
router.post("/registrations/:id/reject", rejectRegistration); 

export default router;
