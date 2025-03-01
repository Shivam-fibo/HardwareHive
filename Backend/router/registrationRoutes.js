import express from "express";
import { registerUser } from "../controller/registrationController.js";

const router = express.Router();

// POST /register - Register a new user
router.post("/register", registerUser);

export default router;
