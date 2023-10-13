// Home.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCreationArea from "../components/TaskCreation";
import TaskCard from "../components/TaskCard";
import { deleteTask } from "../store/TaskSlice";

export default function Home() {
  const tasks = useSelector((state) => state.tasks.list); // Get tasks from Redux store
  const dispatch = useDispatch();

  // Delete function
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <React.Fragment>
      <div>
        <TaskCreationArea />
        <div className="flex flex-wrap justify-start">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
