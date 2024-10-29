import React from 'react';

const TaskItem = ({ task }) => (
  <div className="task-item p-4 border">
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <p>Due: {task.dueDate}</p>
    {task.isRecurring && <p>Recurring: {task.recurrencePattern.frequency}</p>}
  </div>
);

export default TaskItem;
