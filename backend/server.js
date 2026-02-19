import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sendOtpRoute from "./api/send-otp.js";
import verifyOtpRoute from "./api/verify-otp.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/send-otp", sendOtpRoute);
app.use("/api/verify-otp", verifyOtpRoute);

// Test route
app.get("/", (req, res) => res.send("Server is running"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
