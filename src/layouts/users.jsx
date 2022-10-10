import React from "react";
import { Route } from "react-router-dom";
import Layout from ".";
import User from "../components/user";
import UsersPage from "../components/usersPage";

const Users = () => {
  return (
    <Layout>
      <Route path="/users/" exact component={UsersPage} />
      <Route path="/users/:id" component={User} />
    </Layout>
  );
};

export default Users;
