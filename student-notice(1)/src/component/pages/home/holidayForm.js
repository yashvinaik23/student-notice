import React, { Fragment, useRef, useState } from "react";
import ErrorModal from "../../../UI/ErrorModal";
import Card from "../../../UI/Card";
import Button from "../../../UI/Button";
import classes from "./holidayForm.module.css";

const ContactForm = () => {
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const numberRef = useRef("");
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
          <label htmlFor="name">Name</label>
          <input id="name" type="text" ref={nameRef} />

          <label htmlFor="description">Description</label>
          <input id="description" type="text" ref={descriptionRef} />
          <label htmlFor="number">Number</label>
          <input id="number" type="number" ref={numberRef} />

          <Button onClick={formHandler}>Submit</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default ContactForm;
