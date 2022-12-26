import React, { useEffect } from "react";
import { signOut } from "../redux/usersSlice";

const Logout = () => {
  useEffect(() => {
    signOut();
  }, []);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};
export default Logout;
