import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "./store/logIn";
import Navbar from "./component/navigation/Navbar";
import Home from "./component/pages/home/home";
import Result from "./component/pages/result/result";
import Contact from "./component/pages/contact/Contact";
import Form from "./Users/Form";

function App() {
  const isLogin = useSelector(state => state.logIn.isLoggedIn);

  const dispatch = useDispatch();

  function logoutHandler() {
    localStorage.removeItem("isLoggedIn");

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
            <Route path="/logout" component={logoutHandler} />
          </>
        )}
        {!isLogin && <Route path="/login" component={Form} />}
      </Switch>
    </Router>
  );
}
export default App;
