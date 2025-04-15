const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    price: { type: Number, required: true }, // 👈 Added price field
    imageUrl: { type: String, default: true },
  },
  { timestamps: true } 
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
