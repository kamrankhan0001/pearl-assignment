import React, { useContext } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { TaskContext } from '../context/TaskContext';


const Home = () => {
  const { setTasks } = useContext(TaskContext);

  return (
    <div className="home-container min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">To-Do List Application</h1>
      <TaskForm onAddTask={(newTask) => setTasks((prevTasks) => [...prevTasks, newTask])} />
      <TaskList />
     
    </div>
  );
};

export default Home;
