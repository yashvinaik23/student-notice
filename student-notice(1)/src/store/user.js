import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  user: { name: "Student Notice" },
  isTeacher: false,
  isLogin:false,
  position:""
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    signIn(state, action) {
      console.log(action.payload);
      state.user = action.payload;
    },
    logIn(state, action) {
      console.log(action.payload);
      state.user = action.payload;
      state.position = action.payload.position
      state.isLogin = true
    },
    teacher(state) {
      if (state.user.position === "Teacher") {
        state.isTeacher = true;
        return;
      } else {
        state.isTeacher = false;
      }
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
