import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUserById } from "../../../redux/usersSlice";
import Loader from "../../common/loader";
import UserCard from "../../ui/userProfile";

const User = () => {
  const { id } = useParams();

  const user = useSelector(selectUserById(id));

  if (!user) return <Loader />;
  return <UserCard user={user} />;
};

export default User;
