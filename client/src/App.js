import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext";

import SignIn from "./component/auth/signin";
import SignUp from "./component/auth/signup";
import Home from "./pages/home";
import LoginOnly from "./component/loginOnly";

import "./App.css";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route path="/welcome" component={LoginOnly} />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
