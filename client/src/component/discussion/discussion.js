import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getProfileData } from "../../utils/getProfile-data";
import { getUserData } from "../../utils/getUser-data";
import Loader from "../laoder/loader.component";
import "./discussion.css";

const Discussion = () => {
  //gettting params from url for data display
  const customNameData = useParams();

  const history = useHistory();

  const [userElem, setUserElem] = useState({});
  const [post, setPosting] = useState("");
  const [loader, setLoader] = useState(true);
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
        setLoader(false);
        setCommentData([...comments]);
        return;
      })
      .catch((err) => console.log(err));
  };

  useEffect(getData, [commentData.length]);
  return (
    <section className="container">
      <a onClick={() => history.push("/posts")} className="btn btn-info margin">
        ⬅️ Back To Posts
      </a>
      <div className="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img
              className="round-img"
              src={decodeURIComponent(customNameData.image)}
              alt=""
            />
          </a>
        </div>
        <div>
          <h3>Posted by {userElem.name}</h3>
          <p className="my-1">{decodeURIComponent(customNameData.content)}</p>
        </div>
      </div>

      <div className="post-form">
        <div className="bg-primary p">
          <h3 className="say">Leave A Comment</h3>
        </div>
        <form onSubmit={handleSubmit} className="form my-1">
          <textarea
            name="posting"
            cols="30"
            rows="5"
            className="form-control"
            id="exampleFormControlTextarea1"
            placeholder="Comment on this post"
            onChange={handleChange}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div className="comments">
        {loader ? (
          <Loader />
        ) : (
          commentData.map(({ image, name, status, date }, indx) => {
            return (
              <div key={Math.random() + indx}>
                <div className="post bg-white p-1 my-1">
                  <div>
                    <a href={`https://github.com/${image.split("/")[3]}`}>
                      <img className="round-img" src={image} alt="" />
                      {/** spliting image data to get github user, I'm lazzy as fuck, I know! 😅 */}
                    </a>
                    <p>{name}</p>
                  </div>
                  <div>
                    <p className="my-1">{status}</p>
                    <p className="post-date">{date.split("T")[0]}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Discussion;
