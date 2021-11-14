import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import Main from "../components/Main";
import UserRoles from "../components/UsersRoles";
import PrivateRoute from "./privateRoutes";
import PublicRoute from "./publicRoutes";

const routes = (
  
  <Router>
    <Switch>
      <PublicRoute exact path="/login" component={Auth} />
      <PrivateRoute exact path="/" component={Main} />
      <PrivateRoute exact path="/user-role" component={UserRoles}/>
    </Switch>
  </Router>
);
export default routes;
