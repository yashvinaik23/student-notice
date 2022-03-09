import classes from "./ContactItem.module.css";
import { useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { DeleteContact } from "../../../../store/actions";

const ContactItem = props => {
  const contact = `contact: ${props.contact}`;
  const user = useSelector(state => state.user.user);

  const deleteHandler = () => {
    const id = props.id;
    props?.DeleteContact(id);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{contact}</div>
        {user.position === "Teacher" && (
          <button onClick={deleteHandler}>Delete</button>
        )}
      </div>
      <div></div>
    </li>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DeleteContact: id => DeleteContact(id),
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ContactItem);
