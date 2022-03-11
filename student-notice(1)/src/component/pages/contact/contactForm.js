import React, { Fragment, useRef, useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect, useSelector } from "react-redux";

import { PostContact } from "../../../actions/actions";
import Card from "../../../UI/Card";
import Button from "../../../UI/Button";
import SnackbarUI from "../../../UI/snackbar";
import classes from "./ContactForm.module.css";

const ContactForm = props => {
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const numberRef = useRef("");
  const emailRef = useRef("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false);
  const notification = useSelector(state => state.logIn.notification);

  const formHandler = () => {
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
    if (numberRef.current.value.toString().trim().length !== 10) {
      setContactError(true);
      return;
    } else {
      setContactError(false);
    }
    const contact = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      number: numberRef.current.value,
      email: emailRef.current.value,
    };
    props?.PostContact(contact);
    nameRef.current.value = "";
    descriptionRef.current.value = "";
    numberRef.current.value = "";
    emailRef.current.value = "";
  };

  return (
    <Fragment>
      {notification && <SnackbarUI message={notification.message} />}
      <Card className={classes.input}>
        <form>
          <label htmlFor="name">Name</label>
          {nameError && <h6>Invalid Name</h6>}
          <input id="name" type="text" ref={nameRef} />
          <label htmlFor="email">Email</label>
          {emailError && <h6>Invalid Email</h6>}
          <input id="email" type="text" ref={emailRef} />
          <label htmlFor="description">Description</label>
          <input id="description" type="text" ref={descriptionRef} />
          <label htmlFor="number">Number</label>
          {contactError && <h6>Invalid Email</h6>}
          <input id="number" type="number" ref={numberRef} />
          <Button onClick={formHandler}>Submit</Button>
        </form>
      </Card>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      PostContact: contact => PostContact(contact),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ContactForm);
