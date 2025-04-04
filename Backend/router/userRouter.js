import express from "express";
import { getOrderHistory } from "../controller/userController.js";
import { getAllProducts } from "../controller/uploadProductController.js";
const router = express.Router();
router.get("/history/:userId", getOrderHistory);
router.get("/getallProduct", getAllProducts)

export default router;