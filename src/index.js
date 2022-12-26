import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import history from "./utils/history";

import "bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router history={history}>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </Router>
  </Provider>
);
