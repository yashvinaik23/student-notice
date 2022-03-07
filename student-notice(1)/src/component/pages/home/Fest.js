import { Fragment } from "react";
import { useSelector } from "react-redux";

import HolidaysSummary from "./HolidaysSummary";
import AvailableHolidays from "./AvailableHolidays";
import HolidayForm from "./holidayForm";

const Fest = () => {
  const user = useSelector(state => state.user.user);

  return (
    <Fragment>
      <HolidaysSummary />
      {user.position === "Student" && <AvailableHolidays />}
      {user.position === "Teacher" && <HolidayForm />}
    </Fragment>
  );
};

export default Fest;
