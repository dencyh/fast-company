import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setUsers((prev) =>
      prev.map((user) => (user._id === currentUser._id ? currentUser : user))
    );
  }, [currentUser]);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function getUsers() {
    try {
      const { content } = await userService.get();
      setUsers(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setIsLoading(false);
    }
  }

  function getUserById(id) {
    return users.find((user) => user._id === id);
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <UserContext.Provider
      value={{
        users,
        getUserById
      }}
    >
      {isLoading ? "Loading..." : children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default UserProvider;
