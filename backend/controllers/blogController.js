const Blog = require('../models/postModel'); 
const BlogService = require('../services/blogService');
const ApiResponse = require('../responses/apiResponses');
const ApiResponseMessages = require('../responses/apiResponseMessage')

const createBlogPost = async (req, res) => {
  try {
    const { title, content, author, category, description } = req.body;

    const iconFile = req.files.icon; 
    const coverImageFile = req.files.cover;
    const attachmentFile = req.files.attachment;


    const newBlogPost = await BlogService.createBlog({
      title,
      content,
      author,
      category,
      description,
    });

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



const getBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogService.getAllPosts();
    
    res.render('blogList', { blogs: blogPosts });
  } catch (error) {
    console.error('Error:', error);
    ApiResponse.internalServerError(res, ApiResponseMessages.USER_NOT_FOUND);
  }
};


const deleteBlogPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const blogPost = await BlogService.findBlogById(postId);

    if (!blogPost) {
        ApiResponse.notFound(res, ApiResponseMessages.BLOG_NOT_FOUND);
    }

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
