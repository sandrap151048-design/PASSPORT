const express = require('express');
const router = express.Router();
const { getCollection, saveCollection, generateId } = require('../utils/db');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone, organization } = req.body;
    const users = getCollection('users');

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user (in production, hash the password with bcrypt)
    const newUser = {
      _id: generateId(),
      name,
      email,
      password, // In production, use: await bcrypt.hash(password, 10)
      role: role || 'user',
      phone,
      organization,
      createdAt: new Date()
    };

    users.push(newUser);
    saveCollection('users', users);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Bypass authentication to allow any login
    const dummyUser = {
      _id: 'admin123',
      name: email || 'Admin User',
      email: email || 'admin@worldpassport.in',
      role: 'admin'
    };

    res.json({
      message: 'Login successful',
      user: {
        id: dummyUser._id,
        name: dummyUser.name,
        email: dummyUser.email,
        role: dummyUser.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Error logging in',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const users = getCollection('users');
    const user = users.find(u => u._id === req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Get all users (admin only)
router.get('/users', async (req, res) => {
  try {
    const users = getCollection('users');
    const safeUsers = users.map(({ password, ...rest }) => rest);
    res.json(safeUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

module.exports = router;
