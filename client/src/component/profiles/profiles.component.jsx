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

  const handleChange = (e) => {
    const { value } = e.target;
    // create a search api and get back result on each input paginated
  };

  useEffect(() => {
    getProfiles();
    return;
  }, []);

  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Developers</h1>
        <div class="form-outline">
          <input
            onChange={handleChange}
            name="search"
            type="search"
            id="form1"
            class="form-control"
          />
          <label class="form-label" for="form1">
            Search
          </label>
        </div>
        {/** TODO: Implement search and pagination */}

        <p className="lead">
          <i className="fab fa-connectdevelop"></i> Browse and connect with
          developers
        </p>
        <div key={Math.random()} div className="profiles">
          {Object.entries(profiles).length > 0 ? (
            profiles.map(
              (
                { displayName, company, location, skills, github, user },
                indx
              ) => {
                return (
                  <div
                    key={Math.random() + indx + Math.random()}
                    className="profile bg-light"
                  >
                    <img
                      className="round-img"
                      src={`https://avatars.githubusercontent.com/${github}`}
                      alt=""
                    />
                    <div>
                      <h2>{displayName}</h2>
                      <p>{company}</p>
                      <a href={`https://github.com/${github}`}>Github Link</a>
                      <p>{location}</p>
                      <a
                        onClick={() =>
                          history.push({
                            pathname: "/display-developers",
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
