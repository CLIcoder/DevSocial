import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { userContext } from "../../context/userContext";

const Dashboard = () => {
  const [user] = useContext(userContext);
  const history = useHistory();
  //rerender the page
  return (
    <>
      <h1> welcome {user.name} </h1>
      <h3>No profile found !</h3>
      <button
        onClick={() => {
          history.push("/display-profile");
        }}
      >
        create your profile
      </button>
    </>
  );
};

export default Dashboard;
