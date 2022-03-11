import axios from "axios";
import { loginActions } from "../store/logIn";
import { userAction } from "../store/user";

export function SignUpUser(user) {
  return async dispatch => {
    try {
      let response = await axios.post("http://localhost:8000/reg", user);
      if (response.status === 201) {
        dispatch(loginActions.login());
        dispatch(userAction.signIn(response.data.user));
        dispatch(userAction.teacher());
      } else {
        alert("Something went wrong please check inputs and try again");
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
        alert("User not found");
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
        status: result.status,
        owner: response.data,
      };

      let res = await axios.post("http://localhost:8000/result", result1);
      if (res.status === 201) {
        dispatch(loginActions.openN());
        dispatch(
          loginActions.showNotification({
            status: "success",
            message: "Result added succeessfully!",
          })
        );
      }
    } catch (err) {
      dispatch(loginActions.openN());
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
        dispatch(loginActions.openN());
        dispatch(
          loginActions.showNotification({
            status: "success",
            message: "Contact added Successfully!",
          })
        );
      } else {
        dispatch(loginActions.openN());
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
        dispatch(loginActions.openN());
        dispatch(
          loginActions.showNotification({
            status: "success",
            message: "Holiday added Successfully!",
          })
        );
      } else {
        dispatch(loginActions.openN());
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
        dispatch(loginActions.openN());
        dispatch(
          loginActions.showNotification({
            status: "error",
            message: "Contacts are not available!",
          })
        );
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
        dispatch(loginActions.openN());
        dispatch(
          loginActions.showNotification({
            status: "error",
            message: "Holidays are not available!",
          })
        );
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
        dispatch(loginActions.openN());
        dispatch(
          loginActions.showNotification({
            status: "error",
            message: "Reslult is not available!",
          })
        );
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
        dispatch(loginActions.openN());
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
        dispatch(loginActions.openN());
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
