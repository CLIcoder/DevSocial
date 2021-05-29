import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import SignIn from "./component/auth/signin";
import SignUp from "./component/auth/signup";
import Testing from "./component/testing";
import Home from "./pages/home";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
    </BrowserRouter>
  );
};

export default App;
