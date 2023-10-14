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
  },
  //* See if you need more reducers.
});

export const { addTask, deleteTask } = TaskSlice.actions;

export default TaskSlice;
