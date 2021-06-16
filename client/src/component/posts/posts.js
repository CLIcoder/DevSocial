import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./posts.css";
import { getUserData } from "../../utils/getUser-data";
import { getProfileData } from "../../utils/getProfile-data";
import Loader from "../laoder/loader.component";
import { likeStatus } from "../../utils/likeStatus";

const Posts = () => {
  const history = useHistory();
  const [content, setContent] = useState();
  const [posts, setPosts] = useState([]);
  const [likesId, setLikesId] = useState("");
  const [loader, setLoader] = useState(true);

  //pagination this.state
  const [pageNum, setPageNum] = useState(0);
  const [page, setPage] = useState([]);

  const pagination = () => {
    let newPage = [];
    let i = 0;
    while (i < 6) {
      if (!posts[pageNum + i]) break;
      newPage.push(posts[pageNum + i]);
      i++;
    }
    setPage([...newPage]);
    return;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "content") setContent(value);

    return;
  };

  {
    /** TODO: Implement search and pagination */
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
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
      .then(() => {
        setContent("");
        getPosts();
      });
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
    const { _id } = getUserData();
    setLikesId(_id);
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
        console.log("data", data);
        if (data.length > 0) setPosts([...data].reverse());
        setLoader(false);
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
  useEffect(pagination, [pageNum, posts]);

  return (
    <>
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
            {loader ? <Loader /> : ""}
            <input
              type="submit"
              className="btn btn-dark my-1 btn-add "
              value="Submit"
            />
          </form>
        </div>

        <div className="posts">
          {posts.length === 0
            ? ""
            : page.map(
                (
                  {
                    content,
                    likes: { amount, users },
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
                          <a href={`https://github.com/${image.split("/")[3]}`}>
                            <img className="round-img" src={image} alt="" />
                          </a>
                          <p>{name}</p>
                        </div>
                        <div>
                          <p className="my-1">{content}</p>
                          <p className="post-date">{date.split("T")[0]}</p>
                          <button
                            onClick={() => addLike(_id)}
                            type="button"
                            className="btn btn-light"
                          >
                            <i
                              style={{
                                color: likeStatus(users, likesId),
                              }}
                              className="fas fa-thumbs-up "
                            ></i>
                            <span>{amount}</span>
                          </button>
                          <a
                            onClick={() => {
                              const encodedUrl_image =
                                encodeURIComponent(image);
                              const encodedUrl_id = encodeURIComponent(_id);
                              const encodedUrl_content =
                                encodeURIComponent(content);

                              history.push({
                                pathname: `/discussion/${encodedUrl_id}/${encodedUrl_content}/${encodedUrl_image}`,
                              });
                            }}
                            style={{
                              color: "white",
                              opacity: 0.9,
                            }}
                            className="btn btn-info "
                          >
                            Discussion
                            <span className="comment-count">
                              {comments.length}
                            </span>
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
              )}
        </div>
        <nav>
          <ul className="pagination justify-content-center">
            <li className="page-item ">
              {pageNum > 0 ? (
                <button
                  onClick={() => {
                    setPageNum((num) => num - 5);
                  }}
                  class="page-link"
                >
                  ⬅️ Previous
                </button>
              ) : (
                ""
              )}
            </li>
            <li className="page-item ">
              {!page[pageNum] || page.length < 6 ? (
                ""
              ) : (
                <button
                  onClick={() => {
                    setPageNum((num) => num + 5);
                  }}
                  class="page-link"
                >
                  Next ➡️
                </button>
              )}
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
};

export default Posts;
