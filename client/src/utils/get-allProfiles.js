import axios from "axios";

const getAllProfiles = async () => {
  const { data: allProfiles } = await axios.get(
    "http://localhost:5000/api/profile"
  );
  return allProfiles;
};

export default getAllProfiles;
