import React from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  isLoading,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated && !isLoading ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  isAuthenticated: state.user.currentUser !== null
});

export default connect(mapStateToProps)(PrivateRoute);
