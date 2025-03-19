import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import AnimatedBackground from './components/AnimatedBackground';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <div className="app-container">
      <AnimatedBackground />
      {token ? (
        <>
          <header className="header">
            <h1>Hacker Chat</h1>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </header>
          <Chat token={token} />
        </>
      ) : (
        <>
          <header className="header">
            <h1>Hacker Chat</h1>
          </header>
          {showRegister ? (
            <Register onRegister={handleLogin} />
          ) : (
            <Login onLogin={handleLogin} />
          )}
          <div className="auth-switch">
            <button onClick={() => setShowRegister(!showRegister)}>
              {showRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
