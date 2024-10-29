// frontend/src/context/TaskContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  // Function to add a new task
  const addTask = async (taskData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/tasks', taskData);
      setTasks((prevTasks) => [...prevTasks, response.data]); // Add new task to state
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:3001/api/tasks/${taskId}`)
      .then(() => setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId)))
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
