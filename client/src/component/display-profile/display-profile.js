import React, { useState, useEffect } from "react";
import { getProfileData } from "../../utils/getProfile-data";
import { getUserData } from "../../utils/getUser-data";
import Loader from "../laoder/loader.component";

const DisplayProfile = () => {
  const [userData, setUserData] = useState({});

  const displayData = async () => {
    const userData = await getProfileData();
    setUserData({ ...userData });
  };

  const { avatar } = getUserData();

  useEffect(() => {
    displayData();
  }, []);

  return (
    <>
      {Object.entries(userData).length > 0 ? (
        <section className="container">
          <a className="btn btn-light">Back To Profiles</a>

          <div className="profile-grid my-1">
            <div className="profile-top  p-2">
              <img
                style={{
                  width: "400px",
                  height: "400px",
                  border: "5px solid gray",
                  marginLeft: "10%",
                }}
                className="rounded-circle  "
                src={avatar}
                alt=""
              />
              <h1 className="large float-middle">{userData.displayName}</h1>
              <p className="lead float-middle">{userData.workStatus}</p>
              <p>{userData.location}</p>
            </div>

            <div className="profile-about bg-light p-2">
              <h2 className="text-primary">{userData.displayName} Bio</h2>
              <p>{userData.bio}</p>
              <div className="line"></div>
              <h2 className="text-primary">Skill Set</h2>
              <div className="skills">
                {userData.skills.map((elem, indx) => {
                  return (
                    <div key={Math.random() + indx} className="p-1">
                      <i className="fa fa-check"></i> {elem}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {userData.experience.map(
                (
                  { current, title, company, location, from, to, description },
                  indx
                ) => {
                  return (
                    <div key={Math.random() + indx}>
                      <h3 className="text-dark">{title}</h3>
                      {current ? (
                        <p>{from} - Current</p>
                      ) : (
                        <p>
                          {from} - {to}
                        </p>
                      )}

                      <p>
                        <strong>Position: </strong>
                        {company}
                      </p>
                      <p>
                        <strong>Description: </strong>
                        {description}
                      </p>
                    </div>
                  );
                }
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {userData.education.map(
                (
                  {
                    school,
                    degree,
                    current,
                    fieldofstudy,
                    from,
                    to,
                    description,
                  },
                  indx
                ) => {
                  return (
                    <div key={Math.random() + indx}>
                      <h3>{school}</h3>
                      {current ? (
                        <p>{from} - current</p>
                      ) : (
                        <p>
                          {from} - {to}
                        </p>
                      )}

                      <p>
                        <strong>Degree: </strong>
                        {degree}
                      </p>
                      <p>
                        <strong>Field Of Study: </strong>
                        {fieldofstudy}
                      </p>
                      <p>
                        <strong>Description: </strong>
                        {description}
                      </p>
                    </div>
                  );
                }
              )}
            </div>

            <div className="profile-github">
              <h2 className="text-primary my-1">
                <i className="fab fa-github"></i> Github Repos
              </h2>
              {userData.repos.map(
                (
                  {
                    forks,
                    watchers_count,
                    name,
                    description,
                    stargazers_count,
                  },
                  indx
                ) => {
                  return (
                    <div
                      key={Math.random() + indx}
                      className="repo bg-white p-1 my-1"
                    >
                      <div>
                        <h4>
                          <a>{name}</a>
                        </h4>
                        <p>
                          {description ? description : "No decrption found!"}
                        </p>
                      </div>
                      <div>
                        <ul>
                          <li className="badge badge-primary">
                            Stars: {stargazers_count}
                          </li>
                          <li className="badge badge-dark">
                            Watchers: {watchers_count}
                          </li>
                          <li className="badge badge-light">Forks: {forks}</li>
                        </ul>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DisplayProfile;
