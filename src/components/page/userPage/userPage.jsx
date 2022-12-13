import React from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../../hooks/useUsers";
import Loader from "../../common/loader";
import UserCard from "../../ui/userProfile";

const User = () => {
  const { id } = useParams();

  const { getUserById } = useUser();
  const user = getUserById(id);

  if (!user) return <Loader />;
  return <UserCard user={user} />;
};

export default User;
