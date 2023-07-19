import React, { useState } from 'react';
import './PortfolioManagerForm.css'; // Import the CSS file

const PortfolioManagerForm = ({ onSubmit, initialFormData }) => {
  const [formData, setFormData] = useState(initialFormData);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>{initialFormData ? 'Edit Portfolio Manager' : 'Create Portfolio Manager'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for name, status, role, bio, and startDate */}
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />

        <label>Status:</label>
        <input type="checkbox" name="status" checked={formData.status} onChange={handleChange} />

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="Administrator">Administrator</option>
          <option value="Viewer">Viewer</option>
          {/* Add more role options if needed */}
        </select>

        <label>Bio:</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange} />

        <label>Start Date:</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />

        <button type="submit">{initialFormData ? 'Save Changes' : 'Create'}</button>
      </form>
    </div>
  );
};

export default PortfolioManagerForm;
