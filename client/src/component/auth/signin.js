import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { signInValidation } from "../../utils/formValidation";
import { userContext } from "../../context/userContext";

const SignIn = () => {
  const [_, setUser] = useContext(userContext);
  const history = useHistory();
  const [field, setFiled] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiled({ ...field, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    const dataError = signInValidation(field);

    // checking if no error is seen while registring user
    if (!dataError) setError({ ...dataError });

    //login the user after signIn
    await axios
      .post("http://localhost:5000/api/users/signIn", { ...field })
      .then((res) => {
        window.localStorage.setItem("authorisation", res.data.tokens);
        //... update context with a new user for other props to consume using utils/getUserInfo && context/userContext
      })
      .catch((err) => {
        //... pushing new error data into error state
      });
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your DevConnector account
            </p>
            <form noValidate onSubmit={submitData}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address"
                  name="email"
                  value={field.email}
                  onChange={handleChange}
                />
                <div style={{ color: "red" }}>{error.email}</div>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  value={field.password}
                  onChange={handleChange}
                />
                <div style={{ color: "red" }}>{error.password}</div>
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
