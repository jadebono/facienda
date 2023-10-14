// TaskCreation.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/TaskSlice";
import { setNotification } from "../store/NotificationsSlice";

const TaskCreationArea = ({ onTaskCreate }) => {
  const [task, setTask] = useState("");
  const [label, setLabel] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (label === "" && priority === "" && task === "") {
      dispatch(
        setNotification({
          message: "No inputs provided!",
          type: "error",
        })
      );
      return;
    }
    if (label === "" && priority === "") {
      dispatch(
        setNotification({
          message: "Neither label nor priority selected!",
          type: "error",
        })
      );
      return;
    }
    if (task === "") {
      dispatch(
        setNotification({
          message: "No task inputted!",
          type: "error",
        })
      );
      return;
    }

    if (label === "") {
      dispatch(
        setNotification({
          message: "No label selected!",
          type: "error",
        })
      );
      return;
    }
    if (priority === "") {
      dispatch(
        setNotification({
          message: "No priority selected!",
          type: "error",
        })
      );
      return;
    }
    // Create a task object with a unique ID
    const newTask = {
      id: Date.now(),
      task,
      label,
      priority,
      dueTime,
      dueDate,
    };

    dispatch(addTask(newTask));

    // Reset the form
    setTask("");
    setLabel("");
    setPriority("");
  };

  return (
    <div className="mx-auto my-8 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-xl border border-blue-900 bg-blue-50">
      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full p-2 mb-2 border border-blue-900 rounded-md "
      />

      <select
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="w-full p-2 mb-2 font-bold border border-blue-900 text-blue-900 rounded-md bg-white"
      >
        <option className="" value="">
          Select Label
        </option>
        <option className="" value="personal">
          Personal
        </option>
        <option value="work">Work</option>
        <option value="learning">Learning</option>
        <option value="home">Home</option>
        <option value="shopping">Shopping</option>
        <option value="social">Social</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-2 mb-2 font-bold border border-blue-900 text-blue-900 bg-white rounded-md"
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <input
        type="time"
        value={dueTime}
        onChange={(e) => setDueTime(e.target.value)}
        className="w-full p-2 mb-2 border  border-blue-900 text-blue-900 font-bold rounded-md "
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 mb-2 border border-blue-900  text-blue-900 font-bold rounded-md "
      />

      <div className="flex justify-center">
        <button onClick={handleSubmit} className="btn-gen">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskCreationArea;
