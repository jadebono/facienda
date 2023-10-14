// TaskSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
    },
    clearAllTasks: (state) => {
      state.list = [];
    },
    setTasks: (state, action) => {
      state.list = action.payload;
    },
  },
  //* See if I need more reducers.
});

export const { addTask, deleteTask, clearAllTasks, setTasks } =
  TaskSlice.actions;

export default TaskSlice;
