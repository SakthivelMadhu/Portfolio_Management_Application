// project_prism/frontend/src/components/Project/Project.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    project_name: '',
    status: 'Planned',
    start_date: '',
    end_date: '',
    portfolio_manager_id: ''
  });

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching Projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/projects', newProject);
      fetchProjects();
      setNewProject({
        project_name: '',
        status: 'Planned',
        start_date: '',
        end_date: '',
        portfolio_manager_id: ''
      });
    } catch (error) {
      console.error('Error adding Project:', error);
    }
  };

  return (
    <div>
      <h2>Projects</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Project Name:
          <input type="text" name="project_name" value={newProject.project_name} onChange={handleInputChange} required />
        </label>
        <label>
          Status:
          <select name="status" value={newProject.status} onChange={handleInputChange} required>
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label>
          Start Date:
          <input type="date" name="start_date" value={newProject.start_date} onChange={handleInputChange} required />
        </label>
        <label>
          End Date:
          <input type="date" name="end_date" value={newProject.end_date} onChange={handleInputChange} />
        </label>
        <label>
          Portfolio Manager ID:
          <input type="number" name="portfolio_manager_id" value={newProject.portfolio_manager_id} onChange={handleInputChange} required />
        </label>
        <button type="submit">Add Project</button>
      </form>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong>{project.project_name}</strong> - {project.status} - {project.start_date} - {project.end_date} - PM ID: {project.portfolio_manager_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Project;
