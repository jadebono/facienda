// Home.jsx
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCreationArea from "../components/TaskCreation";
import TaskCard from "../components/TaskCard";
import { deleteTask, clearAllTasks, setTasks } from "../store/TaskSlice";
import { deleteTaskFromDB } from "../modules/requests";

export default function Home() {
  const isLoggedIn = useSelector((state) => state.user.logged);
  const userId = useSelector((state) => state.user.userId);
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
  // !! use something other than useMemo if you can
  const sortedTasks = useMemo(() => {
    return [...tasks].sort(
      (a, b) => priorityValue(a.priority) - priorityValue(b.priority)
    );
  }, [tasks]);

  // Delete function
  const handleDelete = async (taskId) => {
    const response = await deleteTaskFromDB(userId, taskId);
    console.log(response);
    if (response === "Task deleted successfully") {
      dispatch(deleteTask(taskId));
    } else {
      console.error("Failed to delete task from server:", response);
    }
  };

  // When the user logs in, clear all tasks that may have been created before login
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(clearAllTasks());

      // Assuming you have a way to get tasks for the logged-in user from your redux store or context

      dispatch(setTasks(tasks));
    }
  }, [isLoggedIn, dispatch]);

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
