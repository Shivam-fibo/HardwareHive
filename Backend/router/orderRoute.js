import express from "express";
import { getOrderHistory } from "../controller/userController.js";
const router = express.Router();
router.get("/history/:userId", getOrderHistory);

export default router;
