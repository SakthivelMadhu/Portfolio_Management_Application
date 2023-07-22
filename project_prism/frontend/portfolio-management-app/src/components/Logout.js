import React from 'react';
import { logout } from './api';
import './log.css';
const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log(response.data.message); // Logout success message
      // Redirect to the login page or show a success message to the user
    } catch (error) {
      console.error(error.response.data.message); // Logout error message
      // Show an error message to the user
    }
  };

  return (
    <div className="logout">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
