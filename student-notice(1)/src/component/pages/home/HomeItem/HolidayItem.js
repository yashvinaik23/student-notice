import classes from "./HolidayItem.module.css";

const HolidayItem = props => {
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{props.date}</div>
      </div>
      <div></div>
    </li>
  );
};

export default HolidayItem;
