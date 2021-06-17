import axios from "axios";

const getAllProfiles = async () => {
  const { data: allProfiles } = await axios.get(
    `${process.env.REACT_APP_URL}/api/profile`
  );
  return allProfiles;
};

export default getAllProfiles;
