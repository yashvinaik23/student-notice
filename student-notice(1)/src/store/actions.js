import { loginActions } from "./logIn";
import { userAction } from "./user";
import axios from "axios";

export function SignUpUser(user) {
  return async dispatch => {
    try {
      let response = await axios.post("http://localhost:8000/reg", user);
      if (response.status === 201) {
        localStorage.setItem("isLoggedIn", "1");
        dispatch(loginActions.login());
        dispatch(userAction.signIn(response.data.user));
        dispatch(userAction.teacher());
      } else {
        alert("Invalid");
      }
    } catch (err) {
      alert(err);
    }
  };
}

export const LogInUser = user => {
  return async dispatch => {
    try {
      let response = await axios.post(
        "http://localhost:8000/users/login",
        user
      );
      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", "1");
        dispatch(loginActions.login());

        dispatch(userAction.logIn(response.data.user));
        dispatch(userAction.teacher());
      } else {
        alert("Invalid");
      }
    } catch (err) {
      alert(err);
    }
  };
};

export const PostContact = contact => {
  return async dispatch => {
    try {
      let response = await axios.post("http://localhost:8000/contact", contact);
      if (response.status === 201) {
        dispatch(userAction.storeContact(response.data));
      } else {
        alert("Invalid contact");
      }
    } catch (err) {
      alert(err);
    }
  };
};

export const PostHoliday = holiday => {
  return async dispatch => {
    try {
      let response = await axios.post("http://localhost:8000/holiday", holiday);
      if (response.status === 201) {
        dispatch(userAction.storeHoliday(response.data));
        alert("Holiday added");
      } else {
        alert("Invalid holiday");
      }
    } catch (err) {
      alert(err);
    }
  };
};

export const GetContact = () => {
  return async dispatch => {
    try {
      let response = await axios.get("http://localhost:8000/getcontact");

      dispatch(userAction.storeContact(response.data));
    } catch (err) {
      alert(err);
    }
  };
};

export const GetHoliday = () => {
  return async dispatch => {
    try {
      let response = await axios.get("http://localhost:8000/getholiday");

      dispatch(userAction.storeHoliday(response.data));
    } catch (err) {
      alert(err);
    }
  };
};
