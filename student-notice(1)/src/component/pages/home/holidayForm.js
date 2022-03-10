import React, { Fragment, useRef, useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect, useSelector, useDispatch } from "react-redux";

import { PostHoliday } from "../../../actions/actions";
import loginActions from "../../../store/logIn";
import Snackbar from "@mui/material/Snackbar";
import Card from "../../../UI/Card";
import Button from "../../../UI/Button";
import classes from "./holidayForm.module.css";

const HolidayForm = props => {
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const dateRef = useRef("");
  const [nameError, setNameError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const notification = useSelector(state => state.logIn.notification);
  const [open, setOpen] = useState(useSelector(state => state.logIn.open));
  const dispatch = useDispatch();

  const formHandler = () => {
    if (nameRef.current.value.trim().length === 0) {
      setNameError(true);
      return;
    }

    if (dateRef.current.value.trim().length === 0) {
      setDateError(true);
      return;
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

  const handleClose = () => {
    dispatch(loginActions.open());
  };

  return (
    <Fragment>
      {notification && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={notification.message}
        />
      )}
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
