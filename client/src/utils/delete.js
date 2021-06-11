import axios from "axios";

export const deleteEducation = async (_id) => {
  await axios.delete(`http://localhost:5000/api/profile/education/${_id}`, {
    headers: {
      authorisation: window.localStorage.getItem("authorisation"),
      "Content-Type": "application/json",
    },
  });
  return;
};

export const deleteExperience = async (_id) => {
  await axios.delete(`http://localhost:5000/api/profile/experience/${_id}`, {
    headers: {
      authorisation: window.localStorage.getItem("authorisation"),
      "Content-Type": "application/json",
    },
  });
  return;
};

export const deleteAll = async () => {
  await axios.delete(`http://localhost:5000/api/profile`, {
    headers: {
      authorisation: window.localStorage.getItem("authorisation"),
      "Content-Type": "application/json",
    },
  });
  return;
};
