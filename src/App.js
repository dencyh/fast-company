import React from "react";
import { Route } from "react-router-dom";
import AppLoader from "./components/hoc/appLoader";
import Login from "./layouts/login";
import Logout from "./layouts/logout";
import Main from "./layouts/main";
import Users from "./layouts/users";

const App = () => {
  return (
    <AppLoader>
      <Route path="/users" component={Users} />
      <Route path="/login/:type?" component={Login} />
      <Route path="/" exact component={Main} />
      <Route path="/logout" component={Logout} />
    </AppLoader>
  );
};

export default App;
