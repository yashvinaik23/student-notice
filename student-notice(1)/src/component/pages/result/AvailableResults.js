import { useEffect } from "react";
import { useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ResultItem from "./ResultItem/ResultItem";
import Card from "../../../UI/Card";
import { GetResult } from "../../../actions/actions";
import classes from "./AvailableResults.module.css";

const AvailableResults = props => {
  const user = useSelector(state => state.user.user);

  const getResult = async () => {
    await props?.GetResult(user);
  };
  useEffect(() => {
    getResult();
  }, []);

  const resultsList = props?.result.map(meal => {
    return (
      <ResultItem
        key={meal._id}
        name={meal.subject}
        status={meal.status}
        price={meal.marks}
      />
    );
  });

  return (
    <div>
      <section className={classes.meals}>
        <Card>
          <ul>{resultsList}</ul>
        </Card>
      </section>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    result: state.user.result,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      GetResult: user => GetResult(user),
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AvailableResults);
