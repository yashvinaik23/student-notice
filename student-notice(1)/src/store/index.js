import { configureStore } from "@reduxjs/toolkit";
//import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user";
import loginReducer from "./logIn";

const store = configureStore({
  reducer: { user: userReducer, logIn: loginReducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;
