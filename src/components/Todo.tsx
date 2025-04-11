import React, { useState, FormEvent } from "react";
import ThemeToggle from "./ThemeToggle";
import "./Todo.scss";
import { FaCheckSquare, FaRegSquare, FaTimes } from "react-icons/fa";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdTime: string;
}
interface TodoProps {
  onThemeToggle: () => void;
}
const Todo: React.FC<TodoProps> = ({ onThemeToggle }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Здесь добавить логику добавления задачи
    if (inputValue.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdTime: new Date().toLocaleTimeString(),
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const toggleComplete = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Список задач</h1>
        <ThemeToggle onClick={onThemeToggle} />
      </div>

      <form className="input-section" onSubmit={handleSubmit}>
        <input
          type="text"
          className="task-input"
          placeholder="Введите новую задачу"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="add-button">
          Добавить
        </button>
      </form>

      <ul className="tasks-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <span
              onClick={() => toggleComplete(task.id)}
              className="check-icon"
            >
              {task.completed ? (
                <FaCheckSquare color="gray" />
              ) : (
                <FaRegSquare />
              )}
            </span>
            <span className="task-text">{task.text}</span>
            <span className="task-time">{task.createdTime}</span>
            <span onClick={() => deleteTask(task.id)} className="delete-icon">
              <FaTimes color="red" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
