import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { GetHoliday } from "../../../store/actions";
import HolidayItem from "./HomeItem/HolidayItem";
import Card from "../../../UI/Card";

import classes from "./AvailableHolidays.module.css";

const AvailableHolidays = props => {
  const getHoliday = async () => {
    await props?.GetHoliday();
  };
  useEffect(() => {
    getHoliday();
  }, []);

  const holidaysList = props?.holiday.map(meal => (
    <HolidayItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      date={meal.date}
    />
  ));

  return (
    <div>
      <section className={classes.meals}>
        <Card>
          <ul>{holidaysList}</ul>
        </Card>
      </section>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    holiday: state.user.holiday,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      GetHoliday: () => GetHoliday(),
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AvailableHolidays);
