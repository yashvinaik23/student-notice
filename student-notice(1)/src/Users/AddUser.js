import React, { Fragment, useState, useRef } from "react";

import { useHistory } from "react-router-dom";

import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";

import ErrorModal from "../UI/ErrorModal";
import Button from "../UI/Button";
import Card from "../UI/Card";
import { LogInUser } from "../store/actions";

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
  

  const addUserHandler = event => {
    event.preventDefault();
    console.log(posRef.current.value);

    if (!emailRef.current.value.includes("@gmail.com")) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid email.",
      });
      return;
    }

    if (passwordRef.current.value?.trim().length < 8) {
      setError({
        status: true,
        title: "Invalid input",
        message: "Please enter a valid password(min 8 characters)",
      });
      return;
    }
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      position: posRef.current.value,
    };
    props?.LogInUser(user);

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
          <Button onClick={props.formManipulate}>Sign Up</Button>
        </form>
      </Card>
    </Fragment>
  );
};

// export default AddUser;

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      LogInUser: user => LogInUser(user),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(AddUser);
