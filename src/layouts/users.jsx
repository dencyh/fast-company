import React from "react";
import { Route } from "react-router-dom";
import User from "../components/user";
import UsersPage from "../components/usersPage";

const Users = () => {
  return (
    <div className="container">
      <Route path="/users/" exact component={UsersPage} />
      <Route path="/users/:id" component={User} />
    </div>
  );
};

export default Users;
