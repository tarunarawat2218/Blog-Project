const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

