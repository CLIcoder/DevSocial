import React from "react";
import { HashRouter, Switch, Redirect, Route } from "react-router-dom";

//component
import SignIn from "./component/auth/signin";
import SignUp from "./component/auth/signup";
import Navbar from "./component/layout/navbar";
import Footer from "./component/layout/footer";
import Dashboard from "./component/profile/dashbord";
import CreateProfile from "./component/profile/profile";
import CreateExperience from "./component/experience/experience";
import CreateEducation from "./component/education/education";
import DisplayProfile from "./component/display-profile/display-profile";
import Profiles from "./component/profiles/profiles.component";
import Posts from "./component/posts/posts";
import Discussion from "./component/discussion/discussion";
import Home from "./pages/home";
import ForgetPassword from "./component/forget-password/forget-password.component";

//routes

import NotLoggedIn from "./utils/NotLoggedIn";
import LoggedIn from "./utils/LoggedIn";

import "./App.css";
import NewPassword from "./component/new-password/new-password.component";

const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <Switch>
        <NotLoggedIn exact path="/" component={Home} />
        <NotLoggedIn path="/signup" component={SignUp} />
        <NotLoggedIn path="/signin" component={SignIn} />
        <NotLoggedIn path="/forget-password" component={ForgetPassword} />
        <NotLoggedIn
          exact
          path="/new-password/:token"
          component={NewPassword}
        />

        <LoggedIn path="/profile" component={CreateProfile} />
        <LoggedIn path="/education" component={CreateEducation} />
        <LoggedIn path="/experience" component={CreateExperience} />
        <LoggedIn path="/display-developers" component={DisplayProfile} />
        <LoggedIn path="/Dashboard" component={Dashboard} />
        <LoggedIn path="/posts" component={Posts} />
        <LoggedIn exact path="/discussion/:_id" component={Discussion} />
        <LoggedIn path="/developers" component={Profiles} />

        <Redirect to="/" />
      </Switch>
      <Footer />
    </HashRouter>
  );
};

export default App;
