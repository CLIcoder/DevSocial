import axios from "axios";
import React, { useEffect, useState } from "react";

const Discussion = ({ location: { customNameData: id } }) => {
  const [posting, setPosting] = useState();
  const [comment, setComment] = useState([{ content: "no comment" }]);
  const [post, setPost] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "posting") setPosting(value);
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("json data", JSON.stringify({ comments: posting }));
    axios
      .post(
        `http://localhost:5000/api/posts/comment/${id}`,
        JSON.stringify({ id: "dddddddddd", content: posting }),
        {
          headers: {
            authorisation: window.localStorage.getItem("authorisation"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => getComment())
      .catch((err) => console.log("error in submiting data", err));
  };

  // fetching the comment from mongodb by using id as a params
  const getComment = () => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          authorisation: window.localStorage.getItem("authorisation"),
          "Content-Type": "application/json",
        },
      })
      .then(({ data: { comments, content } }) => {
        setComment([...comments]);
        setPost(content);
        return;
      });
  };

  useEffect(getComment, []);
  return (
    <section className="container">
      <a href="posts.html" className="btn">
        Back To Posts
      </a>
      <div className="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img
              className="round-img"
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
              alt=""
            />
            <h4>John Doe</h4>
          </a>
        </div>
        <div>
          <p className="my-1">{post}</p>
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
        {comment.map(({ content: data }, indx) => {
          return (
            <>
              <div
                key={Math.random() + indx}
                className="post bg-white p-1 my-1"
              >
                <div>
                  <a href="profile.html">
                    <img
                      className="round-img"
                      src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                      alt=""
                    />
                    <h4>John Doe</h4>
                  </a>
                </div>
                <div>
                  <p className="my-1">{data}</p>
                  <p className="post-date">Posted on 04/16/2019</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default Discussion;
