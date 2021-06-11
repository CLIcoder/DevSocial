import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProfileData } from "../../utils/getProfile-data";
import { getUserData } from "../../utils/getUser-data";

const Navbar = () => {
  const [avatar, setAvatar] = useState("");

  const displayData = async () => {
    const userData = await getProfileData();
    const { avatar } = getUserData();
    if (!userData) setAvatar(avatar);
    else {
      setAvatar(`https://avatars.githubusercontent.com/${userData.github}`);
    }
  };

  useEffect(() => {
    displayData();
    return;
  }, []);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          DevSocial
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Developers
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {window.localStorage.getItem("authorisation") ? (
              <>
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: "gray",
                    border: "none",
                    marginLeft: "80px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    window.localStorage.removeItem("authorisation");
                    window.location.reload();
                  }}
                  className="nav-link"
                >
                  Logout
                </button>
                <img
                  className="rounded-circle"
                  src={avatar}
                  alt=""
                  style={{
                    width: "60px",
                    height: "50px",
                    marginRight: "20px",
                  }}
                  title="You must have a Gravatar connected to your email to display an image"
                />
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="signUp">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="signIn">
                    sign In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
