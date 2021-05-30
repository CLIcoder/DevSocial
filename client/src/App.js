import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext";

import SignIn from "./component/auth/signin";
import SignUp from "./component/auth/signup";
import Test from "./component/test";
import Home from "./pages/home";
import Welcome from "./component/welcome";
import "./App.css";
import Random from "./component/random";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/random" component={Random} />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
