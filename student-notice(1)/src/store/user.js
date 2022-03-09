import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  user: { name: "Student Notice" },
  holiday: [],
  contact: [],
  result: [],
  isTeacher: false,
  isLogin: false,
  position: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    signIn(state, action) {
      state.user = action.payload;
    },
    logIn(state, action) {
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
    storeResult(state, action) {
      state.result = action.payload;
    },
    addHoliday(state, action) {
      state.holiday = state.holiday.concat(action.payload);
    },
    addContact(state, action) {
      console.log(state.contact);
      state.contact = state.contact.concat(action.payload);
      console.log(state.contact);
    },

    teacher(state) {
      state.isTeacher = state.user.position === "Teacher" ? true : false;
    },
    deleteHoliday(state, action) {
      state.holiday = state.holiday.filter(
        arrow => arrow._id !== action.payload._id
      );
    },
    deleteContact(state, action) {
      state.contact = state.contact.filter(
        arrow => arrow._id !== action.payload._id
      );
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
