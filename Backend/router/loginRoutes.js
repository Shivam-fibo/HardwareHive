import express from "express";
import { loginUser, handleForgotPassword} from "../controller/loginController.js";

const router = express.Router()

router.post("/login", loginUser)
router.post("/password", handleForgotPassword)

export default router