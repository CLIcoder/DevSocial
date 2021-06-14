import React, { useState } from "react";
import { createEducationValidation } from "../../utils/create-experienceValidation";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "../laoder/loader.component";

const CreateExperience = ({ location: { customNameData } }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [field, setField] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    description: "",
  });

  const [error, setError] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
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
    const error = createEducationValidation(field);
    if (error) {
      setError({ ...error });
      return;
    }
    setLoading(true);
    await axios
      .post(
        "http://localhost:5000/api/profile/education",
        JSON.stringify(field),
        {
          headers: {
            authorisation: window.localStorage.getItem("authorisation"),
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => history.push("/developers"))
      .catch((err) => console.log(err));
  };
  return (
    <>
      {!loading ? (
        <div className="container">
          <h1 className="large text-primary">Add Your Education</h1>
          <p className="lead">
            <i className="fas fa-code-branch"></i> Add any school, bootcamp, etc
            that you have attended
          </p>
          <form noValidate onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <input
                type="text"
                placeholder="* School or bootcamp"
                name="school"
                onChange={handleChange}
              />
              <div style={{ color: "red" }}>{error.school}</div>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="* Degree or certificate"
                name="degree"
                onChange={handleChange}
              />
              <div style={{ color: "red" }}>{error.degree}</div>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="fieldofstudy"
                name="fieldofstudy"
                onChange={handleChange}
              />
              <div style={{ color: "red" }}>{error.fieldofstudy}</div>
            </div>
            <div className="form-group">
              <h4>From Date</h4>
              <input type="date" name="from" onChange={handleChange} />
              <div style={{ color: "red" }}>{error.from}</div>
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
                placeholder="Program Description"
                onChange={handleChange}
              ></textarea>
              <div style={{ color: "red" }}>{error.description}</div>
            </div>
            <button type="submit" className="btn btn-primary float-right">
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
