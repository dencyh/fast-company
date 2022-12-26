import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  selectProfessionById,
  selectProfessionsLoading
} from "../../redux/professionsSlice";
import { useSelector } from "react-redux";

const Profession = ({ id }) => {
  const professionsLoading = useSelector(selectProfessionsLoading);
  const profession = useSelector(selectProfessionById(id));

  useEffect(() => {}, [profession]);

  if (professionsLoading) {
    return "Loading...";
  }

  return <span>{profession.name}</span>;
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
