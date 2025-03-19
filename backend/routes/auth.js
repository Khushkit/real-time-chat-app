const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Secret key should be in environment variables in production
const SECRET_KEY = 'chat-app-secret-123';

// In-memory user store (in production, this should be in a database)
const users = [
  { id: 1, username: 'test', password: 'password' },
  { id: 2, username: 'john', password: 'john123' },
  { id: 3, username: 'alice', password: 'alice123' }
];

// Login Route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT Token
  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: '24h' }
  );

  res.json({ token, username: user.username });
});

// Register Route
router.post('/register', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if username already exists
    if (users.some(u => u.username === username)) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Add new user with a unique ID
    const newUser = {
      id: users.length + 1,
      username,
      password
    };
    users.push(newUser);

    // Generate JWT Token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.status(201).json({ token, username: newUser.username });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error during registration' });
  }
});

module.exports = router;
