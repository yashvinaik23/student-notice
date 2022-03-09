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

export const PostResult = result => {
  return async () => {
    console.log(result.email);
    try {
      let response = await axios.get(
        `http://localhost:8000/getbyid/${result.email}`
      );
      const result1 = {
        subject: result.subject,
        marks: result.marks,
        owner: response.data,
      };
      console.log(result1);
      let res = await axios.post("http://localhost:8000/result", result1);
      if (res.status === 201) {
        console.log(res);
        alert("Result added");
      }

      console.log(res);
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
        dispatch(userAction.addContact(response.data));
        alert("Contact Added");
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
      console.log(response);
      if (response.status === 201) {
        dispatch(userAction.addHoliday(response.data));
        alert("Holiday added");
      } else {
        alert("Invalid holiday");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const GetContact = () => {
  return async dispatch => {
    try {
      let response = await axios.get("http://localhost:8000/getcontact");
      if (response.status === 404) {
        alert("Didn't get the Contacts");
      }
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
      if (response.status === 404) {
        alert("Didn't get the Holidays");
      }
      dispatch(userAction.storeHoliday(response.data));
    } catch (err) {
      alert(err);
    }
  };
};

export const GetResult = user => {
  return async dispatch => {
    try {
      let response = await axios.get(
        `http://localhost:8000/results/${user._id}`
      );
      if (response.status === 404) {
        alert("Didn't get the results");
      }
      dispatch(userAction.storeResult(response.data));
    } catch (err) {
      alert(err);
    }
  };
};

//http://localhost:8000/holiday/62287018047dcf37e733d832
export const DeleteHoliday = id => {
  return async dispatch => {
    try {
      let response = await axios.delete(`http://localhost:8000/holiday/${id}`);
      if (response.status === 200) {
        alert("Deleted successfully");
        dispatch(userAction.deleteHoliday(response.data));
      }
    } catch (err) {
      alert(err);
    }
  };
};

export const DeleteContact = id => {
  return async dispatch => {
    try {
      let response = await axios.delete(`http://localhost:8000/contact/${id}`);
      if (response.status === 200) {
        alert("Deleted successfully");
        dispatch(userAction.deleteContact(response.data));
      }
    } catch (err) {
      alert(err);
    }
  };
};
