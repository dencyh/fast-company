import React from "react";
import { Route } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";

const App = () => {
  return (
    <>
      <Route path="/users" component={Users} />
      <Route path="/auth/:type?" component={Login} />
      <Route path="/" exact component={Main} />
    </>
  );
};

export default App;
