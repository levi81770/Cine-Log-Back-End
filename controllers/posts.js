const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const verifyToken = require("../middleware/verify-token");


router.get("/movies/:movieId/posts", async (req, res) => {
  try {
    const post = await Post.find({ movie: req.params.movieId })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/movies/:movieId/posts", verifyToken, async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      author: req.user._id,
      movie: req.params.movieId
    })
    res.status(201).json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put("/posts/:postId", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)

    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.author.toString() !== req.user._id) {
      return res.status(403).json({ error: 'Unauthorized'})
    }

    post.content = req.body.content
    await post.save()

    res.json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete("/posts/:postId", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.author.toString() !== req.user._id) {
      return res.status(403).json({ error: 'Unauthorized'})
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;