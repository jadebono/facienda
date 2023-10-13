// UpdateButtonsSlice.js
// * state for the update username, update email and update password buttons
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: false,
  email: false,
  password: false,
};

export const UpdateButtonsSlice = createSlice({
  name: "UpdateButtons",
  initialState,
  reducers: {
    setUpdateButtons(state, action) {
      // get the key of the form input from action.payload
      const stateKey = Object.keys(action.payload);
      // get the value of the form input from action.payload
      const stateVal = action.payload[stateKey];
      return {
        username: false,
        email: false,
        password: false,
        [stateKey]: stateVal,
      };
    },
    clearUpdateButtons(state) {
      return (state = {
        username: false,
        email: false,
        password: false,
      });
    },
  },
});

export default UpdateButtonsSlice;
export const { clearUpdateButtons, setUpdateButtons } =
  UpdateButtonsSlice.actions;
