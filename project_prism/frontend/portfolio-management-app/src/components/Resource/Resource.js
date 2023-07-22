// project_prism/frontend/src/components/Resource/Resource.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Resource = () => {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({
    name: '',
    task_id: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [sortByTaskID, setSortByTaskID] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resourcesPerPage] = useState(5);

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


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = () => {
    setSortByTaskID(!sortByTaskID);
  };

  // Pagination
  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = resources.slice(indexOfFirstResource, indexOfLastResource);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <div>
        <input type="text" placeholder="Search by Resource Name" value={searchTerm} onChange={handleSearch} />
        <button onClick={handleSort}>Sort by Task ID</button>
      </div>
      <ul>
        {currentResources.map((resource) => (
          <li key={resource.id}>
            <strong>{resource.name}</strong> - Task ID: {resource.task_id}
          </li>
        ))}
      </ul>
      <div>
        {/* Pagination */}
      </div>

    </div>
  );
};

export default Resource;
