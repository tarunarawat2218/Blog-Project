const Blog = require('../models/postModel'); 
const BlogService = require('../services/blogService');
const ApiResponse = require('../responses/apiResponses');
const ApiResponseMessages = require('../responses/apiResponseMessage')

// Create a new blog post
const createBlogPost = async (req, res) => {
  try {
    // Extract data from the form fields
    const { title, content, author, category, description } = req.body;

    // You can access uploaded files as well
    const iconFile = req.files.icon; // Assuming you have set up middleware for file uploads
    const coverImageFile = req.files.cover;
    const attachmentFile = req.files.attachment;

    // Process and store the files as needed

    // Create a new blog post
    const newBlogPost = await BlogService.createBlog({
      title,
      content,
      author,
      category,
      description,
      // You can also include file paths or other data related to the uploaded files
    });

    // Send a success response
    ApiResponse.created(
      res,
      { blog: newBlogPost },
      ApiResponseMessages.BLOG_ADDED_SUCCESSFULLY
    );
  } catch (error) {
    console.error('Error:', error);
    ApiResponse.internalServerError(res, ApiResponseMessages.INTERNAL_SERVER_ERROR);
  }
};


// Retrieve a list of blog posts

const getBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogService.getAllPosts();
    
    // Render the 'blogList' EJS template with the 'blogPosts' data
    res.render('blogList', { blogs: blogPosts });
  } catch (error) {
    console.error('Error:', error);
    ApiResponse.internalServerError(res, ApiResponseMessages.USER_NOT_FOUND);
  }
};


// Delete a specific blog post by ID
const deleteBlogPost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Check if the blog post with the given ID exists
    const blogPost = await BlogService.findBlogById(postId);

    if (!blogPost) {
        ApiResponse.notFound(res, ApiResponseMessages.BLOG_NOT_FOUND);
    }

    // Delete the blog post
    await blogPost.remove();
    ApiResponse.success(
        res,
        ApiResponseMessages.BLOG_REMOVED_SUCCESSFULLY
    );  } catch (error) {
    console.error('Error:', error);
    ApiResponse.internalServerError(res, ApiResponseMessages.USER_NOT_FOUND) 
  }
};

module.exports = { createBlogPost, getBlogPosts, deleteBlogPost };
