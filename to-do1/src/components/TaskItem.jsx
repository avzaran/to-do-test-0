import React from "react";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className="task-text" style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default TaskItem;
