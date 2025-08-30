// backend/routes/communityRoutes.js
import express from "express";
import Post from "../models/postModel.js";

const router = express.Router();

// get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // latest first
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// create new post
router.post("/", async (req, res) => {
  try {
    const { text, user } = req.body;
    const newPost = new Post({ text, user });
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

export default router;
