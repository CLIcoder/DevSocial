import React, { useState } from "react";
import { createExperienceValidation } from "../../utils/create-experienceValidation";
import axios from "axios";

const CreateExperience = () => {
  const [field, setField] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [error, setError] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "current") setField({ ...field, current: !field.current });
    else {
      setField({ ...field, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = createExperienceValidation(field);
    if (error) {
      setError({ ...error });
      console.log(Object.entries(error));
      return;
    }
    console.log(JSON.stringify(field));
    await axios
      .post(
        "http://localhost:5000/api/profile/experience",
        JSON.stringify(field),
        {
          headers: {
            authorisation: window.localStorage.getItem("authorisation"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="container">
        <h1 className="large text-primary">Add An Experience</h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <form noValidate onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <input
              type="text"
              placeholder="* Job Title"
              name="title"
              onChange={handleChange}
            />
            <div style={{ color: "red" }}>{error.title}</div>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Company"
              name="company"
              onChange={handleChange}
            />
            <div style={{ color: "red" }}>{error.company}</div>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              onChange={handleChange}
            />
            <div style={{ color: "red" }}>{error.location}</div>
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" onChange={handleChange} />
            <div style={{ color: "red" }}>{error.from}</div>
          </div>
          <div className="form-group">
            <p>
              <input type="checkbox" name="current" onChange={handleChange} />
              Current Job
            </p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" onChange={handleChange} />
            <div style={{ color: "red" }}>{error.to}</div>
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
              onChange={handleChange}
            ></textarea>
            <div style={{ color: "red" }}>{error.description}</div>
          </div>
          <button type="submit" className="btn btn-primary float-right">
            Next ⏭️
          </button>
          <a className="btn btn-light my-1" href="dashboard.html">
            Go Back
          </a>
        </form>
      </div>
    </>
  );
};

export default CreateExperience;
