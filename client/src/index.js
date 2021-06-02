import ReactDOM from "react-dom";
import { UserProvider } from "./context/userContext";
import App from "./App";

// provider user into the level app
ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.querySelector("#root")
);
