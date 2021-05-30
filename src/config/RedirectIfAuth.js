import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function RedirectIfAuth({ children, ...rest }) {
  const { isAuthenticated } = rest;

  return (
    <Route
      {...rest}
      render={() =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/admin/userlist",
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, null)(RedirectIfAuth);
