import express from "express";
import { registerUser, updateUser } from "../controller/registrationController.js";

const router = express.Router();

// POST /register - Register a new user
router.post("/register", registerUser);
router.put("/update/:id", updateUser)
export default router;
