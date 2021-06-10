import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import getAllProfiles from "../../utils/get-allProfiles";
import Loader from "../laoder/loader.component";
import "./profiles.styles.scss";

const Profiles = () => {
  //... getting all user data

  const [profiles, setProfiles] = useState([]);
  const history = useHistory();

  const getProfiles = async () => {
    const result = await getAllProfiles();
    setProfiles([...result]);
    return;
  };

  useEffect(() => {
    getProfiles();
    return;
  }, []);

  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
          <i className="fab fa-connectdevelop"></i> Browse and connect with
          developers
        </p>
        <div className="profiles">
          {Object.entries(profiles).length > 0 ? (
            profiles.map(
              (
                { displayName, company, location, skills, github, user },
                indx
              ) => {
                return (
                  <div key={Math.random() + indx} className="profile bg-light">
                    <img
                      className="round-img"
                      src={`https://avatars.githubusercontent.com/${github}`}
                      alt=""
                    />
                    <div>
                      <h2>{displayName}</h2>
                      <p>{company}</p>
                      <p>{location}</p>
                      <a
                        onClick={() =>
                          history.push({
                            pathname: "/display-profile",
                            customNameData: user,
                          })
                        }
                        className="btn btn-primary"
                      >
                        View Profile
                      </a>
                    </div>
                    <ul>
                      {skills.map((elem) => (
                        <li className="text-primary">
                          <i className="fas fa-check"></i> {elem}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
            )
          ) : (
            <Loader />
          )}
        </div>
      </section>
    </>
  );
};

export default Profiles;
