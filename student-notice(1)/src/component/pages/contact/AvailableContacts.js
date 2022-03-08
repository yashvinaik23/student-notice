import { useEffect, useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { GetContact } from "../../../store/actions";
import ContactItem from "./ContactItem/ContactItem";
import Card from "../../../UI/Card";

import classes from "./AvailableContacts.module.css";

const AvailableContacts = props => {
  //const [contact, setContact] = useState([]);
  const [show, setShow] = useState(false);

  const getContact = async () => {
    await props?.GetContact();
    setShow(!show);
  };
  useEffect(() => {
    getContact();
  }, []);
  const contactList = props?.contact.map(meal => (
    <ContactItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.number}
    />
  ));

  return (
    <div>
      <section className={classes.meals}>
        <Card>
          <ul>{show && contactList}</ul>
        </Card>
      </section>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    contact: state.user.contact,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      GetContact: () => GetContact(),
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AvailableContacts);
