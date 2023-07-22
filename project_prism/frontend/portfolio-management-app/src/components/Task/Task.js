// project_prism/frontend/src/components/Task/Task.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: '',
    status: 'To Do',
    project_id: ''
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching Tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/tasks', newTask);
      fetchTasks();
      setNewTask({
        name: '',
        status: 'To Do',
        project_id: ''
      });
    } catch (error) {
      console.error('Error adding Task:', error);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Task Name:
          <input type="text" name="name" value={newTask.name} onChange={handleInputChange} required />
        </label>
        <label>
          Status:
          <select name="status" value={newTask.status} onChange={handleInputChange} required>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label>
          Project ID:
          <input type="number" name="project_id" value={newTask.project_id} onChange={handleInputChange} required />
        </label>
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.name}</strong> - {task.status} - Project ID: {task.project_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
