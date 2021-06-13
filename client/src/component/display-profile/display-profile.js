import React, { useState, useEffect } from "react";
import { getProfileData } from "../../utils/getProfile-data";
import Loader from "../laoder/loader.component";

const DisplayProfile = ({ location: { customNameData } }) => {
  //location us a prop data for other users to see their profile when not LoggedIn
  const [userData, setUserData] = useState({});

  const displayData = async () => {
    const userData = await getProfileData(customNameData);
    setUserData({ ...userData });
  };

  useEffect(displayData, []);

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
                src={`https://avatars.githubusercontent.com/${userData.github}`}
                alt=""
              />
              <h1 className="large align-middle ">{userData.displayName}</h1>
              <p className="lead align-middle">{userData.workStatus}</p>
              <p>{userData.location}</p>
            </div>

            <div className="profile-about bg-light p-2">
              <h2 className="text-primary">{userData.displayName} Bio</h2>
              <p>{userData.bio}</p>
              <div className="line"></div>
              <h2 className="text-primary">Skill Set</h2>
              <div className="skills d-flex">
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
              {userData.experience.length === 0 ? (
                <h1>No experience Found!</h1>
              ) : (
                ""
              )}
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
                          {from} {to.length === 0 ? "" : "->" + to}
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
              {userData.education.length === 0 ? (
                <h1>No education Found!</h1>
              ) : (
                ""
              )}
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
                          {from} {to.length === 0 ? "" : "->" + to}
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
              {userData.repos.length === 0 ? <h1>No repo Found!</h1> : ""}
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
                          <li className="badge badge-primary    ">
                            Stars: {stargazers_count}
                          </li>
                          <li className="badge badge-dark ml-4 ">
                            Watchers: {watchers_count}
                          </li>
                          <li className="badge badge-light ml-4">
                            Forks: {forks}
                          </li>
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
