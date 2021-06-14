import axios from "axios";

export const createProfileValidation = async ({
  displayName,
  company,
  website,
  location,
  bio,
  github,
  skills,
}) => {
  let error = {};

  await axios
    .get(`https://api.github.com/users/${github}`)
    .catch(() => (error.github = "Provide a real github account"));

  if (displayName.length < 2 || displayName.length > 100)
    error.displayName = "Please provide a valid display name";
  if (github.length < 2 || github.length > 100)
    error.github = "Please Provide a valid github username";
  if (location.length < 2 || location.length > 20)
    error.location = "Please provide a valide location";
  if (
    !website.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
    )
  )
    error.website = "please provise a valide url";
  if (company.length < 2 || company.length > 100)
    error.company = "Please provide a valid company name";
  if (bio.length < 15 || bio.length > 100000)
    error.bio = "At least 16 caracters";
  if (skills.length < 1) error.skills = "You should provide at least one skill";

  if (Object.entries(error).length === 0) return false;

  return error;
};
