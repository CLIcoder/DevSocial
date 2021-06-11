import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getProfileData } from "../../utils/getProfile-data";

import { getUserData } from "../../utils/getUser-data";

const Dashboard = () => {
  const history = useHistory();
  const [profile, setProfile] = useState({});
  const [userdata, setUserData] = useState({});

  const getData = async () => {
    const result = await getProfileData();
    const data = getUserData();
    if (result) setProfile({ ...result });
    setUserData({ ...data });
  };

  useEffect(() => {
    getData();
    return;
  }, []);
  return (
    <>
      <section class="container">
        {Object.entries(userdata).length > 0 ? (
          <>
            <h1 class="large text-primary">Dashboard</h1>
            <p class="lead">
              <i class="fas fa-user"></i> Welcome {userdata.name}
            </p>
            {Object.entries(profile).length === 0 ? (
              <button onClick={() => history.push("/create-profile")}>
                create profile
              </button>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
        {Object.entries(profile).length > 0 ? (
          <>
            <div class="dash-buttons">
              <a href="create-profile.html" class="btn btn-light">
                <i class="fas fa-user-circle text-primary"></i> Edit Profile
              </a>
              <a href="add-experience.html" class="btn btn-light">
                <i class="fab fa-black-tie text-primary"></i> Add Experience
              </a>
              <a href="add-education.html" class="btn btn-light">
                <i class="fas fa-graduation-cap text-primary"></i> Add Education
              </a>
            </div>

            <h2 class="my-2">Experience Credentials</h2>
            <table class="table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th class="hide-sm">Title</th>
                  <th class="hide-sm">Years</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {profile.experience.map(
                  ({ title, company, from, to }, indx) => {
                    return (
                      <tr key={Math.random() + indx}>
                        <td>{company}</td>
                        <td class="hide-sm">{title}</td>
                        <td class="hide-sm">
                          {from} - {to}
                        </td>
                        <td>
                          <button class="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>

            <h2 class="my-2">Education Credentials</h2>
            <table class="table">
              <tbody>
                {profile.education.map(({ school, degree, from, to }, indx) => {
                  return (
                    <tr key={Math.random() + indx}>
                      <td>{school}</td>
                      <td class="hide-sm">{degree}</td>
                      <td class="hide-sm">
                        {from} - {to}
                      </td>
                      <td>
                        <button class="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div class="my-2">
              <button class="btn btn-danger">
                <i class="fas fa-user-minus"></i>
                Delete My Account
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default Dashboard;
