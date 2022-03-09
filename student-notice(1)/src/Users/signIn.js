import React, { useRef, useState, Fragment } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "@reduxjs/toolkit";
import { SignUpUser } from "../store/actions";

import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";

import classes from "./AddUser.module.css";

const SignIn = props => {
  const [error, setError] = useState();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const contactRef = useRef("");
  const addressRef = useRef("");
  const posRef = useRef("");

  const history = useHistory();

  const addUserHandler = event => {
    event.preventDefault();

    if (nameRef.current.value.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name.",
      });
      return;
    }

    if (!emailRef.current.value.includes("@gmail.com")) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid email.",
      });
      return;
    }

    if (passwordRef.current.value.trim().length < 8) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid password(min 8 characters)",
      });
      return;
    }

    if (contactRef.current.value.toString().trim().length !== 10) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid contact number.",
      });
      return;
    }

    if (addressRef.current.value.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid address.",
      });
      return;
    }

    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      contact: contactRef.current.value,
      address: addressRef.current.value,
      position: posRef.current.value,
    };

    props?.SignUpUser(user);

    const handleClick = () => {
      history.push("/");
    };
    handleClick();
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameRef} />
          <label htmlFor="email">Email</label>
          <input id="email" type="email" ref={emailRef} />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" ref={passwordRef} />
          <label htmlFor="contact">Contact</label>
          <input id="contact" type="Number" ref={contactRef} />
          <label htmlFor="address">Address</label>
          <input id="address" type="text" ref={addressRef} />
          <select ref={posRef}>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>

          <Button onClick={addUserHandler}>Submit</Button>
          <Button onClick={props.formManipulate}>Log In</Button>
        </form>
      </Card>
    </Fragment>
  );
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      SignUpUser: user => SignUpUser(user),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(SignIn);
