import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import sendOtpRoute from "./api/send-otp.js";
import verifyOtpRoute from "./api/verify-otp.js";
import forgotPasswordRoute from "./api/forgot-password.js";
import resetPasswordRoute from "./api/reset-password.js";

dotenv.config();

const app = express();

// Allow CORS from frontend
app.use(cors({
  origin: ["https://edge-coding.vercel.app", "http://localhost:3000"], // frontend URLs
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Connect to MongoDB
const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db(process.env.DB_NAME);
app.locals.db = db;

// Routes
app.use("/api/send-otp", sendOtpRoute);
app.use("/api/verify-otp", verifyOtpRoute);
app.use("/api/forgot-password", forgotPasswordRoute);
app.use("/api/reset-password", resetPasswordRoute);

// Root route
app.get("/", (req, res) => res.send("Backend is running"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
