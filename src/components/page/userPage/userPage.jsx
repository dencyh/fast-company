import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../api";
import Loader from "../../common/loader";
import UserCard from "../../ui/userCard";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    API.users
      .fetchById(id)
      .then((data) => setUser(data))
      .catch((e) => console.log(setError(e)))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (error) return <p className="badge bg-danger fs-5">{error.toString()}</p>;
  if (isLoading || !user) return <Loader />;
  return <UserCard user={user} />;
};

export default User;
