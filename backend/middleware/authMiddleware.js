const jwt = require('jsonwebtoken');

const SECRET_KEY = 'chat-app-secret-123';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'Access Denied: No token provided' });
  }

  // ✅ Bearer token se token ko extract karo
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access Denied: Invalid token format' });
  }

  try {
    // ✅ Token ko verify karo
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // ✅ User ko request ke saath attach karo
    next(); // ✅ Aage badho
  } catch (error) {
    console.error('Invalid token:', error.message);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
