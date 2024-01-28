import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import MainField from "./InputField";
import SearchFilter from "./SearchFilter";
import TaskList from "./TaskList";
import {
  auth,
  onAuthStateChanged,
  browserSessionPersistence,
  setPersistence,
} from "../Auth/firebase.config";

const TaskMain = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [originalTasks, setOriginalTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [filterComplete, setFilterComplete] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [fuse, setFuse] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setPersistence(auth, browserSessionPersistence);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
        setUser(user);
        fetchTasks(user.uid);
        fetchUsers();
      } else {
        setAuthenticated(false);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    setFuse(new Fuse(tasks, { keys: ["title"] }));
  }, [tasks]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5001/task-management-9ecac/us-central1/app/api/users"
      );
      const userData = await response.json();
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchTasks = async (userId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5001/task-management-9ecac/us-central1/app/api/tasks/${userId}`
      );
      const data = await response.json();
      setTasks(data);
      setOriginalTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleAddTask = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5001/task-management-9ecac/us-central1/app/api/createTask/${user.uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newTask,
            userId: user.uid,
          }),
        }
      );

      if (response.ok) {
        setTasks([...tasks, newTask]);
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }

    setNewTask({ title: "", description: "", dueDate: "" });
  };

  const handleEditTask = (index) => {
    setNewTask({ ...tasks[index] });
    setEditingTask(index);
  };

  const handleUpdateTask = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5001/task-management-9ecac/us-central1/app/api/updateTask/${user.uid}/${tasks[editingTask].id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newTask,
            userId: user.uid,
            id: tasks[editingTask].id,
          }),
        }
      );

      if (response.ok) {
        const updatedTasks = [...tasks];
        updatedTasks[editingTask] = newTask;
        setTasks(updatedTasks);
      } else {
        console.error(
          "Failed to update task. Server returned:",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }

    setNewTask({ title: "", description: "", dueDate: "" });
    setEditingTask(null);
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5001/task-management-9ecac/us-central1/app/api/deleteTask/${user.uid}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Task deleted successfully");
        fetchTasks(user.uid);
      } else if (response.status === 404) {
        console.error("Task not found");
      } else {
        console.error("Failed to delete task. Response:", response);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCheckboxChange = async (id, completed) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5001/task-management-9ecac/us-central1/app/api/updateTask/${user.uid}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !completed }),
        }
      );

      if (response.ok) {
        const updatedTasks = tasks.map((task) =>
          task.id === id ? { ...task, completed: !completed } : task
        );
        setTasks(updatedTasks);
      } else {
        const errorMessage = await response.text();
        console.error(
          "Failed to update task. Status:",
          response.status,
          "Message:",
          errorMessage
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleFilterChange = (value) => {
    setFilterComplete(value);

    let filteredTasks = [];

    if (value === "all") {
      filteredTasks = originalTasks;
    } else {
      filteredTasks = originalTasks.filter(
        (task) =>
          (value === "complete" && task.completed) ||
          (value === "incomplete" && !task.completed)
      );
    }

    setTasks(filteredTasks);
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (fuse) {
      if (searchTerm.trim() === "") {
        setTasks(originalTasks);
      } else {
        const result = fuse.search(searchTerm);
        setTasks(result.map((item) => item.item));
      }
    }
  };

  if (!authenticated) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-center w-screen p-4 mt-8 ">
      <MainField
        newTask={newTask}
        handleInputChange={handleInputChange}
        handleAddTask={handleAddTask}
        handleUpdateTask={handleUpdateTask}
        editingTask={editingTask}
      />

      <SearchFilter
        filterComplete={filterComplete}
        handleFilterChange={handleFilterChange}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      <TaskList
        tasks={tasks}
        handleCheckboxChange={handleCheckboxChange}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TaskMain;
