export const signUpValidation = ({ name, email, password, password2 }) => {
  const error = {
    name: "",
    email: "",
    password: "",
  };

  if (name.length <= 1) error.name = "Please type a valide name";
  if (!/\S+@\S+\.\S+/.test(email)) error.email = "Please type a valide mail";
  if (password !== password2) error.password = "password does not match";
  if (password.length <= 5)
    error.password = "You should have at least 6 caracter";
  else return false;

  return error;
};
