import React from 'react'

function TaskItem({task, onToggle, onDelete}) {
  
  return (
      <li>
        <input type="checkbox" checked={task.completed} onChange={()=> onToggle(task.id)} />
        <span style={{textDecoration: task.completed? "line-through":"none"}}>{task.text}</span>
        <button onClick={()=>onDelete(task.id)}>Delete task</button>
      </li>
  )
}

export default TaskItem