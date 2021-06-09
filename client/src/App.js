import React from "react";
import { BrowserRouter } from "react-router-dom";

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

//routes

import NotLoggedIn from "./utils/NotLoggedIn";
import LoggedIn from "./utils/LoggedIn";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <NotLoggedIn exact path="/" component={Home} />
      <NotLoggedIn path="/signup" component={SignUp} />
      <NotLoggedIn path="/signin" component={SignIn} />
      <LoggedIn path="/create-profile" component={CreateProfile} />
      <LoggedIn path="/create-education" component={CreateEducation} />
      <LoggedIn path="/create-experience" component={CreateExperience} />
      <LoggedIn path="/display-profile" component={DisplayProfile} />
      <LoggedIn path="/Dashboard" component={Dashboard} />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
