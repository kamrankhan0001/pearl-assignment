import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TaskContext } from '../context/TaskContext';

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceType, setRecurrenceType] = useState('Daily');
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      due_date: dueDate,
      is_recurring: isRecurring,
      recurrence_type: isRecurring ? recurrenceType : null,
      recurrence_interval: isRecurring ? recurrenceInterval : null,
      start_date: startDate || null,
      end_date: endDate || null,
    };

    try {
      const response = await axios.post('http://localhost:3001/api/tasks', newTask);
      addTask(response.data); // Add the new task to the context
      // Reset form fields
      setTitle('');
      setDescription('');
      setDueDate('');
      setIsRecurring(false);
      setRecurrenceType('Daily');
      setRecurrenceInterval(1);
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

    return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 mb-4 max-w-lg mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={() => setIsRecurring(!isRecurring)}
          className="mr-2"
        />
        <label className="text-gray-700 font-medium">Recurring Task</label>
      </div>

      {isRecurring && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Recurrence Type</label>
            <select
              value={recurrenceType}
              onChange={(e) => setRecurrenceType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Recurrence Interval</label>
            <input
              type="number"
              value={recurrenceInterval}
              onChange={(e) => setRecurrenceInterval(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              min="1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">End Date (Optional)</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </>
      )}

      <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;

