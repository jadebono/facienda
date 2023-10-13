// UserSlice.js
// * user data state
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logged: false,
  userId: "",
  username: "",
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser(state, action) {
      return (state = {
        logged: true,
        userId: action.payload.userId,
        username: action.payload.username,
      });
    },
    clearUser(state) {
      return (state = {
        logged: false,
        userId: "",
        username: "",
      }); // Reset to initial state
    },
  },
});

export default UserSlice;
export const { setUser, clearUser } = UserSlice.actions;
