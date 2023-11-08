const Post = require('../models/postModel')

exports.findBlogById = async (postId) => {
    const post = await Post.findById(postId);
    return post;
}
exports.createBlog = async (title,
    content,
    author,
    category,
    description,
    ) => {
const newPost = new Post({
title,
content,
author,
category,
description,
});

return await newPost.save()
}
exports.getAllPosts = async () => {
    return Post.find();
};