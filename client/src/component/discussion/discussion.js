import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getProfileData } from "../../utils/getProfile-data";
import { getUserData } from "../../utils/getUser-data";
import Loader from "../laoder/loader.component";
import "./discussion.css";

const Discussion = ({
  match: {
    params: { _id: idComment },
  },
}) => {
  const history = useHistory();

  const [userElem, setUserElem] = useState({});
  const [post, setPosting] = useState("");
  const [loader, setLoader] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [customNameData, setCustomNameData] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "posting") setPosting(value);
    return;
  };

  {
    /** TODO: Implement search and pagination */
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post.length === 0) {
      setError("field should not be empty");
      return;
    }
    if (post.length > 500) {
      setError("500 limit caracter !");
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_URL}/api/posts/comment/${idComment}`,
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
    setLoader(true);
    const { image } = await getProfileData();
    const { _id, name } = getUserData();

    setUserElem({ image, _id, name });

    axios
      .get(`${process.env.REACT_APP_URL}/api/posts/${idComment}`, {
        headers: {
          authorisation: window.localStorage.getItem("authorisation"),
          "Content-Type": "application/json",
        },
      })
      .then(({ data: { comments, image, content, name } }) => {
        setLoader(false);
        setCommentData([...comments]);
        setCustomNameData((customNameData) => ({ ...customNameData, content }));
        setCustomNameData((customNameData) => ({ ...customNameData, image }));
        setCustomNameData((customNameData) => ({ ...customNameData, name }));
        return;
      })
      .catch((err) => history.push("/Dashboard"));
  };

  useEffect(getData, [commentData.length, idComment]);
  return (
    <section className="container">
      <a onClick={() => history.push("/posts")} className="btn btn-info margin">
        ⬅️ Back To Posts
      </a>
      <div className="post bg-white p-1 my-1">
        <div>
          <a>
            <img className="round-img" src={customNameData.image} alt="" />
          </a>
        </div>
        <div>
          <h3>Posted by {customNameData.name}</h3>
          <p className="my-1">{customNameData.content}</p>
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
          <p style={{ color: "red" }}>{error}</p>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div className="comments">
        {loader ? (
          <Loader />
        ) : (
          commentData.map(({ image, name, status, date }, indx) => {
            return (
              <div key={Math.random() + indx + Math.random()}>
                <div className="post bg-white p-1 my-1">
                  <div>
                    <a href={`https://github.com/${image.split("/")[3]}`}>
                      <img className="round-img" src={image} alt="" />
                      {/** spliting image data to get github user, I'm lazzy as fuck, I know! 😅 */}
                    </a>
                    <p>{name}</p>
                  </div>
                  <div>
                    <em
                      style={{
                        wordBreak: "break-all",
                      }}
                    >
                      {status}
                    </em>
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
