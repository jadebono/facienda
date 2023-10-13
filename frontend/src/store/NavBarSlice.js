// NavBarSlice.js
// *Navbar state

import { createSlice } from "@reduxjs/toolkit";
// State is set at render depending on screensize
// to set burger and menu responsively
const initialState =
  window.innerWidth >= 768
    ? { burger: "hidden", menu: "hidden" }
    : { burger: "", menu: "hidden" };

export const NavBarSlice = createSlice({
  name: "NavBar",
  initialState,
  reducers: {
    bothHidden(state) {
      return (state = { burger: "hidden", menu: "hidden" });
    },
    burgerShownMenuHidden(state) {
      return (state = { burger: "", menu: "hidden" });
    },
    toggle(state) {
      return (state =
        state.menu === ""
          ? { burger: "", menu: "hidden" }
          : { burger: "", menu: "" });
    },
  },
});

export const { bothHidden, burgerShownMenuHidden, toggle } =
  NavBarSlice.actions;
export default NavBarSlice;
