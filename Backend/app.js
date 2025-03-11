import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import registrationRoutes from "./router/registrationRoutes.js";
import loginRoutes from "./router/loginRoutes.js"
import adminRoutes from "./router/adminRouter.js";
import uploadRoutes from "./router/uploadProductRouter.js"
import showAllProductRoutes from "./router/showAllProductRouter.js"
dotenv.config();

const app = express();


app.use(cors({
    origin: ['https://hardware-hive-zqfk.vercel.app', 'https://hardware-hive-8liq.vercel.app'],
    credentials: true
}));
// app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/user", registrationRoutes);
app.use("/api/login/user", loginRoutes )
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/showAllProduct", showAllProductRoutes)

connectDB();

export default app;

