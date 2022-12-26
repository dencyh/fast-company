import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUsers,
  selectDataLoaded,
  selectIsLogged,
  selectUsersLoading
} from "../../redux/usersSlice";
import PropTypes from "prop-types";
import Loader from "../common/loader";
import { loadQualities } from "../../redux/qualitiesSlice";
import { loadProfessions } from "../../redux/professionsSlice";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();

  const isLogged = useSelector(selectIsLogged);
  const usersLoading = useSelector(selectUsersLoading);

  useEffect(() => {
    dispatch(loadQualities());
    dispatch(loadProfessions());
    if (isLogged) {
      dispatch(loadUsers());
    }
  }, [isLogged]);

  if (usersLoading) return <Loader />;

  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
