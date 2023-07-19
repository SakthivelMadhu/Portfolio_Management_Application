import React, { useState } from 'react';
import PortfolioManagerList from './components/PortfolioManagerList';
import PortfolioManagerForm from './components/PortfolioManagerForm';
import './App.css';


const App = () => {
  // Sample data for Portfolio Managers
  const portfolioManagersData = [
    {
      "_id": "portfolio_manager_id_1",
      "name": "John Doe",
      "status": true,
      "role": "Administrator",
      // Add other properties if needed
    },
    {
      "_id": "portfolio_manager_id_2",
      "name": "Jane Smith",
      "status": false,
      "role": "Viewer",
      // Add other properties if needed
    },
    // Add more Portfolio Managers as needed
  ];

  const [portfolioManagers, setPortfolioManagers] = useState([]);

  // Function to handle form submission (for both create and edit)
  const handleFormSubmit = (formData) => {
    if (formData._id) {
      // If _id exists, it means we are editing an existing Portfolio Manager
      // Make a PUT request to your backend API to update the existing Portfolio Manager
      // For example:
      fetch(`/api/portfolio-managers/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => {
          // Update the Portfolio Manager in the state with the edited data
          const updatedManagers = portfolioManagers.map(manager =>
            manager._id === formData._id ? data : manager
          );
          setPortfolioManagers(updatedManagers);
        });
    } else {
      // If _id doesn't exist, it means we are creating a new Portfolio Manager
      // Make a POST request to your backend API to create a new Portfolio Manager
      // For example:
      fetch('/api/portfolio-managers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => {
          // Add the newly created Portfolio Manager to the state
          setPortfolioManagers([...portfolioManagers, data]);
        });
    }
  };

  return (
    <div className="App">
      <PortfolioManagerList portfolioManagers={portfolioManagersData} />
      <PortfolioManagerForm
        onSubmit={handleFormSubmit}
        initialFormData={null}
      />
    </div>
  );
};

export default App;
