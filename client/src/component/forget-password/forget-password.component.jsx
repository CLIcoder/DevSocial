import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ForgetPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation email before sending it to the api
    if (!/\S+@\S+\.\S+/.test(email)) {
      setSent("error");
      return;
    }
    // calling the api with new JWT token
    axios
      .post(
        "http://localhost:5000/api/users/token",
        JSON.stringify({ email }),
        {
          headers: {
            forget: process.env.REACT_APP_FORGET_KEY,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setSent(true);
        return;
      })
      .catch(() => setSent("error"));
  };

  const handleChange = (e) => {
    setSent(false);
    const { value } = e.target;
    setEmail(value);
    return;
  };

  return (
    <>
      <div className="container padding-bottom-3x mb-2 mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="forgot">
              <h2>Forgot your password?</h2>
              <p>
                Change your password in three easy steps. This will help you to
                secure your password!
              </p>
              <ol className="list-unstyled">
                <li>
                  <span className="text-primary text-medium">1. </span>Enter
                  your email address below.
                </li>
                <li>
                  <span className="text-primary text-medium">2. </span>Our
                  system will send you a temporary link
                </li>
                <li>
                  <span className="text-primary text-medium">3. </span>Use the
                  link to reset your password
                </li>
              </ol>
            </div>
            <form onSubmit={handleSubmit} noValidate className="card mt-4">
              <div className="card-body">
                <div className="form-group">
                  <label>Enter your email address</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="email-for-pass"
                    onChange={handleChange}
                  />
                  {sent && sent !== "error" ? (
                    <p
                      style={{
                        color: "green",
                      }}
                    >
                      Check your email now !
                    </p>
                  ) : (
                    ""
                  )}
                  {sent === "error" ? (
                    <p
                      style={{
                        color: "red",
                      }}
                    >
                      Email not found
                    </p>
                  ) : (
                    ""
                  )}
                  <small className="form-text text-muted">
                    Enter the email address you used during the registration
                  </small>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-success float-right" type="submit">
                  Get New Password
                </button>
                <button
                  onClick={() => history.push("/signin")}
                  className="btn btn-danger"
                  type="submit"
                >
                  Back to SignIn
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
