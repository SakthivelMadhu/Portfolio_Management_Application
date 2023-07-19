// ProjectList.js
import React, { useState, useEffect } from 'react';
import './ProjectList.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  // Fetch all projects from the API
  useEffect(() => {
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            {/* Add other table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project._id}>
              <td>{project.name}</td>
              <td>{project.status}</td>
              <td>{project.startDate}</td>
              <td>{project.endDate}</td>
              {/* Add other table cells for additional properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
