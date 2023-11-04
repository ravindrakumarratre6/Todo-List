import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Login';
import Registration from './Registration';
import TodoList from './TodoList';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (authenticatedUser) => {
    setUser(authenticatedUser);
  };

  const handleLogout = () => {
    setUser(null);
  };
console.log("user",user)
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Registration />} />
          <Route
            path="/"
            element={user ? <TodoList user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
