const userModel = require('../models/userModel'); // Import your user model
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser({ email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'User registration failed' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // Set up user session or issue a token for authentication
      // Replace this with your preferred authentication method
      // For example, you can use Passport.js for authentication.
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

const logoutUser = (req, res) => {
  // Implement your logout logic here (e.g., destroying the session or revoking the token)
  // Depending on your authentication method
  res.json({ message: 'Logout successful' });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
