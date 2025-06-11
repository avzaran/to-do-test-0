import React, { useState } from 'react'

function TaskInput({onAddTask}) {
    const [newTaskText, setNewText] = useState("");
    const onAddText = () => {
        if (newTaskText.trim() === ""){
          return}
        onAddTask(newTaskText);
        setNewText("")
}

return (
  <div>
      <input type="text" value={newTaskText} onChange={(e)=> setNewText(e.target.value)} placeholder='Enter your task'/>
      <button onClick={onAddText}>Add task</button>
  </div>
)
}

export default TaskInput