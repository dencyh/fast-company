import React from "react";
import { Route } from "react-router-dom";
import Layout from ".";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/userListPage";
import UserEditPage from "../components/page/userEditPage";

const Users = () => {
  return (
    <Layout>
      <Route path="/users/" exact component={UsersListPage} />
      <Route path="/users/:id" exact component={UserPage} />
      <Route path="/users/:id/edit" component={UserEditPage} />
    </Layout>
  );
};

export default Users;
