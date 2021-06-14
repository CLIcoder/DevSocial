import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  deleteAll,
  deleteEducation,
  deleteExperience,
} from "../../utils/delete";
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
      <section className="container">
        {Object.entries(userdata).length > 0 ? (
          <>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
              <i className="fas fa-user"></i> Welcome {userdata.name}
            </p>
            {Object.entries(profile).length === 0 ? (
              <button onClick={() => history.push("/profile")}>
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
            <div className="dash-buttons">
              <a
                onClick={() =>
                  history.push({
                    pathname: "/profile",
                    customNameData: "edit profile",
                  })
                }
                className="btn btn-light"
              >
                <i className="fas fa-user-circle text-primary"></i> Edit Profile
              </a>
              <a
                onClick={() =>
                  history.push({
                    pathname: "/experience",
                    customNameData: "add experience",
                  })
                }
                className="btn btn-light"
              >
                <i className="fab fa-black-tie text-primary"></i> Add Experience
              </a>
              <a
                onClick={() =>
                  history.push({
                    pathname: "/education",
                    customNameData: "add education",
                  })
                }
                className="btn btn-light"
              >
                <i className="fas fa-graduation-cap text-primary"></i> Add
                Education
              </a>
            </div>

            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th className="hide-sm">Title</th>
                  <th className="hide-sm">Years</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {profile.experience.map(
                  ({ title, company, from, to, _id }, indx) => {
                    return (
                      <tr key={Math.random() + indx}>
                        <td>{company}</td>
                        <td className="hide-sm">{title}</td>
                        <td className="hide-sm">
                          {from} {to.length === 0 ? "" : "->" + to}
                        </td>
                        <td>
                          <button
                            onClick={async () => {
                              if (window.confirm("Delete the item?")) {
                                await deleteExperience(_id);
                                getData();
                                return;
                              }
                            }}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>

            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>school</th>
                  <th className="hide-sm">degree</th>
                  <th className="hide-sm">Years</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {profile.education.map(
                  ({ school, degree, from, to, _id }, indx) => {
                    return (
                      <tr key={Math.random() + indx}>
                        <td>{school}</td>
                        <td className="hide-sm">{degree}</td>
                        <td className="hide-sm">
                          {from} {to.length === 0 ? "" : "->" + to}
                        </td>
                        <td>
                          <button
                            onClick={async () => {
                              if (window.confirm("Delete the item?")) {
                                await deleteEducation(_id);
                                getData();
                                return;
                              }
                            }}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            <div className="">
              <button
                onClick={async () => {
                  if (window.confirm("Delete the account?")) {
                    await deleteAll();
                    window.localStorage.removeItem("authorisation");
                    window.location.reload();
                    return;
                  }
                }}
                className=" btn btn-danger"
              >
                <i className=""></i>
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
