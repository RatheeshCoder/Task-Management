import React from "react";

const MainField = ({
  newTask,
  handleInputChange,
  handleAddTask,
  handleUpdateTask,
  editingTask,
}) => {
  return (
    <div className="w-screen mx-20 mt-5 rounded-lg glass-panel">
      <div className="mt-10 font-bold text-center">Task Management</div>
      <div className="mt-3 text-4xl font-bold text-center">
        What is your task today?
      </div>
      <div className="p-8">
        <div className="flex gap-4">
          <input
            type="text"
            name="title"
            className="block w-1/2 px-3 py-4 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            value={newTask.title}
            onChange={handleInputChange}
            placeholder="Title"
          />
          <input
            type="date"
            name="dueDate"
            className="block w-1/2 px-3 py-4 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            placeholder="dueDate *"
            value={newTask.dueDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-4 my-6">
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            className="w-full h-40 p-5 mb-10 font-semibold border rounded-md resize-none text-black-300 border-slate-300"
            placeholder="Message"
            value={newTask.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="text-center">
          <button
            onClick={editingTask !== null ? handleUpdateTask : handleAddTask}
            className={`w-full px-4 py-2 font-bold text-white rounded-lg cursor-pointer text-1x1 ${
              editingTask !== null ? "bg-green-500" : "bg-blue-700"
            }`}
          >
            {editingTask !== null ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainField;
