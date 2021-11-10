import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
    //   getToken()|| getAuthToken() ? (
        true?(
        <React.Fragment>
          <Component {...props} />
        </React.Fragment>
      ) : (
        <Redirect to='/' />
      )
    }
  />
);

export default PrivateRoute;
