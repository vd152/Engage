import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
    //   !getToken() && !getAuthToken() ? (
        true?(
        <React.Fragment>
          <Component {...props} />
        </React.Fragment>
      ) : (
        <Redirect to='/dashboard' />
      )
    }
  />
);

export default PublicRoute;
