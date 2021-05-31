import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Main from "../component/layout/main";

const Home = () => {
  const history = useHistory();
  useEffect(() => {
    if (window.localStorage.getItem("authorisation"))
      history.push("/dashboard");
  }, []);
  return (
    <>
      <Main />
    </>
  );
};

export default Home;
