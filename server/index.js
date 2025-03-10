import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouters from "./routes/AuthRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRouters);
app.use(
  "/uploads/profile",
  express.static(path.join(__dirname, "uploads/profile"))
);

// Start Server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
});

// MongoDB Connection
mongoose
  .connect(databaseURL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((error) => console.error("MongoDB Connection Error ❌", error));
