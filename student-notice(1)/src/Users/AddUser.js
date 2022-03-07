import React, { Fragment, useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/logIn";
import { userAction } from "../store/user";
import ErrorModal from "../UI/ErrorModal";
import Button from "../UI/Button";
import Card from "../UI/Card";

import classes from "./AddUser.module.css";

const AddUser = props => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const posRef = useRef("");

  const history = useHistory();
  const [error, setError] = useState({
    status: false,
    title: "",
    message: "",
  });
  const dispatch = useDispatch();

  const addUserHandler = event => {
    event.preventDefault();
    console.log(posRef.current.value);

    // if (!emailRef.current.value.includes("@gmail.com")) {
    //   setError({
    //     title: "Invalid input",
    //     message: "Please enter a valid email.",
    //   });
    //   return;
    // }
    // if (!emailRef.current.value.includes("@gmail.com")) {
    //   inputClass: "invalid";
    // }

    if (passwordRef?.current?.value?.trim().length < 8) {
      setError({
        status: true,
        title: "Invalid input",
        message: "Please enter a valid password(min 8 characters)",
      });
      return;
    }

    //
    axios
      .post("http://localhost:8000/users/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        position: posRef.current.value,
      })
      .then(response => {
        console.log(response.status);
        if (response.status !== 204) {
          setError({
            ...error,
            status: true,
            title: "Invalid input",
            message: "Please enter a valid password(min 8 characters)",
          });
          return;
        }
        // debugger;
        // dispatch(userAction.teacher());
        // dispatch(loginActions.login());
        // console.log(response.status);
        // dispatch(userAction.logIn(response.data.user));
      })
      .catch(e => {
        console.log(e);
      });

    const handleClick = () => {
      history.push("/");
    };
    handleClick();
  };

  const errorHandler = () => {
    setError({
      ...error,
      status: false,
    });
  };

  return (
    <Fragment>
      {console.log(error)}
      {error.status && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" ref={emailRef} />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" ref={passwordRef} />
          <label htmlFor="position">Position</label>
          <select ref={posRef}>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
          <Button onClick={addUserHandler}>Submit</Button>
          <Button onClick={props.formManipulate}>Sign In</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddUser;
