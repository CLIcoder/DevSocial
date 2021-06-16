import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import getAllProfiles from "../../utils/get-allProfiles";
import Loader from "../laoder/loader.component";
import "./profiles.styles.scss";

const Profiles = () => {
  //... getting all user data
  const [profiles, setProfiles] = useState([]);

  // setting pagination state
  const [pageNum, setPageNum] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState([]);
  const [nothingFound, setnothingFound] = useState(false);

  const history = useHistory();

  const getProfiles = async () => {
    const result = await getAllProfiles();
    setProfiles([...result]);
    setPageNum(0);
    return;
  };

  const pagination = () => {
    let newPage = [];
    let i = 0;
    while (i < 6) {
      if (!profiles[pageNum + i]) break;
      newPage.push(profiles[pageNum + i]);
      i++;
    }
    setPage([...newPage]);
    return;
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setnothingFound(false);

    let newProfile = [];
    for (let elem in profiles) {
      if (profiles[elem].github.search(value) !== -1) {
        newProfile.push(profiles[elem]);
      }
    }
    if (newProfile.length === 0) {
      setnothingFound(true);
      return;
    }
    const uniq = [...new Set([...newProfile, ...profiles])];
    setProfiles([...uniq]);
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setnothingFound(false);

    let newProfile = [];
    for (let elem in profiles) {
      if (profiles[elem].github.search(search) !== -1) {
        newProfile.push(profiles[elem]);
      }
    }
    if (newProfile.length === 0) {
      setnothingFound(true);
      return;
    }
    const uniq = [...new Set([...newProfile, ...profiles])];
    setProfiles([...uniq]);
    return;
  };

  useEffect(getProfiles, []);

  // render  new component on paginationNumber change
  useEffect(pagination, [pageNum, profiles]);

  return (
    <>
      <section className="container">
        <h4 className="text-dark ">
          <i className="fab fa-github "></i> Search By Github Username
        </h4>
        <form onSubmit={handleSubmit} className="input-group">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Live search is on, type and result
            will show off..."
            onChange={handleChange}
          />
          <button
            type="button"
            type="submit"
            className="btn btn-outline-primary"
          >
            search
          </button>
        </form>

        <p className="lead my-5">
          <i className="fab fa-connectdevelop "></i> Browse and connect with
          developers
        </p>
        <div key={Math.random()} div className="profiles">
          {nothingFound ? <h1> 😅 No developer found</h1> : ""}
          {page.length === 0 && !nothingFound ? <Loader /> : ""}
          {page.length > 0 && !nothingFound
            ? page.map(
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
            : ""}
          <ul className="pagination justify-content-center">
            <li className="page-item ">
              {pageNum > 0 ? (
                <button
                  onClick={() => {
                    setPageNum((num) => num - 5);
                  }}
                  class="page-link"
                >
                  ⬅️ Previous
                </button>
              ) : (
                ""
              )}
            </li>
            <li className="page-item ">
              {!page[pageNum] || nothingFound || page.length < 6 ? (
                ""
              ) : (
                <button
                  onClick={() => {
                    setPageNum((num) => num + 5);
                  }}
                  class="page-link"
                >
                  Next ➡️
                </button>
              )}
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Profiles;
