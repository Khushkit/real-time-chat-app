# Real-time Chat Application

A modern real-time chat application built with React, Node.js, Socket.IO, and MongoDB.

## Features

- Real-time messaging
- User authentication
- Modern UI with animations
- Responsive design
- WebSocket communication

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express
- Real-time Communication: Socket.IO
- Database: MongoDB
- Authentication: JWT

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/khushkit/real-time-chat-app.git
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
JWT_SECRET=your-secret-key
MONGODB_URI=your-mongodb-uri
PORT=5001
FRONTEND_URL=http://localhost:3000
```

Frontend (.env):
```
REACT_APP_API_URL=http://localhost:5001
REACT_APP_WS_URL=ws://localhost:5001
```

### Running the Application

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

The application will be available at http://localhost:3000

## Test Users

You can use these test accounts to try the application:
- Username: test, Password: password
- Username: john, Password: john123
- Username: alice, Password: alice123

![jobit](https://github.com/user-attachments/assets/7ff76298-446a-4c0c-9d5d-beaa4420ff57)
