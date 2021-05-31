import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext";

import SignIn from "./component/auth/signin";
import SignUp from "./component/auth/signup";
import Navbar from "./component/layout/navbar";
import Footer from "./component/layout/footer";
import Dashboard from "./component/profile/Dashbord";
import PrivateRoute from "./utils/privateRoute";
import CreateProfile from "./component/profile/createProfile";

import Home from "./pages/home";

import "./App.css";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Route path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/Dashboard" component={Dashboard} />
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
