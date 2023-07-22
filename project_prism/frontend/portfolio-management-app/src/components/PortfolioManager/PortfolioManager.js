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

  const [currentPage, setCurrentPage] = useState(1);
  const [portfolioManagersPerPage, setPortfolioManagersPerPage] = useState(5);


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


  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const indexOfLastPortfolioManager = currentPage * portfolioManagersPerPage;
  const indexOfFirstPortfolioManager = indexOfLastPortfolioManager - portfolioManagersPerPage;
  const currentPortfolioManagers = portfolioManagers.slice(indexOfFirstPortfolioManager, indexOfLastPortfolioManager);

  const totalPages = Math.ceil(portfolioManagers.length / portfolioManagersPerPage);

  const handleNameFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === '') {
      fetchPortfolioManagers(); // Reset to all portfolio managers if no filter entered
    } else {
      const filteredPortfolioManagers = portfolioManagers.filter((manager) =>
        manager.name.toLowerCase().includes(searchTerm)
      );
      setPortfolioManagers(filteredPortfolioManagers);
    }
  };

  const handleStartDateSort = () => {
    const sortedPortfolioManagers = [...portfolioManagers].sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    setPortfolioManagers(sortedPortfolioManagers);
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
      <div>
        <label>
          Search by Name:
          <input type="text" onChange={handleNameFilter} />
        </label>
        <button onClick={handleStartDateSort}>Sort by Start Date</button>
      </div>
      <ul>
        {currentPortfolioManagers.map((manager) => (
          <li key={manager.id}>
            <strong>{manager.name}</strong> - {manager.status ? 'Active' : 'Inactive'} - {manager.role} - {manager.start_date}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev Page
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default PortfolioManager;
