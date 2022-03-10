import axios from "axios";
import { loginActions } from "../store/logIn";
import { userAction } from "../store/user";

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
  return async dispatch => {
    try {
      let response = await axios.get(
        `http://localhost:8000/getbyid/${result.email}`
      );
      const result1 = {
        subject: result.subject,
        marks: result.marks,
        owner: response.data,
      };

      let res = await axios.post("http://localhost:8000/result", result1);
      if (res.status === 201) {
        dispatch(loginActions.open());
        dispatch(
          loginActions.showNotification({
            status: "success",
            message: "Result added succeessfully!",
          })
        );
      }
    } catch (err) {
      dispatch(loginActions.open());
      dispatch(
        loginActions.showNotification({
          status: "error",
          message: "Something went wrong",
        })
      );
    }
  };
};

export const PostContact = contact => {
  return async dispatch => {
    try {
      let response = await axios.post("http://localhost:8000/contact", contact);
      if (response.status === 201) {
        dispatch(userAction.addContact(response.data));
        dispatch(loginActions.open());
        dispatch(
          loginActions.showNotification({
            status: "success",
            message: "Contact added Successfully!",
          })
        );
      } else {
        dispatch(loginActions.open());
        dispatch(
          loginActions.showNotification({
            status: "error",
            message: "Something went wrong",
          })
        );
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
        dispatch(userAction.addHoliday(response.data));
        dispatch(loginActions.open());
        dispatch(
          loginActions.showNotification({
            status: "success",
            message: "Holiday added Successfully!",
          })
        );
      } else {
        dispatch(loginActions.open());
        dispatch(
          loginActions.showNotification({
            status: "error",
            message: "Something went wrong!",
          })
        );
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

export const DeleteHoliday = id => {
  return async dispatch => {
    try {
      let response = await axios.delete(`http://localhost:8000/holiday/${id}`);

      if (response.status === 200) {
        dispatch(userAction.deleteHoliday(response.data));
        dispatch(loginActions.open());
        dispatch(
          loginActions.showNotification({
            status: "success",
            message: "Holiday deleted successfully!",
          })
        );
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
        dispatch(userAction.deleteContact(response.data));
        dispatch(loginActions.open());
        dispatch(
          loginActions.showNotification({
            status: "success",
            message: "Contact deleted successfully!",
          })
        );
      }
    } catch (err) {
      alert(err);
    }
  };
};
