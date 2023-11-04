import "./css/Registration.css";
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegistration = () => {
    // Check if the user already exists in local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.some(user => user.username === username)) {
      setError('Username already exists. Please choose a different one.');
    } else {
      // Create a new user object
      const newUser = { username, password };

      // Store the user in local storage
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Redirect to the login page after successful registration
      navigate('/login');
    }
  }

  return (
    <div>
      <h2>Registration</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegistration}>Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Registration;
