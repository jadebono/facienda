// Home.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCreationArea from "../components/TaskCreation";
import TaskCard from "../components/TaskCard";
import { deleteTask } from "../store/TaskSlice";

export default function Home() {
  const tasks = useSelector((state) => state.tasks.list);
  const dispatch = useDispatch();

  // Assign a numerical value for each priority level for easy sorting
  const priorityValue = (priority) => {
    switch (priority) {
      case "high":
        return 1;
      case "medium":
        return 2;
      case "low":
        return 3;
      default:
        return 4;
    }
  };

  // Sort the tasks by priority
  const sortedTasks = [...tasks].sort(
    (a, b) => priorityValue(a.priority) - priorityValue(b.priority)
  );

  // Delete function
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <React.Fragment>
      <div>
        <TaskCreationArea />
        <div className="flex flex-wrap justify-start">
          {sortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
