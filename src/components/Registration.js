// Registration.js
import "../css/Registration.css"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Registration({ onRegistration, onRegisteredUsers }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState(onRegisteredUsers);
  const navigate = useNavigate();
  // Load registeredUsers from local storage when the component mounts
  useEffect(() => {
    const storedUsers = localStorage.getItem("registeredUsers");
    if (storedUsers) {
      setRegisteredUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleRegistration = () => {
    // Validation (e.g., username and password requirements)
    if (username.trim() === "" || password.trim() === "") {
      setError("Please provide both a username and password.");
      return;
    }

    // Check if the username is already registered
    if (registeredUsers.some((user) => user.username === username)) {
      setError(
        "This username is already registered. Please choose another one."
      );
      return;
    }

    // If validation passes, add the user to the registeredUsers state
    const newUser = { username, password };
    const updatedUsers = [...registeredUsers, newUser];

    // Update the registeredUsers state and save it to local storage
    setRegisteredUsers(updatedUsers);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    // Call the onRegistration function to inform the parent component
    onRegistration(newUser);
    navigate("/Login");
  };

  return (
    <div className="registration-container">
      <div className="registration-heading">
        <h2>Registration</h2>
      </div>
      <div className="registration-input">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="registration-input">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="registration-button">
        <button onClick={handleRegistration}>Register</button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Registration;
