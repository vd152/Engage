import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Main from '../components/Main';
import Sidebar from '../components/Main/Sidebar/Sidebar';
import Topbar from '../components/Main/Topbar/Topbar';
import PublicRoute from './publicRoutes';

const routes = (
  <Router>
    <React.Fragment>
      <Topbar />
      <Sidebar />
      <Switch>
        <PublicRoute exact path='/' component={Main} />
      </Switch>
    </React.Fragment>
  </Router>
);
export default routes;
