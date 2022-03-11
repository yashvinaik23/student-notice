import React, { Fragment, useState, useRef } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { LogInUser } from "../actions/actions";
import ErrorModal from "../UI/ErrorModal";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";

const AddUser = props => {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const history = useHistory();
  const [error, setError] = useState({
    status: false,
    title: "",
    message: "",
  });

  const addUserHandler = event => {
    event.preventDefault();

    if (!emailRef.current.value.includes("@gmail.com")) {
      setEmailError(true);
      return;
    }

    if (passwordRef.current.value.trim().length < 8) {
      setPassError(true);
      return;
    }
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    props?.LogInUser(user);

    const handleClick = () => {
      history.push("/home");
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
          {emailError && <h6>Invalid Email</h6>}
          <input id="email" type="text" ref={emailRef} />

          <label htmlFor="password">Password</label>
          {passError && <h6>Invalid Password (min 8 characters needed)</h6>}
          <input id="password" type="password" ref={passwordRef} />

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
