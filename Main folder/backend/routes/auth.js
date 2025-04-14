const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const cloudinary = require('../utils/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const User = require('../models/User');
const Post = require('../models/Post');

const verifyToken = require('../middleware/authMiddleware');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'restroapp', 
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], 
  },
});

const upload = multer({ storage });


router.post(
  '/createuser',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const { username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(409).json({ message: 'User already exists.' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
      console.error('Error in /createuser:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password.' });

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: { email: user.email, username: user.username },
    });
  } catch (error) {
    console.error('Error in /login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


router.post(
  '/createpost',
  verifyToken,
  upload.single('image'), 
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, content } = req.body;
    const userId = req.user.id;

    try {
      const existingPost = await Post.findOne({ title, userId });
      if (existingPost) return res.status(400).json({ message: 'Post with this title already exists.' });

      const newPost = new Post({
        userId,
        title,
        content,
        imageUrl: req.file ? req.file.path : null,
      });
      await newPost.save();

      res.status(201).json({
        message: 'Post created successfully.',
        post: newPost,
      });
    } catch (error) {
      console.error('Error in /createpost:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
);

router.get('/posts', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await Post.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

router.post('/logout', (req, res) => {
  res.status(200).json({
    message: 'Logout successful. Please delete your token on the client-side.',
  });
});

router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'You are authorized.', user: req.user });
});


// Edit Post
router.put(
  '/editpost/:id',
  verifyToken,
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const postId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user.id;

    try {
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ message: 'Post not found.' });
      if (post.userId.toString() !== userId)
        return res.status(403).json({ message: 'Not authorized to edit this post.' });

      post.title = title;
      post.content = content;
      if (req.file) {
        post.imageUrl = req.file.path;
      }

      await post.save();

      res.status(200).json({ message: 'Post updated successfully.', post });
    } catch (error) {
      console.error('Error in /editpost:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
);

// Delete Post
router.delete('/deletepost/:id', verifyToken, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    // Ensure the post belongs to the user
    if (post.userId.toString() !== userId)
      return res.status(403).json({ message: 'Not authorized to delete this post' });

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
