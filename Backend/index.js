import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import registrationRoutes from "./router/registrationRoutes.js";
import adminRoutes from "./router/adminRouter.js";
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());



app.use("/api/user", registrationRoutes);
app.use("/api/admin", adminRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
