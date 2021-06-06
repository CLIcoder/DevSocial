import React, { useState } from "react";
import ButtonRemove from "../button-remove/button-remove.component";

const CreateProfile = () => {
  const [skills, setSkills] = useState([]);
  const [field, setFiled] = useState({
    displayName: "",
    company: "",
    website: "",
    location: "",
    workStatus: "",
    skills: [],
    bio: "",
    github: "",
  });

  const removeSkill = (value) => {
    if (skills.length === 1) setSkills([]);
    else {
      const newSkills = skills.filter((item) => item !== value);
      setSkills([...newSkills]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "skills" &&
      value[value.length - 1] === " " &&
      value.length > 1
    ) {
      if (value.length > 15) {
        alert("stop spamming skills");
        return;
      }
      if (skills.length > 14) {
        alert("you've reach your skills limit");
        return;
      }
      setSkills((oldArray) => [...oldArray, value.slice(0, -1)]);
      e.target.value = "";
    }
    setFiled({ ...field, [name]: value });
  };

  const submitData = (e) => {
    e.preventDefault();
    //...pushing data to server TODOO
  };
  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Profile</h1>
            <p className="lead text-center">Welcome to the devsocial journey</p>
            <form onSubmit={submitData}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="displayName"
                    placeholder="Display Name"
                    onChange={handleChange}
                  />
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
                      onChange={handleChange}
                      placeholder="Username"
                    />
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Google"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="1234 Main St"
                  name="location"
                />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input
                  name="website"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="exemple.com"
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label>Work Status</label>
                  <select
                    className="form-control"
                    name="workStatus"
                    onChange={handleChange}
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
                  placeholder="* Skills"
                  name="skills"
                  onChange={handleChange}
                />
                <small className="form-text">
                  Please use space separated values (eg.
                  HTML,CSS,JavaScript,PHP)
                </small>
                {skills.map((elem) => (
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
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
