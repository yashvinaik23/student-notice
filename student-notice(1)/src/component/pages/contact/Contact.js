import { Fragment } from "react";
import { useSelector } from "react-redux";

//import AvailableHolidays from "./AvailableHolidays";
import AvailableContact from "./AvailableContacts";
import ContactForm from "./ContactForm";

const Contact = () => {
  const user = useSelector(state => state.user.user);

  return (
    <Fragment>
      {user.position === "Teacher" && <ContactForm />}
      <AvailableContact />
    </Fragment>
  );
};

export default Contact;
