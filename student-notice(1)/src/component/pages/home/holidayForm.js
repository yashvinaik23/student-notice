import React, { Fragment, useRef, useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect, useSelector } from "react-redux";

import { PostHoliday } from "../../../actions/actions";
import Card from "../../../UI/Card";
import Button from "../../../UI/Button";
import SnackbarUI from "../../../UI/snackbar";
import classes from "./holidayForm.module.css";

const HolidayForm = props => {
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const dateRef = useRef("");
  const notification = useSelector(state => state.logIn.notification);
  const [nameError, setNameError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const formHandler = () => {
    if (nameRef.current.value.trim().length === 0) {
      setNameError(true);
      return;
    } else {
      setNameError(false);
    }

    if (dateRef.current.value.trim().length === 0) {
      setDateError(true);
      return;
    } else {
      setDateError(false);
    }

    const holiday = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      date: dateRef.current.value,
    };
    props?.PostHoliday(holiday);
    nameRef.current.value = "";
    descriptionRef.current.value = "";
    dateRef.current.value = "";
  };

  return (
    <Fragment>
      {notification && <SnackbarUI message={notification.message} />}
      <Card className={classes.input}>
        <form>
          <label htmlFor="name">Holiday for</label>
          {nameError && <h6>Invalid Holiday</h6>}
          <input id="name" type="text" ref={nameRef} />

          <label htmlFor="description">Description</label>

          <input id="description" type="text" ref={descriptionRef} />
          <label htmlFor="date">Date</label>
          {dateError && <h6>Invalid Holiday</h6>}
          <input id="date" type="date" ref={dateRef} />

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
