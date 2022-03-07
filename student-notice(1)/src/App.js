import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./component/navigation/Navbar";
import Home from "./component/pages/home";
import Result from "./component/pages/result";
import Contact from "./component/pages/contact";

import Form from "./Users/Form";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginActions } from "./store/logIn";

function App() {
  const isLogin = useSelector(state => state.logIn.isLoggedIn);

  const dispatch = useDispatch();

  function logoutHandler() {
    dispatch(loginActions.logout());
    window.location.reload(false);
  }

  return (
    <Router>
      <Navbar />
      <Switch>
        {isLogin && (
          <>
            <Route exact path="/" component={Home} />
            <Route path="/result" component={Result} />
            <Route path="/contact" component={Contact} />
            <Route path="/Logout" component={logoutHandler} />
          </>
        )}
        {!isLogin && <Route path="/Login" component={Form} />}
      </Switch>
    </Router>
  );
}
export default App;
