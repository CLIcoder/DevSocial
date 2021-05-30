import jsonwebtoken from "jsonwebtoken";

// adding a jwt for lg in users
export const pushingToken = () => {
  const token = window.localStorage.getItem("authorisation");
  if (!token) return history.push("/signIn");
  const data = jsonwebtoken.verify(token, "XjJ6vvzIe6WvqAcJtU85FbwCKDZkw9sW");
  return data;
};

// removing Jwt token for sign out users
export const removingToken = () => {
  window.localStorage.removeItem("authorisation");
};
