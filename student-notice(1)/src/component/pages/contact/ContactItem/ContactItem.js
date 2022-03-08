import classes from "./ContactItem.module.css";
import { useSelector } from "react-redux";
import Button from "../../../../UI/Button";

const ContactItem = props => {
  const price = `contact: ${props.price}`;
  const user = useSelector(state => state.user.user);

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
        {user.position === "Teacher" && <Button>Delete</Button>}
      </div>
      <div></div>
    </li>
  );
};

export default ContactItem;
