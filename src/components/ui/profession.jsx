import React from "react";
import PropTypes from "prop-types";
import { useProfessions } from "../../hooks/useProfessions";

const Profession = ({ id }) => {
  const { isLoading, getProfessionById } = useProfessions();
  const profession = getProfessionById(id);
  if (isLoading) {
    return "Loading...";
  }

  return <p>{profession.name}</p>;
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
