import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import { requireAuth } from "./middlewares/authMiddleware.js";
import { requireRole } from "./middlewares/roleMiddleware.js";


const app = express();

app.use(cors());
app.use(express.json());

// Connect database
connectDB();

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// 🔐 Test protected route (any logged-in user)
app.get("/api/protected", requireAuth, (req, res) => {
  res.json({
    message: "Authenticated user",
    userId: req.user.id,
    role: req.role,
  });
});

// 🔐 Admin-only route
app.get(
  "/api/admin-only",
  requireAuth,
  requireRole("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
