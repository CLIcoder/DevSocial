import React, { useState } from "react";
import { createExperienceValidation } from "../../utils/create-experienceValidation";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "../laoder/loader.component";

const CreateExperience = ({ location: { customNameData } }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
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
      return;
    }
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_URL}/api/profile/experience`,
        JSON.stringify(field),
        {
          headers: {
            authorisation: window.localStorage.getItem("authorisation"),
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => history.push("/Dashboard"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {!loading ? (
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
              {!field.current ? (
                <>
                  <h4>To Date</h4>
                  <input type="date" name="to" onChange={handleChange} />
                  <div style={{ color: "red" }}>{error.to}</div>{" "}
                </>
              ) : (
                ""
              )}
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
            <button
              type="submit"
              style={{
                marginTop: "-50px",
              }}
              className="btn btn-primary float-right"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CreateExperience;
