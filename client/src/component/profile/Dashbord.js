import React, { useContext } from "react";
import { userContext } from "../../context/userContext";

const Dashboard = () => {
  const [user] = useContext(userContext);
  console.log(user, "logging the user");
  return (
    <>
      <h1> welcome {user.name} </h1>
      <h3>only few step left to join the devsocial network</h3>
    </>
  );
};

export default Dashboard;
