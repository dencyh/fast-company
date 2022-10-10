import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";

const App = () => {
  return (
    <>
      <Navbar />
      <Route path="/users" component={Users} />
      <Route path="/login" component={Login} />
      <Route path="/" exact component={Main} />
    </>
  );
};

export default App;
