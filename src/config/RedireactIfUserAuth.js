import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function RedirectIfUserAuth({ children, ...rest }) {
  const { isAuthenticatedUser } = rest;

  return (
    <Route
      {...rest}
      render={() =>
        !isAuthenticatedUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticatedUser: state.auth.user.isAuthenticatedUser,
  };
};

export default connect(mapStateToProps, null)(RedirectIfUserAuth);
