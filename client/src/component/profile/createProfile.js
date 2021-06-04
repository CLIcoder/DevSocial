import React, { useState } from "react";

const CreateProfile = () => {
  const [field, setFiled] = useState({
    displayName: "",
    company: "",
    website: "",
    location: "",
    workStatus: "",
    skills: [],
    bio: "",
    githubusername: "",
    github: "",
  });
  //const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiled({ ...field, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    console.log(field);
  };
  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Profile</h1>
            <p className="lead text-center">Welcome to the devsocial journey</p>
            <form onSubmit={submitData}>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Display Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="displayName"
                    placeholder="Display Name"
                    onChange={handleChange}
                  />
                </div>
                <div class="col-auto">
                  Github
                  <br />
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text">@</div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      name="github"
                      onChange={handleChange}
                      placeholder="Username"
                    />
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Company</label>
                  <input
                    type="text"
                    name="company"
                    onChange={handleChange}
                    class="form-control"
                    placeholder="Google"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="inputAddress">Location</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={handleChange}
                  placeholder="1234 Main St"
                  name="location"
                />
              </div>
              <div class="form-group">
                <label for="inputAddress2">Website</label>
                <input
                  name="website"
                  type="text"
                  class="form-control"
                  onChange={handleChange}
                  placeholder="exemple.com"
                />
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="inputState">Work Status</label>
                  <select
                    name="work"
                    class="form-control"
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
                  Please use comma separated values (eg.
                  HTML,CSS,JavaScript,PHP)
                </small>
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Short Bio</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  name="bio"
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" class="btn btn-primary">
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
