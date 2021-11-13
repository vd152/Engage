import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Sidebar from '../components/Main/Sidebar/Sidebar';
import Topbar from '../components/Main/Topbar/Topbar';
import {getAuthToken} from '../utils/localStorage'
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
    getAuthToken() ? (
        <React.Fragment>
          <Topbar />
          <Sidebar />
          <Component {...props} />
        </React.Fragment>
      ) : (
        <Redirect to='/login' />
      )
    }
  />
);

export default PrivateRoute;
