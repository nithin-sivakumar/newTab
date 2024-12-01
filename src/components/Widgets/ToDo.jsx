import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

const TodoWidget = () => {
  const theme = useSelector((state) => state.theme.mode);

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() !== "") {
      const newTask = { text: taskInput, completed: false };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskInput("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div
      className={`widget w-[256px] h-48 shadow-lg rounded-lg p-4 text-center flex flex-col gap-2 ${
        theme === "light" ? "bg-[#00000030]" : "bg-[#61546b]"
      }`}
    >
      <h2
        className={`text-xl font-bold ${
          theme === "light" ? "text-black" : "text-[#FFF9BF]"
        }`}
      >
        To-Do List
      </h2>

      {/* Task Input */}
      <form onSubmit={addTask} className="flex items-center gap-2 mb-2">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className={`w-full bg-transparent px-2 py-1 rounded focus-within:outline-none duration-200 border ${
            theme === "light"
              ? "border-black placeholder:text-black"
              : "border-white placeholder:text-[#FFF9BF]"
          }`}
          placeholder="Add a task..."
        />
        <button
          type="submit"
          className={`bg-[#00000030] font-semibold px-2 py-1 rounded hover:scale-110 active:scale-95 duration-200 ${
            theme === "light" ? "text-black" : "text-[#FFF9BF]"
          }`}
        >
          Add
        </button>
      </form>

      {/* Tasks List */}
      <div className="flex flex-col gap-2 px-1 overflow-auto">
        {tasks.length === 0 ? (
          <p
            className={`text-sm ${
              theme === "light" ? "text-black" : "text-[#FFF9BF]"
            }`}
          >
            No tasks added yet.
          </p>
        ) : (
          tasks.map((task, index) => (
            <div
              key={index}
              className={`flex items-center justify-between ${
                theme === "light" ? "text-black" : "text-[#FFF9BF]"
              }`}
            >
              <div
                className="flex items-center gap-2"
                onClick={() => toggleTaskCompletion(index)}
              >
                {task.completed ? (
                  <BsCheckCircle className="text-green-500" />
                ) : (
                  <BsCircle className="text-gray-500" />
                )}
                <span
                  className={`${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <FaTrash
                className={`hover:scale-105 ${
                  theme === "light" ? "text-black" : "text-[#FFF9BF]"
                } cursor-pointer`}
                onClick={() => deleteTask(index)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoWidget;
