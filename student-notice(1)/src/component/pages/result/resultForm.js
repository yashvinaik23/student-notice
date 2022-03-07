import React, { Fragment, useRef, useState } from "react";
import ErrorModal from "../../../UI/ErrorModal";
import Card from "../../../UI/Card";
import Button from "../../../UI/Button";
import classes from "./resultForm.module.css";

const ResultForm = () => {
  const emailRef = useRef("");
  const subjectRef = useRef("");
  const marksRef = useRef("");
  const [error, setError] = useState();

  const errorHandler = () => {
    setError(null);
  };
  const formHandler = () => {};

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
          <label htmlFor="marks">Marks</label>
          <input id="subject" type="text" ref={marksRef} />

          <Button onClick={formHandler}>Submit</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default ResultForm;
