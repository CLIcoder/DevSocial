import React from "react";
import { useHistory } from "react-router-dom";

import { getUserData } from "../../utils/getUser-data";

const Dashboard = () => {
  const history = useHistory();
  const data = getUserData();
  console.log(data);
  //rerender the page
  return (
    <>
      <h1> welcome {data.name}</h1>
      <h3>No profile found !</h3>
      <button
        onClick={() => {
          history.push("/create-profile");
        }}
      >
        create your profile
      </button>
    </>
  );
};

export default Dashboard;
