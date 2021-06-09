import React, { useState } from "react";
import axios from "axios";

import { signUpValidation } from "../../utils/formValidation";

const SignUp = () => {
  // setting up the state
  const [field, setField] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();

    const dataError = signUpValidation(field);
    if (dataError) return setError({ ...error, ...dataError });
    else {
      //login the user after signUp
      const { password2, ...valideData } = field;
      // register user
      await axios
        .post("http://localhost:5000/api/users/signup", { ...valideData })
        .then(async (res) => {
          // login the user
          await axios
            .post("http://localhost:5000/api/users/signin", { ...res.data })
            .then((res) => {
              window.localStorage.setItem("authorisation", res.data.tokens);
              window.location.reload();
            });
        })
        // handling if the email exist error
        .catch((err) => setError({ ...error, ...err.response.data }));
    }
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevSocial account</p>
            <form noValidate onSubmit={submitData}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  value={field.name}
                />
                <div style={{ color: "red" }}>{error.name}</div>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address"
                  name="email"
                  onChange={handleChange}
                  value={field.email}
                />
                <div style={{ color: "red" }}>{error.email}</div>
                <small className="form-text text-muted">
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={field.password}
                />
                <div style={{ color: "red" }}>{error.password}</div>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm Password"
                  name="password2"
                  onChange={handleChange}
                  value={field.password2}
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
export default SignUp;
