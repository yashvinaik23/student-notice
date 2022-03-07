import classes from "./AvailableResults.module.css";
import ResultItem from "./ResultItem/ResultItem";
import Card from "../../../UI/Card";
import { bindActionCreators } from "redux";
import { connect } from "react-redux"
import axios from "axios";
import { useState } from "react";

const AvailableResults = () => {
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(false);

  const getResult = () => {
    axios.get("http://localhost:8000/results").then(response => {
      setResult(response.data);
      console.log(response.data);
      setShow(!show);
    });
  };

  const resultsList = result.map(meal => (
    <ResultItem
      key={meal.id}
      name={meal.subject}
      description={meal.status}
      price={meal.marks}
    />
  ));

  return (
    <div>
      <button className={classes.button} onClick={getResult}>
        {show ? "Hide" : "Get Result"}
      </button>
      <section className={classes.meals}>
        <Card>
          <ul>{show && resultsList}</ul>
        </Card>
      </section>
    </div>
  );
};

export default AvailableResults;
