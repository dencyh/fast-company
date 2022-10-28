import React from "react";
import { Route } from "react-router-dom";
import Layout from ".";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/userListPage";

const Users = () => {
  return (
    <Layout>
      <Route path="/users/" exact component={UsersListPage} />
      <Route path="/users/:id" component={UserPage} />
    </Layout>
  );
};

export default Users;
