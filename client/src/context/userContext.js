import React, { createContext, useState } from "react";

export const userContext = createContext();

// creating user context for other props to consume
export const UserProvider = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
    date: "",
    iat: "",
    profile: {},
  });

  return (
    <userContext.Provider value={[user, setUser]}>
      {props.children}
    </userContext.Provider>
  );
};
