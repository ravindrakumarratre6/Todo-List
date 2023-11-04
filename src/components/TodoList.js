import "../css/Todolist.css";

import React, { useState, useEffect } from "react";

function TodoList({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAddTask = () => {
    if (newTaskText.trim() === "") return;

    const taskId = Date.now(); // Unique ID using timestamp
    const newTask = {
      id: taskId,
      text: newTaskText,
      userId: user.username,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);

    setNewTaskText("");
  };

  const handleEditTask = (taskId, newText) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, text: newText };
      }
      return task;
    });

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <div className="todo-container">
      <div className="todo-list-logout">
        <button onClick={onLogout}>Logout</button>
      </div>
      <div className="todo-list-heading">
        <h2>Todo List for {user.username}</h2>
      </div>
      <ul className="todo-list-conatainer">
        {tasks.map((task) => (
          <li key={task.id} className="todo-list-li">
            {task.completed ? <s>{task.text}</s> : task.text}
            <button onClick={() => handleEditTask(task.id, "New Text")}>
              Edit
            </button>
            <button onClick={() => handleToggleComplete(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="todo-list-input">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
      </div>
      <div className="todo-list-buttton">
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
}

export default TodoList;
