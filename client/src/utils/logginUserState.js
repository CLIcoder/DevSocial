import React from "react";
import { Route, Redirect } from "react-router-dom";

const LoggedIn = ({ component: Component, ...rest }) => {
  return (
    // lokcked in the sign in and sign Up and / for logged in users
    <Route
      {...rest}
      render={(props) =>
        !window.localStorage.getItem("authorisation") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/display-profile" />
        )
      }
    />
  );
};

export default LoggedIn;
