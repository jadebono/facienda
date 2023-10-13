// TaskCard.jsx
import React from "react";
import { useSelector } from "react-redux";

const TaskCard = ({ task, onDelete }) => {
  const tasks = useSelector((state) => state.tasks.list);

  return (
    <div className="m-4 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md border border-blue-900 bg-blue-50">
      {/* Header Bar */}
      <div className="bg-blue-500 text-white p-2 rounded-lg flex justify-between items-center">
        <h2 className="font-bold">Task</h2>
        <button onClick={() => onDelete(task.id)}>
          <p className="text-white font-extrabold bg-red-400 hover:bg-red-700 p-1 px-2 rounded-lg">
            x
          </p>
        </button>
      </div>

      {/* Task Details */}
      <div className="mt-4">
        {" "}
        {/* Added margin-top for spacing */}
        <div>
          <p className="mb-2 text-blue-900 inline-block">Task:&nbsp;</p>
          <p className="inline-block font-extrabold text-indigo-900">
            {task.task}
          </p>
        </div>
        <div>
          <p className="mb-2 text-blue-900 inline-block">Label:&nbsp;</p>
          <p className="inline-block font-extrabold text-indigo-900">
            {task.label}
          </p>
        </div>
        <div>
          <p className="mb-2 text-blue-900 inline-block">Priority:&nbsp;</p>
          <p className="inline-block font-extrabold text-indigo-900">
            {task.priority}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
