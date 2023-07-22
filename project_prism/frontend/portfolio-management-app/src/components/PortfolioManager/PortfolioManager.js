// project_prism/frontend/src/components/PortfolioManager/PortfolioManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PortfolioManager = () => {
  const [portfolioManagers, setPortfolioManagers] = useState([]);
  const [newPortfolioManager, setNewPortfolioManager] = useState({
    name: '',
    status: false,
    role: 'Administrator',
    bio: '',
    start_date: ''
  });

  const fetchPortfolioManagers = async () => {
    try {
      const response = await axios.get('/api/portfolio_managers');
      setPortfolioManagers(response.data);
    } catch (error) {
      console.error('Error fetching Portfolio Managers:', error);
    }
  };

  useEffect(() => {
    fetchPortfolioManagers();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPortfolioManager({ ...newPortfolioManager, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/portfolio_managers', newPortfolioManager);
      fetchPortfolioManagers();
      setNewPortfolioManager({
        name: '',
        status: false,
        role: 'Administrator',
        bio: '',
        start_date: ''
      });
    } catch (error) {
      console.error('Error adding Portfolio Manager:', error);
    }
  };

  return (
    <div>
      <h2>Portfolio Managers</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={newPortfolioManager.name} onChange={handleInputChange} required />
        </label>
        <label>
          Status:
          <input type="checkbox" name="status" checked={newPortfolioManager.status} onChange={() => setNewPortfolioManager({ ...newPortfolioManager, status: !newPortfolioManager.status })} />
        </label>
        <label>
          Role:
          <select name="role" value={newPortfolioManager.role} onChange={handleInputChange} required>
            <option value="Administrator">Administrator</option>
            <option value="Viewer">Viewer</option>
          </select>
        </label>
        <label>
          Bio:
          <textarea name="bio" value={newPortfolioManager.bio} onChange={handleInputChange} />
        </label>
        <label>
          Start Date:
          <input type="date" name="start_date" value={newPortfolioManager.start_date} onChange={handleInputChange} required />
        </label>
        <button type="submit">Add Portfolio Manager</button>
      </form>
      <ul>
        {portfolioManagers.map((manager) => (
          <li key={manager.id}>
            <strong>{manager.name}</strong> - {manager.role} - {manager.status ? 'Active' : 'Inactive'} - {manager.start_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioManager;
