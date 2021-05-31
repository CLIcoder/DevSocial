import React, { useContext } from "react";
import { userContext } from "../../context/userContext";

const CreateProfile = () => {
  const [user] = useContext(userContext);
  return (
    <>
      <h1> welcome {user.name} </h1>
      <h3>Let's create your profile now...</h3>
    </>
  );
};

export default CreateProfile;
