const express = require('express');
const app = express();
const path = require('path');
const getBlogPosts = require('./controllers/blogController').getBlogPosts;
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/blogList', getBlogPosts);
app.get('/createBlog', (req, res) => {
    res.render('createBlog'); 
});



const authRoutes = require('./routes/authRoute'); 
const blogRoutes = require('./routes/blogRoute'); 



app.use('/auth', authRoutes);
app.use('/blog', blogRoutes);


module.exports = app;
