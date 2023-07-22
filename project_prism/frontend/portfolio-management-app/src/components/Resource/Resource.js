// project_prism/frontend/src/components/Resource/Resource.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Resource = () => {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({
    name: '',
    task_id: ''
  });

  const fetchResources = async () => {
    try {
      const response = await axios.get('/api/resources');
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching Resources:', error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewResource({ ...newResource, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/resources', newResource);
      fetchResources();
      setNewResource({
        name: '',
        task_id: ''
      });
    } catch (error) {
      console.error('Error adding Resource:', error);
    }
  };

  return (
    <div>
      <h2>Resources</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Resource Name:
          <input type="text" name="name" value={newResource.name} onChange={handleInputChange} required />
        </label>
        <label>
          Task ID:
          <input type="number" name="task_id" value={newResource.task_id} onChange={handleInputChange} required />
        </label>
        <button type="submit">Add Resource</button>
      </form>
      <ul>
        {resources.map((resource) => (
          <li key={resource.id}>
            <strong>{resource.name}</strong> - Task ID: {resource.task_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resource;
