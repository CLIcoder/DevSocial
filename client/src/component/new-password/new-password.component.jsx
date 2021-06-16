import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const NewPassword = ({
  match: {
    params: { token },
  },
}) => {
  const history = useHistory();
  const [password, setPassword] = useState({
    password1: "",
    password2: "",
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // quick data validation
    const { password1, password2 } = password;
    if (password1 !== password2) {
      setPassword({ ...password, error: "password do not match" });
      return;
    }
    if (password1.length < 6) {
      setPassword({ ...password, error: "At least 6 caracters" });
      return;
    }

    axios
      .put(
        `http://localhost:5000/api/users/${token}/${password1}`,
        {},
        {
          headers: {
            forget: process.env.REACT_APP_FORGET_KEY,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => history.push("/signin"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container padding-bottom-3x mb-2 mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="forgot">
              <h2>Reset Your Password</h2>
              <p>hello user</p>
            </div>
            <form onSubmit={handleSubmit} className="card mt-4">
              <div className="card-body">
                <div className="form-group">
                  <label>Enter your new password</label>
                  <input
                    onChange={handleChange}
                    className="form-control"
                    type="password"
                    name="password1"
                  />
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    {password.error}
                  </p>
                  <label>Confirm your new password</label>
                  <input
                    onChange={handleChange}
                    className="form-control"
                    type="password"
                    name="password2"
                  />
                  <small className="form-text text-muted"></small>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-success float-right" type="submit">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
