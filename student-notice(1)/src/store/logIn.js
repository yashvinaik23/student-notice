import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: false,
  notification: false,
  open: false,
};

const loginSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      localStorage.setItem("state", true);
      state.isLoggedIn = localStorage.getItem("state"); //true;
    },
    logout(state) {
      localStorage.removeItem("state");
      state.isLoggedIn = localStorage.getItem("state") || false; //false;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,

        message: action.payload.message,
      };
    },
    open(state) {
      state.open = !state.open;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
