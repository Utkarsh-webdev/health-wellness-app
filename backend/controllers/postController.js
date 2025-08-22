import Post from "../models/Post.js";

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { content, category } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const post = new Post({
      user: req.user._id,
      content,
      category,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like or Unlike a post
// @route   PUT /api/posts/:id/like
// @access  Private
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(req.user._id)) {
      // Unlike
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    } else {
      // Like
      post.likes.push(req.user._id);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
