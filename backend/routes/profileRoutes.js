import express from "express";
import { buildRecommendations } from "../utils/recommendations.js";

const router = express.Router();

// in-memory storage (replace with MongoDB later if you want)
const profiles = {};

// Save or update profile
router.post("/", (req, res) => {
  const { email, ...profile } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email required" });
  }

  profiles[email] = profile; // save in memory
  console.log("📩 Profile saved:", email, profile);

  res.json({ success: true, profile });
});

// Get recommendations
router.get("/recommendations", (req, res) => {
  const { email } = req.query;

  if (!email || !profiles[email]) {
    return res.json({ success: true, recommendations: [] });
  }

  const recs = buildRecommendations(profiles[email]);
  res.json({ success: true, recommendations: recs });
});

export default router;
