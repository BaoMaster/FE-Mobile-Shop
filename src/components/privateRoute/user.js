import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import * as authActions from "../../actions/auth";

function PrivateRouteUser({ component: Component, ...rest }) {
  const { isAuthenticated } = rest;

  const dispatch = useDispatch();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/shop/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

PrivateRouteUser.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.user.isAuthenticatedUser,
  };
};

export default connect(mapStateToProps, null)(PrivateRouteUser);
