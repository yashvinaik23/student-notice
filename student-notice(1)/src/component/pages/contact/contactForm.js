import React, { Fragment, useRef } from "react";

import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { PostContact } from "../../../store/actions";
import Card from "../../../UI/Card";
import Button from "../../../UI/Button";
import classes from "./ContactForm.module.css";

const ContactForm = props => {
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const numberRef = useRef("");
  const emailRef = useRef("");

  const formHandler = () => {
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
      <Card className={classes.input}>
        <form>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" ref={nameRef} />
          <label htmlFor="email">Email</label>
          <input id="email" type="text" ref={emailRef} />

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

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      PostContact: contact => PostContact(contact),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ContactForm);
