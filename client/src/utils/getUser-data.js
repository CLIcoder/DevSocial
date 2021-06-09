import jsonwebtoken from "jsonwebtoken";

export const getUserData = () => {
  const data = jsonwebtoken.verify(
    window.localStorage.getItem("authorisation"),
    "XjJ6vvzIe6WvqAcJtU85FbwCKDZkw9sW",
    (err, decoded) => {
      // secure jwt and don't allow user to provide invalide token in localStorage
      if (err) {
        window.localStorage.removeItem("authorisation");
        return false;
      }
      return decoded;
    }
  );
  return data;
};
