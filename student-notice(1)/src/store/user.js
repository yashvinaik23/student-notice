import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  user: { name: "Student Notice" },
  holiday: [],
  contact: [],
  isTeacher: false,
  isLogin: false,
  position: "",
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
      state.position = action.payload.position;
      state.isLogin = true;
    },
    storeHoliday(state, action) {
      state.holiday = action.payload;
    },
    storeContact(state, action) {
      state.contact = action.payload;
    },
    teacher(state) {
  
      state.isTeacher = state.user.position === "Teacher" ? true : false;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
