import React from "react";
import { useHistory, Link } from "react-router-dom";

const Main = () => {
  const history = useHistory();
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Developer Connector</h1>
              <p className="lead">
                Create a developer profile/portfolio, share posts and get help
                from other developers
              </p>
              <hr />
              <Link
                className="btn btn-lg btn-info mr-2"
                onClick={() => history.push("/signup")}
              >
                Sign Up
              </Link>
              <Link
                className="btn btn-lg btn-light"
                onClick={() => history.push("/signin")}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
