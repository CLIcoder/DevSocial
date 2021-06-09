import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { userContext } from "./context/userContext";
import jsonwebtoken from "jsonwebtoken";

//component
import SignIn from "./component/auth/signin";
import SignUp from "./component/auth/signup";
import Navbar from "./component/layout/navbar";
import Footer from "./component/layout/footer";
import Dashboard from "./component/profile/Dashbord";
import CreateProfile from "./component/profile/createProfile";
import CreateExperience from "./component/experience/create-experience";
import CreateEducation from "./component/education/create-education";
import DisplayProfile from "./component/display-profile/display-profile";
import Home from "./pages/home";

// routes
import PrivateRoute from "./utils/privateRoute";
import LoggedIn from "./utils/logginUserState";

import "./App.css";

const App = () => {
  const [, setUser] = useContext(userContext);

  const logginIn = () => {
    // check if the user is logged in
    if (!window.localStorage.getItem("authorisation")) return;

    //Persist the data comming from the api using useffect hook
    jsonwebtoken.verify(
      window.localStorage.getItem("authorisation"),
      "XjJ6vvzIe6WvqAcJtU85FbwCKDZkw9sW",
      (err, decoded) => {
        // secure jwt and don't allow user to provide invalide token in localStorage
        if (err) {
          window.localStorage.removeItem("authorisation");
          window.location.reload();
          return;
        }
        setUser({ ...decoded });
      }
    );
  };

  useEffect(logginIn, [setUser]);
  return (
    <BrowserRouter>
      <Navbar />
      <LoggedIn exact path="/" component={Home} />
      <LoggedIn exact path="/signup" component={SignUp} />
      <LoggedIn exact path="/signin" component={SignIn} />
      <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      <PrivateRoute
        exact
        path="/create-education"
        component={CreateEducation}
      />
      <PrivateRoute
        exact
        path="/create-experience"
        component={CreateExperience}
      />
      <Route exact path="/display-profile" component={DisplayProfile} />
      <PrivateRoute exact path="/Dashboard" component={Dashboard} />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
