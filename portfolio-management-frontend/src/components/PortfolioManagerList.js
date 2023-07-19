import React from 'react';
import './PortfolioManagerList.css'; // Import the CSS file

const PortfolioManagerList = (props) => {
  const { portfolioManagers } = props;

  return (
    <div>
      <h1>Portfolio Managers</h1>
      {/* Display the list of Portfolio Managers */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {portfolioManagers.map(manager => (
            <tr key={manager._id}>
              <td>{manager.name}</td>
              <td>{manager.status ? 'Active' : 'Inactive'}</td>
              <td>{manager.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioManagerList;
