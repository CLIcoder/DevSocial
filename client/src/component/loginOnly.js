import React, { useContext } from "react";
import { userContext } from "../context/userContext";
import { Redirect } from "react-router-dom";

const LoginOnly = () => {
  const [user] = useContext(userContext);

  return window.localStorage.getItem("authorisation") ? (
    <>
      <h1> Welcome you're now connect !</h1>
      <button onClick={() => console.log(user)}>See my user info</button>
      <br />
      <button
        onClick={() => {
          window.localStorage.removeItem("authorisation");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </>
  ) : (
    <Redirect to="/signin" />
  );
};

export default LoginOnly;
