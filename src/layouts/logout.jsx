import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const Logout = () => {
  const { signOut } = useAuth();

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
