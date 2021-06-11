export const createExperienceValidation = ({
  company,
  description,
  location,
  title,
  from,
}) => {
  const error = {};

  if (company.length < 2 || company.length > 100)
    error.company = "please provide a valide company name";
  if (description.length < 10 || description.length > 100000)
    error.description = "At least 10 caracters";
  if (location.length < 2 || location.length > 100)
    error.location = "please provide a valide location";
  if (title.length < 2 || title.length > 100)
    error.title = "please provide a valide title ";
  if (from.length < 2) error.from = "it should not be empty ";
  if (Object.entries(error).length === 0) return false;
  return error;
};
export const createEducationValidation = ({
  school,
  degree,
  fieldofstudy,
  description,
  to,
  from,
}) => {
  const error = {};

  if (school.length < 2 || school.length > 100)
    error.school = "please provide a valide school name";
  if (description.length < 10 || description.length > 1000000)
    error.description = "At least 10 caracters";
  if (fieldofstudy.length < 2 || fieldofstudy.length > 100)
    error.fieldofstudy = "please provide a valide fieldofstudy";
  if (degree.length < 2 || degree.length > 100)
    error.degree = "please provide a valide title ";
  if (from.length < 2) error.from = "it should not be empty ";
  if (to.length < 2) error.to = "it should not be empty ";
  if (Object.entries(error).length === 0) return false;
  return error;
};
