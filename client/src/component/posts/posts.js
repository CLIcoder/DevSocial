import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./posts.css";
import { getUserData } from "../../utils/getUser-data";

const Posts = () => {
  const history = useHistory();
  const [content, setContent] = useState();
  const [posts, setPosts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "content") setContent(value);

    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/posts",
        JSON.stringify({
          content,
        }),
        {
          headers: {
            authorisation: window.localStorage.getItem("authorisation"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => getPosts());
  };

  const addLike = (_id) => {
    const { _id: userId } = getUserData();
    axios.post(
      `http://localhost:5000/api/posts/like/${_id}`,
      JSON.stringify({ id: userId, content: true }),
      {
        headers: {
          authorisation: window.localStorage.getItem("authorisation"),
          "Content-Type": "application/json",
        },
      }
    );
    getPosts();
  };

  const getPosts = async () => {
    const { data } = await axios.get("http://localhost:5000/api/posts", {
      headers: {
        authorisation: window.localStorage.getItem("authorisation"),
        "Content-Type": "application/json",
      },
    });
    setPosts([...data]);
    return;
  };

  useEffect(getPosts, []);

  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form onSubmit={handleSubmit} noValidate className="form my-1">
          <textarea
            name="content"
            cols="30"
            rows="5"
            placeholder="Create a post"
            onChange={handleChange}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div className="posts">
        {posts.map(({ content, likes, comments, _id }, indx) => {
          return (
            <>
              <div
                key={Math.random() + indx + Math.random()}
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
                  <p className="my-1">{content}</p>
                  <p className="post-date">Posted on 04/16/2019</p>
                  <button
                    onClick={() => addLike(_id)}
                    type="button"
                    className="btn btn-light"
                  >
                    <i className="fas fa-thumbs-up"></i>
                    <span>{likes.length}</span>
                  </button>
                  <a
                    onClick={() =>
                      history.push({
                        pathname: "/discussion",
                        customNameData: _id,
                      })
                    }
                    className="btn btn-primary"
                  >
                    Discussion
                    <span className="comment-count">{comments.length}</span>
                  </a>
                  <button type="button" className="btn btn-danger">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default Posts;
