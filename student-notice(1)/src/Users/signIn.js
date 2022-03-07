import React, { useRef, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/logIn";
import { userAction } from "../store/user";

import classes from "./AddUser.module.css";
const axios = require("axios");

const SignIn = props => {
  const [error, setError] = useState();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const contactRef = useRef("");
  const addressRef = useRef("");
  const posRef = useRef("");
  const dispatch = useDispatch();

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
    dispatch(loginActions.login());

    // const user = {
    //   name: nameRef.current.value,
    //   email: emailRef.current.value,
    //   password: passwordRef.current.value,
    //   contact: contactRef.current.value,
    //   address: addressRef.current.value,
    // };
    // console.log(user);

    async function addUserHandler(user) {
      const response = await axios.post("http://localhost:8000/reg", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        contact: contactRef.current.value,
        address: addressRef.current.value,
        position: posRef.current.value,
      });

      dispatch({ type: "login" });
      dispatch(userAction.signIn(response.data.user));

      console.log(response.data.user);
    }
    addUserHandler();
    // axios
    //   .post("http://localhost:8000/reg", {
    //     name: nameRef.current.value,
    //     email: emailRef.current.value,
    //     password: passwordRef.current.value,
    //     contact: contactRef.current.value,
    //     address: addressRef.current.value,
    //   })
    //   .then(response => {
    //     console.log(response);
    //     dispatch(userAction.signIn(response.data.user));
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });

    dispatch({ type: "login" });
    dispatch(userAction.teacher());

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
export default SignIn;
