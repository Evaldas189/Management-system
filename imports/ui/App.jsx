import React, { Fragment } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useTracker } from "meteor/react-meteor-data";
import SideBar from "./SideBar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Meteor } from "meteor/meteor";

export const App = () => {
  const user = useTracker(() => Meteor.user());
  return (
    <div>
      {user ? (
        <Fragment>
          <Router></Router>
          <SideBar />
        </Fragment>
      ) : (
        <Fragment>
          <Router>
            <Switch>
              <Route path="/register" component={() => <RegisterForm />} />
              <Route path="/" component={() => <LoginForm />} />
            </Switch>
          </Router>
        </Fragment>
      )}
    </div>
  );
};
