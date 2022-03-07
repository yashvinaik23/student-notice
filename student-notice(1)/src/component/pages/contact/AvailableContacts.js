import classes from "./AvailableContacts.module.css";
import ContactItem from "./ContactItem/ContactItem";
import Card from "../../../UI/Card";
import axios from "axios";
import { useState } from "react";

const AvailableContacts = () => {
  const [contact, setContact] = useState([]);
  const [show, setShow] = useState(false);

  const getContact = () => {
    axios.get("http://localhost:8000/getcontact").then(response => {
      setContact(response.data);
      console.log(response);
      setShow(!show);
    });
  };

  const contactList = contact.map(meal => (
    <ContactItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.number}
    />
  ));

  return (
    <div>
      <button className={classes.button} onClick={getContact}>
        {show ? "Hide" : "Get Contact"}
      </button>
      <section className={classes.meals}>
        <Card>
          <ul>{show && contactList}</ul>
        </Card>
      </section>
    </div>
  );
};

export default AvailableContacts;
