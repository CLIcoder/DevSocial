import axios from "axios";
import React, { useEffect, useState } from "react";
import { getProfileData } from "../../utils/getProfile-data";
import { getUserData } from "../../utils/getUser-data";

const Discussion = ({ location: { customNameData } }) => {
  const [userElem, setUserElem] = useState({});
  const [post, setPosting] = useState("");
  const [commentData, setCommentData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "posting") setPosting(value);
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:5000/api/posts/comment/${customNameData._id}`,
        JSON.stringify({
          id: userElem.id,
          status: post,
          image: userElem.image,
          name: userElem.name,
        }),
        {
          headers: {
            authorisation: window.localStorage.getItem("authorisation"),
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => getData())
      .catch((err) => console.log("error in submiting data", err));
  };

  // fetching the comment from mongodb by using id as a params
  const getData = async () => {
    const { image } = await getProfileData();
    const { _id, name } = getUserData();

    setUserElem({ image, _id, name });

    axios
      .get(`http://localhost:5000/api/posts/${customNameData._id}`, {
        headers: {
          authorisation: window.localStorage.getItem("authorisation"),
          "Content-Type": "application/json",
        },
      })
      .then(({ data: { comments } }) => {
        setCommentData([...comments]);
        return;
      })
      .catch(() => alert("sicko mode"));
  };

  useEffect(getData, [commentData.length]);
  return (
    <section className="container">
      <a href="posts.html" className="btn">
        Back To Posts
      </a>
      <div className="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img className="round-img" src={customNameData.image} alt="" />
            <h4>{userElem.name}</h4>
          </a>
        </div>
        <div>
          <p className="my-1">{customNameData.content}</p>
        </div>
      </div>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form onSubmit={handleSubmit} className="form my-1">
          <textarea
            name="posting"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            onChange={handleChange}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div className="comments">
        {commentData.map(({ image, name, status, date }, indx) => {
          return (
            <div key={Math.random() + indx}>
              <div className="post bg-white p-1 my-1">
                <div>
                  <a href="profile.html">
                    <img className="round-img" src={image} alt="" />
                    <h4>{name}</h4>
                  </a>
                </div>
                <div>
                  <p className="my-1">{status}</p>
                  <p className="post-date">{date}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Discussion;
