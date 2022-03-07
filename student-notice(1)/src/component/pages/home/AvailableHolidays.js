import classes from "./AvailableHolidays.module.css";
import HolidayItem from "./HomeItem/HolidayItem";
import Card from "../../../UI/Card";
import { useState } from "react";
import axios from "axios";

const AvailableHolidays = () => {
  const [holiday, setHoliday] = useState([]);
  const [show, setShow] = useState(false);

  const getHoliday = () => {
    axios.get("http://localhost:8000/getholiday").then(response => {
      setHoliday(response.data);
      console.log(response);
      setShow(!show);
    });
  };

  const holidaysList = holiday.map(meal => (
    <HolidayItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.date}
    />
  ));

  return (
    <div>
      <button className={classes.button} onClick={getHoliday}>
        {show ? "Hide" : "Get Holiday"}
      </button>
      <section className={classes.meals}>
        <Card>
          <ul>{show && holidaysList}</ul>
        </Card>
      </section>
    </div>
  );
};

export default AvailableHolidays;
