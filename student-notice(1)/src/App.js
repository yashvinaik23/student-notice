import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { loginActions } from "./store/logIn";
import { userAction } from "./store/user";
import Navbar from "./component/navigation/Navbar";
import Home from "./component/pages/home/home";
import Result from "./component/pages/result/result";
import Contact from "./component/pages/contact/Contact";
import Form from "./Users/Form";

function App() {
  const isLogin = useSelector(state => state.logIn.isLoggedIn);

  const dispatch = useDispatch();

  function Content() {
    let history = useHistory();
    dispatch(loginActions.logout());
    dispatch(userAction.logOut());

    <Redirect to="" />;
    // function logoutHandler() {
    //   history.push("/");
    // }

    window.location.reload(false);
    //return <div>{logoutHandler}</div>;
  }

  return (
    <Router>
      <Navbar />
      <Switch>
        {isLogin && (
          <>
            <Route path="/home" component={Home} />
            <Route path="/result" component={Result} />
            <Route path="/contact" component={Contact} />
            <Route path="/logout" component={Content} />
          </>
        )}
        <Route path="/" component={Form} />
      </Switch>
    </Router>
  );
}
export default App;
