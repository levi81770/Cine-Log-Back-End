const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const verifyToken = require("../middleware/verify-token");


router.get("/posts/:postId/comments", async (req, res) => {
  try {
    const comment = await Comment.find({ post: req.params.postId })
      .populate("author", "username")
      .sort({ createdAt: 1 });

    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/posts/:postId/comments", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      author: req.user._id,
      post: req.params.postId
    })
    res.status(201).json(comment)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete("/posts/:postId/comments/:commentId", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) return res.status(404).json({ error: "Comment not found" });

    if (comment.author.toString() !== req.user._id) {
      return res.status(403).json({ error: 'Unauthorized'})
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;