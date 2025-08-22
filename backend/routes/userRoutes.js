import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route (requires JWT)
router.get("/profile", protect, getProfile);

export default router;
