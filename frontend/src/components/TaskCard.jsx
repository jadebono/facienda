import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteTask } from "../modules/requests";

const TaskCard = ({ task, onDelete }) => {
  // !! check if there is any use for tasks
  const tasks = useSelector((state) => state.tasks.list);
  const [isExpired, setIsExpired] = useState(false);
  const userId = 'someUserId'; 


  //   create a check for the date & time
  const isTaskExpired = (dueDate, dueTime) => {
    const currentDate = new Date();
    const taskDate = new Date(`${dueDate}T${dueTime}`);
    return taskDate < currentDate;
  };

  //   useEffect to check the date/time and update component automatically when they expire
  useEffect(() => {
    const checkInterval = () => {
      const expired = isTaskExpired(task.dueDate, task.dueTime);
      setIsExpired(expired);
    };

    checkInterval(); // Check initially when the component is mounted

    const interval = setInterval(checkInterval, 1000 * 60); // Check every minute

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [task.dueDate, task.dueTime]);

  const expiredClass = isTaskExpired(task.dueDate, task.dueTime)
    ? "line-through font-medium "
    : "";

  return (
    <div className="m-4 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md border border-blue-900 bg-blue-50">
      {/* Header Bar */}
      <div
        className={`text-white p-2 rounded-lg flex justify-between items-center ${
          task.priority === "high"
            ? "bg-red-700"
            : task.priority === "medium"
            ? "bg-orange-700"
            : "bg-green-700"
        }`}
      >
        <h2 className="font-bold">Task</h2>
        <button onClick={() => onDelete(task.id)}>
          <p className="text-black font-extrabold bg-white hover:bg-grey-200 p-1 px-2 rounded-lg">
            x
          </p>
        </button>
      </div>

      {/* Task Details */}
      <div className="mt-4">
        <div>
          <p className="mb-2 text-blue-900 inline-block">Task:&nbsp;</p>
          <p className={`inline-block font-extrabold text-indigo-900 `}>
            {task.task}
          </p>
        </div>
        <div>
          <p className="mb-2 text-blue-900 inline-block">Label:&nbsp;</p>
          <p className={`inline-block font-extrabold text-indigo-900 `}>
            {task.label}
          </p>
        </div>
        <div>
          <p className="mb-2 text-blue-900 inline-block">Due Time:&nbsp;</p>
          <p
            className={`inline-block font-extrabold text-indigo-900 ${expiredClass}`}
          >
            {task.dueTime}
          </p>
        </div>
        <div>
          <p className="mb-2 text-blue-900 inline-block">Due Date:&nbsp;</p>
          <p
            className={`inline-block font-extrabold text-indigo-900 ${expiredClass}`}
          >
            {task.dueDate}
          </p>
        </div>

        <div>
          <p className="mb-2 text-blue-900 inline-block">Priority:&nbsp;</p>
          <p
            className={`inline-block font-extrabold ${
              task.priority === "high"
                ? "text-red-700"
                : task.priority === "medium"
                ? "text-orange-700"
                : "text-green-700"
            }`}
          >
            {task.priority}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
