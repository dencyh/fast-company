import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, selectDataLoaded } from "../../redux/usersSlice";
import PropTypes from "prop-types";
import Loader from "../common/loader";

const UsersLoader = ({ children }) => {
  const dataLoaded = useSelector(selectDataLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dataLoaded) {
      dispatch(loadUsers());
    }
  }, []);

  if (!dataLoaded) return <Loader />;

  return children;
};

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UsersLoader;
