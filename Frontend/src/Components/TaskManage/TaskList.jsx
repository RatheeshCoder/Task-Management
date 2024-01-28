import React, { useState, useEffect } from "react";

const TaskList = ({
  tasks,
  handleCheckboxChange,
  handleEditTask,
  handleDeleteTask,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full px-10 mt-16 overflow-hidden bg-white rounded-md shadow-md">
      <div className="px-4 py-2 bg-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Task List</h2>
      </div>
      {loading ? (
        <ul className="divide-y divide-gray-200">
          {[1, 2, 3].map((index) => (
            <li
              key={index}
              className="flex items-center px-6 py-4 animate-pulse"
            >
              <div className="w-1/5 h-4 mb-2 bg-gray-300"></div>
              <div className="flex-1 py-1 space-y-4">
                <div className="w-3/4 h-4 bg-gray-300"></div>
                <div className="w-1/2 h-4 bg-gray-300"></div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="divide-y divide-gray-200">
          {tasks.map((task, index) => (
            <li
              key={task.id}
              className={`flex items-center py-4 px-6 ${
                task.completed ? "line-through" : ""
              }`}
            >
              <label class="lock-checkbox">
                <input
                  id="lock"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(task.id, task.completed)}
                />
                <span className="lock-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z"></path>
                  </svg>
                </span>
              </label>
              <span className="font-semibold">
                <span className="text-blue-700">{task.title}</span> /
                <span className="text-gray-600"> {task.dueDate}</span> /
                <span className="text-gray-800"> {task.description}</span>
              </span>

              <div className="flex ml-auto">
                {" "}
                {!task.completed && (
                  <button
                    className="mx-5 edit-button"
                    onClick={() => handleEditTask(index)}
                  >
                    <svg className="edit-svgIcon" viewBox="0 0 512 512">
                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                    </svg>
                  </button>
                )}
                <button
                  className="button "
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <svg viewBox="0 0 448 512" className="svgIcon">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
