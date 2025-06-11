import { useEffect, useState } from "react";
import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDeleteCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  return (
    <div className="app-container">
      <button className="theme-switch" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <header className="header">
        <h1>Your task manager</h1>
      </header>
      <div className="task-input-container">
        <TaskInput onAddTask={handleAddTask} />
      </div>
      <div className="filter-buttons">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All tasks
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''} 
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''} 
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      <button className="delete-button" onClick={handleDeleteCompleted}>
        Delete completed tasks
      </button>
      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default App;
