/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './containers/Home';

const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
  let loggedIn = false;
  loggedIn = !!localStorage.getItem('token');
  return (
    <Route
      path={path}
      {...rest}
      render={props =>
        loggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);
ProtectedRoute.defaultProps = {
  component: null,
  path: null,
  location: null,
};
ProtectedRoute.propTypes = {
  component: PropTypes.node,
  path: PropTypes.string,
  location: PropTypes.string,
};

export default App;
