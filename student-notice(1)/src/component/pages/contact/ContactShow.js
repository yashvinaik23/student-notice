import { Fragment } from "react";
import { useSelector } from "react-redux";

//import AvailableHolidays from "./AvailableHolidays";
import AvailableContact from "./AvailableContacts";
import ContactForm from "./contactForm";

const ContactShow = () => {
  const user = useSelector(state => state.user.user);

  return (
    <Fragment>
      {user.position === "Student" && <AvailableContact />}
      {user.position === "Teacher" && <ContactForm />}
    </Fragment>
  );
};

export default ContactShow;
