import React, { Fragment, useRef, useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect, useSelector } from "react-redux";

import { PostResult } from "../../../actions/actions";
import ErrorModal from "../../../UI/ErrorModal";
import Card from "../../../UI/Card";
import Button from "../../../UI/Button";
import SnackbarUI from "../../../UI/snackbar";
import classes from "./resultForm.module.css";

const ResultForm = props => {
  const emailRef = useRef("");
  const subjectRef = useRef("");
  const marksRef = useRef("");
  const statusRef = useRef("");
  const notification = useSelector(state => state.logIn.notification);
  const [emailError, setEmailError] = useState(false);
  const [marksError, setMarksError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [error, setError] = useState();

  const formHandler = () => {
    if (subjectRef.current.value.trim().length === 0) {
      setSubjectError(true);
      return;
    } else {
      setSubjectError(false);
    }

    if (!emailRef.current.value.includes("@gmail.com")) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (marksRef.current.value < 0 || marksRef.current.value > 100) {
      setMarksError(true);
      return;
    } else {
      setMarksError(false);
    }

    const result = {
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      status: statusRef.current.value,
      marks: marksRef.current.value,
    };

    props?.PostResult(result);

    emailRef.current.value = "";
    subjectRef.current.value = "";
    statusRef.current.value = "";
    marksRef.current.value = "";
  };

  return (
    <Fragment>
      {notification && <SnackbarUI message={notification.message} />}
      <Card className={classes.input}>
        <form>
          <label htmlFor="email">Enter student email</label>
          {emailError && <h6>Invalid Name</h6>}
          <input id="email" type="email" ref={emailRef} />
          <label htmlFor="subject">Subject</label>
          {subjectError && <h6>Invalid Name</h6>}
          <input id="subject" type="text" ref={subjectRef} />
          <label htmlFor="status">Status</label>
          <input id="status" type="text" ref={statusRef} />
          <label htmlFor="marks">Marks</label>
          {marksError && <h6>Invalid Name</h6>}
          <input id="marks" type="Number" ref={marksRef} />
          <Button onClick={formHandler}>Submit</Button>
        </form>
      </Card>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      PostResult: contact => PostResult(contact),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ResultForm);
