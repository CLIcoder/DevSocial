import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createProfileValidation } from "../../utils/create-profileValidation";
import ButtonRemove from "../button-remove/button-remove.component";
import axios from "axios";
import Loader from "../laoder/loader.component";
import { getProfileData } from "../../utils/getProfile-data";

const CreateProfile = ({ location: { customNameData } }) => {
  const history = useHistory();
  const [skill, setskill] = useState([]);
  const [loader, setLoader] = useState(false);
  const [field, setFiled] = useState({
    displayName: "",
    company: "",
    website: "",
    location: "",
    workStatus: "",
    bio: "",
    github: "",
  });
  const [fieldError, setFiledError] = useState({
    displayName: "",
    company: "",
    website: "",
    location: "",
    workStatus: "",
    bio: "",
    github: "",
    skills: "",
  });

  const removeSkill = (value) => {
    if (skill.length === 1) setskill([]);
    else {
      const newskill = skill.filter((item) => item !== value);
      setskill([...newskill]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "skill" && value[value.length - 1] === " ") {
      if (value[value.length - 1] === " " && value[value.length - 2] === " ") {
        e.target.value = "";
        return;
      }
      if (skill.length > 14) {
        alert("you've reach your skill limit");
        return;
      }
      setskill((oldArray) => [...oldArray, value.slice(0, -1)]);
      e.target.value = "";
    }
    if (name !== "skill") {
      setFiled({ ...field, [name]: value });
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    const error = await createProfileValidation({ ...field, skills: skill });
    if (error) {
      setFiledError({ ...error });
      return;
    }
    setLoader(true);

    await axios
      .post(
        "http://localhost:5000/api/profile",
        JSON.stringify({ ...field, skills: [...skill] }),
        {
          headers: {
            authorisation: window.localStorage.getItem("authorisation"),
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => history.push("/Dashboard"))
      .catch((err) => console.log(err.message));
  };
  const check = async () => {
    const userData = await getProfileData();
    if (userData && !customNameData) history.push("/Dashboard");
  };
  const displayData = async () => {
    const userData = await getProfileData();
    if (userData && !customNameData) history.push("/Dashboard");

    setFiled({
      displayName: userData.displayName,
      company: userData.company,
      website: userData.website,
      location: userData.location,
      workStatus: userData.workStatus,
      bio: userData.bio,
      github: userData.github,
    });
    setskill([...userData.skills]);
  };
  useEffect(() => {
    check();
    if (customNameData) {
      displayData();
      return;
    }
  }, []);
  return (
    <div className="login">
      {!loader ? (
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {customNameData ? (
                <>
                  <h1 className="display-4 text-center">Edit Profile</h1>
                </>
              ) : (
                <>
                  <h1 className="display-4 text-center">Create-profile</h1>
                  <p className="lead text-center">
                    Welcome to the devsocial journey
                  </p>
                </>
              )}
              <form onSubmit={submitData}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Display Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="displayName"
                      value={field.displayName}
                      placeholder="Display Name"
                      onChange={handleChange}
                    />
                    <div style={{ color: "red" }}>{fieldError.displayName}</div>
                  </div>
                  <div className="col-auto">
                    Github
                    <br />
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">@</div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="github"
                        value={field.github}
                        onChange={handleChange}
                        placeholder="Username"
                      />
                      <div style={{ color: "red" }}>{fieldError.github}</div>
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label>Company</label>
                    <input
                      type="text"
                      name="company"
                      onChange={handleChange}
                      value={field.company}
                      className="form-control"
                      placeholder="Google"
                    />
                    <div style={{ color: "red" }}>{fieldError.company}</div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={field.location}
                    placeholder="1234 Main St"
                    name="location"
                  />
                  <div style={{ color: "red" }}>{fieldError.location}</div>
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input
                    name="website"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={field.website}
                    placeholder="exemple.com"
                  />
                  <div style={{ color: "red" }}>{fieldError.website}</div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label>Work Status</label>
                    <select
                      className="form-control"
                      name="workStatus"
                      onChange={handleChange}
                      value={field.workStatus}
                    >
                      <option>Full-stack Developer</option>
                      <option>Front-End Developer</option>
                      <option>Backend Developer</option>
                      <option>Mobile Developer</option>
                      <option>Software Developer</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="* skill"
                    name="skill"
                    onChange={handleChange}
                  />
                  <div style={{ color: "red" }}>{fieldError.skills}</div>
                  <small className="form-text">
                    Please use space separated values (eg. HTML CSS JavaScript
                    PHP)
                  </small>
                  {skill.map((elem) => (
                    <ButtonRemove
                      key={Math.random() + 23232}
                      remove={() => removeSkill(elem)}
                    >
                      {elem}
                    </ButtonRemove>
                  ))}
                </div>
                <div className="form-group">
                  <label>Short Bio</label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="bio"
                    onChange={handleChange}
                    value={field.bio}
                  ></textarea>
                  <div style={{ color: "red" }}>{fieldError.bio}</div>
                </div>
                <button type="submit" className="btn btn-primary float-right">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CreateProfile;
