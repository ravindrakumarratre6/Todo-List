import "./css/Login.css";

import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    console.log(
      "Attempting login with username:",
      username,
      "and password:",
      password
    );
    // Simulate authentication with hardcoded credentials (replace with actual authentication logic)
    if (username === username && password === password) {
      // Authentication successful, call onLogin with the authenticated user's username
      onLogin(username);
    } else {
      // Authentication failed, display an error message
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-heading-container">
        <h2 className="login-heading">Login</h2>
      </div>
      <div className="login-input">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="login-input">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="login-button">
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
