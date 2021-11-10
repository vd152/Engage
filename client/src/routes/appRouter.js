import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import PublicRoute from './publicRoutes';

const routes = (
  <Router>
    <React.Fragment>
      <Switch>
        <PublicRoute exact path='/' component={Home} />
      </Switch>
    </React.Fragment>
  </Router>
);
export default routes;
