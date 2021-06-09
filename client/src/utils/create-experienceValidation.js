export const createExperienceValidation = ({
  company,
  description,
  location,
  title,
  to,
  from,
}) => {
  const error = {};

  if (company.length < 2 || company.length > 15)
    error.company = "please provide a valide company name";
  if (description.length < 10 || description.length > 100)
    error.description = "At least 10 caracters";
  if (location.length < 2 || location.length > 15)
    error.location = "please provide a valide location";
  if (title.length < 2 || title.length > 15)
    error.title = "please provide a valide title ";
  if (to.length < 2) error.to = "it should not be empty ";
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

  if (school.length < 2 || school.length > 15)
    error.school = "please provide a valide school name";
  if (description.length < 10 || description.length > 100)
    error.description = "At least 10 caracters";
  if (fieldofstudy.length < 2 || fieldofstudy.length > 15)
    error.fieldofstudy = "please provide a valide fieldofstudy";
  if (degree.length < 2 || degree.length > 15)
    error.degree = "please provide a valide title ";
  if (to.length < 2) error.to = "it should not be empty ";
  if (from.length < 2) error.from = "it should not be empty ";
  if (Object.entries(error).length === 0) return false;
  return error;
};
