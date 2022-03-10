import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { DeleteHoliday } from "../../../../actions/actions";
import classes from "./HolidayItem.module.css";

const HolidayItem = props => {
  const user = useSelector(state => state.user.user);
  const deleteHandler = () => {
    const id = props.id;
    props?.DeleteHoliday(id);
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{props.date}</div>
        {user.position === "Teacher" && (
          <button onClick={deleteHandler}>Delete</button>
        )}
      </div>
    </li>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DeleteHoliday: id => DeleteHoliday(id),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(HolidayItem);
