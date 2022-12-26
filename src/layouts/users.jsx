import React from "react";
import Layout from ".";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/userListPage";
import UserEditPage from "../components/page/userEditPage";
import ProtectedRoute from "../components/common/protectedRoute";
import Loader from "../components/common/loader";
import UsersLoader from "../components/hoc/usersLoader";

const Users = () => {
  return (
    <Layout>
      <UsersLoader>
        <ProtectedRoute path="/users" exact component={UsersListPage} />
        <ProtectedRoute path="/users/:id" exact component={UserPage} />
        <ProtectedRoute path="/users/:id/edit" component={UserEditPage} />
      </UsersLoader>
    </Layout>
  );
};

export default Users;
