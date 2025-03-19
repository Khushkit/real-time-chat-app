const express = require('express');
const Message = require('../models/Message');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get message history
router.get('/', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: 1 })
      .limit(50); // Limit to last 50 messages for performance
    res.json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Send a new message
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Message content is required' });
    }

    const newMessage = new Message({
      content: content.trim(),
      sender: req.user.username,
    });

    await newMessage.save();

    // Emit the new message to all connected clients
    req.app.get('io').emit('message', newMessage);

    res.status(201).json({ 
      message: 'Message sent successfully',
      newMessage 
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
