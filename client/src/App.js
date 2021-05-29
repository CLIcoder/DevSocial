import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import SignIn from "./component/auth/signin";
import SignUp from "./component/auth/signup";
import Test from "./component/test";
import Home from "./pages/home";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/test" component={Test} />
    </BrowserRouter>
  );
};

export default App;
