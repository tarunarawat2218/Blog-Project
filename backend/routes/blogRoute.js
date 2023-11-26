const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/create', blogController.createBlogPost);

router.get('/list', blogController.getBlogPosts);

router.delete('/delete/:id', blogController.deleteBlogPost);

module.exports = router;
