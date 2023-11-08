const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Create a new blog post
router.post('/create', blogController.createBlogPost);

// Retrieve a list of blog posts
router.get('/list', blogController.getBlogPosts);

// Delete a specific blog post by ID
router.delete('/delete/:id', blogController.deleteBlogPost);

module.exports = router;
