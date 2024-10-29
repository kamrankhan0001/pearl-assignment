import React, { useContext } from 'react';

import { TaskContext } from '../context/TaskContext';



const TaskList = () => {
  const { tasks, deleteTask } = useContext(TaskContext);
  
  return (
    <div className="task-list max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="bg-gray-100 p-4 mb-2 rounded shadow">
            <h3 className="font-semibold text-lg">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">Due: {task.due_date}</p>
            {task.is_recurring && (
              <p className="text-sm text-indigo-500">
                Recurring: {task.recurrence_type} every {task.recurrence_interval} units
              </p>
            )}
            

            <button
            onClick={() => deleteTask(task.id)}
            className="bg-red-500 text-white px-4 py-2 mt-3 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Delete Task
          </button>
          </div>
        ))
      ) : (
        <p>No tasks available. Start by adding a new task!</p>
      )}
    </div>
  );
};

export default TaskList;



