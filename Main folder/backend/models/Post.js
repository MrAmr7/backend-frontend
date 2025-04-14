const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, default: true },
  },
  { timestamps: true } // This will automatically add `createdAt` and `updatedAt`
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
