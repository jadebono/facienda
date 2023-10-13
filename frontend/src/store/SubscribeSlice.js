// SubscribeSlice.js
// * subscriber to newsletter state
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  surname: "",
  email: "",
  emailToUnsubscribe: "",
};

export const SubscribeSlice = createSlice({
  name: "Subscriber",
  initialState,
  reducers: {
    setSubscriber(state, action) {
      // get the key of the form input from action.payload
      const stateKey = Object.keys(action.payload);
      // get the value of the form input from action.payload
      const stateVal = action.payload[stateKey];
      return {
        ...state,
        [stateKey]: stateVal,
      };
    },
    clearSubscriber(state) {
      return (state = {
        name: "",
        surname: "",
        email: "",
        emailToUnsubscribe: "",
      });
    },
  },
});

export default SubscribeSlice;
export const { clearSubscriber, setSubscriber } = SubscribeSlice.actions;
