import React from "react";
import { Route, Redirect } from "react-router-dom";

const NotLoggedIn = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        !window.localStorage.getItem("authorisation") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
};

export default NotLoggedIn;
