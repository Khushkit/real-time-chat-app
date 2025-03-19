const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./config');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

// Store io instance in app for use in routes
app.set('io', io);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit if MongoDB connection fails
});

// Handle MongoDB connection errors after initial connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  setTimeout(() => {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }, 5000);
});

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);

// WebSocket connection handling
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('authenticate', (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hacker-chat-secret-key-2024');
      const username = decoded.username;
      connectedUsers.set(socket.id, username);
      console.log('User authenticated:', username);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  });

  socket.on('message', (message) => {
    const username = connectedUsers.get(socket.id);
    if (username) {
      io.emit('message', {
        username,
        content: message,
        timestamp: new Date()
      });
    }
  });

  socket.on('disconnect', () => {
    const username = connectedUsers.get(socket.id);
    if (username) {
      console.log('User disconnected:', username);
      connectedUsers.delete(socket.id);
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('WebSocket server is ready');
});
