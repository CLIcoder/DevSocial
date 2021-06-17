import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

import { signInValidation } from "../../utils/formValidation";

const SignIn = () => {
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
    if (dataError) setError({ ...dataError });
    else {
      //login the user after signIn
      await axios
        .post(`${process.env.REACT_APP_URL}/api/users/signin`, { ...field })
        .then((res) => {
          // logging the user then redirecting to dashboard page
          window.localStorage.setItem("authorisation", res.data.tokens);
          window.location.reload();
        })
        .catch(() => {
          //... pushing new error data into error state
          setError({ email: "", password: "password or email incorrect" });
        });
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your DevSocial account
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
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <u></u>

                  <u>
                    <a
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => history.push("/forget-password")}
                    >
                      forget password ?
                    </a>
                  </u>
                </div>
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
