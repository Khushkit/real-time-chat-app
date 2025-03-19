# Real-Time Chat Application

A modern, real-time chat application built with React, Node.js, Socket.IO, and MongoDB. Features a futuristic hacker-themed UI with real-time messaging capabilities.

## Features

- Real-time messaging using Socket.IO
- User authentication with JWT
- Modern, responsive UI with hacker theme
- Animated background effects
- MongoDB for message persistence
- WebSocket for live updates

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express
- Real-time: Socket.IO
- Database: MongoDB
- Authentication: JWT
- Styling: CSS3 with animations

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/real-time-chat-app.git
cd real-time-chat-app
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../chat-frontend
npm install
```

4. Create environment files:

Backend (.env):
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

Frontend (.env):
```
REACT_APP_API_URL=http://localhost:5001
REACT_APP_WS_URL=ws://localhost:5001
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd chat-frontend
npm start
```

3. Open http://localhost:3000 in your browser

## Test Users

- Username: test
- Password: password

## Deployment

This application is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy your application.

## License

MIT 