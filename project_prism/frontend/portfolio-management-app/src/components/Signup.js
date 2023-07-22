import React, { useState } from 'react';
import { signup } from './api';
import './log.css';
const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signup(formData);
      console.log(response.data.message); // Registration success message
      // Redirect to a new page or show a success message to the user
    } catch (error) {
      setError(error.response.data.message); // Registration error message
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select name="role"  onChange={handleInputChange}>
          <option value="Administrator">Administrator</option>
          <option value="Viewer">Viewer</option>
          {/* Add more role options if needed */}
        </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
