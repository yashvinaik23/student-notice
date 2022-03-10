import React, { useRef, useState, Fragment } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "@reduxjs/toolkit";

import { SignUpUser } from "../actions/actions";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";

const SignIn = props => {
  const [error, setError] = useState();
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [addressError, setAddressError] = useState(false);
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
      setNameError(true);
      return;
    } else {
      setNameError(false);
    }

    if (!emailRef.current.value.includes("@gmail.com")) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (passwordRef.current.value.trim().length < 8) {
      setPassError(true);
      return;
    } else {
      setPassError(false);
    }

    if (contactRef.current.value.toString().trim().length !== 10) {
      setContactError(true);
      return;
    } else {
      setContactError(false);
    }

    if (addressRef.current.value.trim().length === 0) {
      setAddressError(true);
      return;
    } else {
      setAddressError(false);
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
      history.push("/home");
    };
    handleClick();
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      <Card className={classes.input}>
        <form>
          <label htmlFor="username">Username</label>
          {nameError && <h6>Invalid Name</h6>}
          <input id="username" type="text" ref={nameRef} />

          <label htmlFor="email">Email</label>
          {emailError && <h6>Invalid Email</h6>}
          <input id="email" type="email" ref={emailRef} />
          <label htmlFor="password">Password</label>
          {passError && <h6>Invalid Password (min 8 characters needed)</h6>}
          <input id="password" type="password" ref={passwordRef} />
          <label htmlFor="contact">Contact</label>
          {contactError && <h6>Invalid Contact</h6>}
          <input id="contact" type="Number" ref={contactRef} />
          <label htmlFor="address">Address</label>
          {addressError && <h6>Invalid Address</h6>}
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
