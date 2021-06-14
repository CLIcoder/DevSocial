import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./posts.css";
import { getUserData } from "../../utils/getUser-data";
import { getProfileData } from "../../utils/getProfile-data";
import Loader from "../laoder/loader.component";

const Posts = () => {
  const history = useHistory();
  const [content, setContent] = useState();
  const [posts, setPosts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "content") setContent(value);

    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { _id, name } = getUserData();
    const { image } = await getProfileData(_id);
    axios
      .post(
        "http://localhost:5000/api/posts",
        JSON.stringify({
          image,
          name,
          content,
        }),
        {
          headers: {
            authorisation: window.localStorage.getItem("authorisation"),
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => getPosts());
  };

  const addLike = (_id) => {
    const { _id: userId } = getUserData();
    axios
      .post(
        `http://localhost:5000/api/posts/like/${_id}`,
        JSON.stringify({ id: userId }),
        {
          headers: {
            authorisation: window.localStorage.getItem("authorisation"),
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => getPosts());
  };

  const getPosts = async () => {
    const checkProfile = await getProfileData();
    if (!checkProfile) history.push("/Dashboard");
    axios
      .get("http://localhost:5000/api/posts", {
        headers: {
          authorisation: window.localStorage.getItem("authorisation"),
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        if (data.length > 0) setPosts([...data]);
        return;
      });
  };
  const removePost = (removeId) => {
    axios
      .delete(`http://localhost:5000/api/posts/${removeId}`, {
        headers: {
          authorisation: window.localStorage.getItem("authorisation"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => getPosts());
  };
  useEffect(getPosts, []);

  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>

      <div className="post-form">
        <div className="bg-primary p say">
          <h3>Say Something...</h3>
        </div>
        <form onSubmit={handleSubmit} noValidate className="form my-1">
          <textarea
            name="content"
            cols="30"
            rows="5"
            placeholder="Create a post"
            className="form-control"
            id="exampleFormControlTextarea1"
            onChange={handleChange}
          ></textarea>
          <input
            type="submit"
            className="btn btn-dark my-1 btn-add "
            value="Submit"
          />
        </form>
      </div>

      <div className="posts">
        {posts.length === 0 ? (
          <Loader />
        ) : (
          posts.map(
            (
              {
                content,
                likes: { amount },
                comments,
                _id,
                image,
                name,
                date,
                user,
              },
              indx
            ) => {
              return (
                <div key={Math.random() + indx + Math.random()}>
                  <div
                    key={Math.random() + indx + Math.random()}
                    className="post bg-white p-1 my-1"
                  >
                    <div>
                      <a href="profile.html">
                        <img className="round-img" src={image} alt="" />
                        <h4>{name}</h4>
                      </a>
                    </div>
                    <div>
                      <p className="my-1">{content}</p>
                      <p className="post-date">{date.split("T")[0]}</p>
                      <button
                        onClick={() => addLike(_id)}
                        type="button"
                        className="btn btn-light"
                      >
                        <i className="fas fa-thumbs-up"></i>
                        <span>{amount}</span>
                      </button>
                      <a
                        onClick={() => {
                          const encodedUrl = encodeURIComponent(image);
                          history.push({
                            pathname: `/discussion/${_id}/${content}/${encodedUrl}`,
                          });
                        }}
                        style={{
                          color: "white",
                          opacity: 0.9,
                        }}
                        className="btn btn-info "
                      >
                        Discussion
                        <span className="comment-count">{comments.length}</span>
                      </a>
                      {user.toString() === getUserData()._id ? (
                        <button
                          onClick={async () => {
                            if (window.confirm("Delete the item?")) {
                              await removePost(_id);
                              return;
                            }
                          }}
                          type="button"
                          className="btn btn-danger mx-4"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
    </section>
  );
};

export default Posts;
