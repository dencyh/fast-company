import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/usersSlice";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOut());
  }, []);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};
export default Logout;
