import React, { Fragment, useRef, useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { PostResult } from "../../../store/actions";
import ErrorModal from "../../../UI/ErrorModal";
import Card from "../../../UI/Card";
import Button from "../../../UI/Button";
import classes from "./resultForm.module.css";

const ResultForm = props => {
  const emailRef = useRef("");
  const subjectRef = useRef("");
  const marksRef = useRef("");
  const statusRef = useRef("");
  const [error, setError] = useState();

  const errorHandler = () => {
    setError(null);
  };
  const formHandler = () => {
    const result = {
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      status: statusRef.current.value,
      marks: marksRef.current.value,
    };
    console.log(result);
    props?.PostResult(result);
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
          <label htmlFor="email">Enter student email</label>
          <input id="email" type="email" ref={emailRef} />

          <label htmlFor="subject">Subject</label>
          <input id="subject" type="text" ref={subjectRef} />
          <label htmlFor="status">Status</label>
          <input id="status" type="text" ref={statusRef} />
          <label htmlFor="marks">Marks</label>
          <input id="subject" type="text" ref={marksRef} />

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
