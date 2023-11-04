import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import TodoList from "./components/TodoList";
function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const handleRegistration = (user) => {
    // Handle user registration and store it in local storage.
    const updatedUsers = [...registeredUsers, user];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

  };

  const handleLogin = (user) => {
    setAuthenticatedUser(user);
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              authenticatedUser ? (
                <Navigate to="/todo" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/"
            element={
              authenticatedUser ? (
                <Navigate to="/" />
              ) : (
                <Registration
                  onRegistration={handleRegistration}
                  onRegisteredUsers={registeredUsers}
                />
              )
            }
          />

          <Route
            path="/todo"
            element={
              authenticatedUser ? (
                <TodoList user={authenticatedUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
