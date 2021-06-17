import { getUserData } from "./getUser-data";
import axios from "axios";

export const getProfileData = async (_id = undefined) => {
  let userData = {};

  const { _id: _userid } = getUserData();

  //User Profile Data
  const { data: profileData } = await axios.get(
    // if the _id value is given it will be called else _userid will take place from display-profile props
    `${process.env.REACT_APP_URL}/api/profile/${_id || _userid}`
  );
  if (profileData === null) return false;
  userData = { ...profileData };

  //desctructuring github from user data
  const { github } = userData;
  const { data } = await axios.get(
    `https://api.github.com/users/${github}/repos?per_page=5`
  );
  userData = {
    image: `https://avatars.githubusercontent.com/${userData.github}`,
    ...userData,
    repos: data,
  };

  return userData;
};
