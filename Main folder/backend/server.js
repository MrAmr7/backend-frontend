const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require('./middleware/logger');
const authRoutes = require('./routes/auth');
const verifyToken = require('./middleware/authMiddleware');  // Add the JWT middleware
const multer = require('multer');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads folder exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Store images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp for unique filenames
  },
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Use authRoutes for authentication routes
app.use('/api', authRoutes);

// MongoDB connection
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection failed:', err));

// Post Schema (added validation for extra fields like price, category, etc.)
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  ingredients: { type: String, required: true },
  preparationTime: { type: Number, required: true },
  contactInfo: { type: String, required: true },
  isVegetarian: { type: Boolean, required: true },
  image: { type: String, required: true }, // Store the image path
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

// Route for creating a post (protected by verifyToken)
app.post('/api/createpost', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      ingredients: req.body.ingredients,
      preparationTime: req.body.preparationTime,
      contactInfo: req.body.contactInfo,
      isVegetarian: req.body.isVegetarian,
      image: req.file ? req.file.path : '', // Save the image path if there's a file
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
