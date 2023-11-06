const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));

app.get('/', async (req, res) => {
    const posts = await prisma.post.findMany();
    res.render('index', { posts });
  });
  
  const authRoutes = require('./routes/authRoute');

  app.use('/auth', authRoutes);

  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});