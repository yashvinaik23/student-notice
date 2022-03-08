import React, { Fragment, useRef } from "react";

import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { PostHoliday } from "../../../store/actions";

import Card from "../../../UI/Card";
import Button from "../../../UI/Button";
import classes from "./holidayForm.module.css";

const HolidayForm = props => {
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const dateRef = useRef("");

  const formHandler = () => {
    const holiday = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      date: dateRef.current.value,
    };
    props?.PostHoliday(holiday);
  };

  return (
    <Fragment>
      <Card className={classes.input}>
        <form>
          <label htmlFor="name">Holiday for</label>
          <input id="name" type="text" ref={nameRef} />

          <label htmlFor="description">Description</label>
          <input id="description" type="text" ref={descriptionRef} />
          <label htmlFor="number">Date</label>
          <input id="number" type="text" ref={dateRef} />

          <Button onClick={formHandler}>Submit</Button>
        </form>
      </Card>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      PostHoliday: holiday => PostHoliday(holiday),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(HolidayForm);
