//  NotificationsSlice.js
// * Notification state
import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialState = {
  id: "",
  type: "",
  message: "",
  active: false,
};

export const NotificationSlice = createSlice({
  name: "Notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      if (action.payload.message !== "" && action.payload.type !== "") {
        return {
          ...state,
          id: v4(),
          message: action.payload.message,
          type: action.payload.type,
          active: true,
        };
      } else {
        return {
          ...state,

          active: false,
        };
      }
    },
    clearNotification(state, action) {
      return {
        ...state,
        id: "",
        message: action.payload.message,
        type: action.payload.type,
        active: false,
      };
    },
  },
});

export default NotificationSlice;
export const { clearNotification, setNotification } = NotificationSlice.actions;
