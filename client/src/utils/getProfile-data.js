import { getUserData } from "./getUser-data";
import axios from "axios";

export const getProfileData = async () => {
  let userData = {};
  const { _id } = getUserData();

  //User Profile Data
  const { data: profileData } = await axios.get(
    `http://localhost:5000/api/profile/${_id}`
  );
  userData = { ...profileData };

  //desctructuring github from user data
  const { github } = userData;
  const { data } = await axios.get(
    `https://api.github.com/users/${github}/repos?per_page=5`
  );
  userData = { ...userData, repos: data };

  return userData;
};
