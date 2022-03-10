import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  user: { name: "Student Notice" },
  holiday: [],
  contact: [],
  result: [],
  isTeacher: false,
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
      state.contact = state.contact.concat(action.payload);
    },
    teacher(state) {
      state.isTeacher = true;
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
