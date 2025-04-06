import express from "express";
import { getOrderHistory } from "../controller/userController.js";
import { getAllProducts } from "../controller/uploadProductController.js";
import { Notifications } from "../controller/userController.js";
const router = express.Router();
router.get("/history/:userId", getOrderHistory);
router.get("/getallProduct", getAllProducts)
router.get("/notifications/:userId", Notifications)
export default router;