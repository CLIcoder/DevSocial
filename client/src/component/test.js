import React from "react";
import jsonwebtoken from "jsonwebtoken";
import { useHistory } from "react-router-dom";

const Test = () => {
  const history = useHistory();

  const verify = () => {
    const token = window.localStorage.getItem("authorisation");
    if (!token) return history.push("/signIn");
    const data = jsonwebtoken.verify(token, "XjJ6vvzIe6WvqAcJtU85FbwCKDZkw9sW");
    console.log(data);
  };
  const logout = () => {
    window.localStorage.removeItem("authorisation", null);
  };

  return (
    <>
      <button onClick={logout}>sing out</button>
      <button onClick={verify}> Verify token</button>
    </>
  );
};

export default Test;
