import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities: qualitiesIds }) => {
  const { isLoading, getUserQualities } = useQualities();
  const qualities = getUserQualities(qualitiesIds);

  if (isLoading) return "Loading...";
  return (
    <>
      {qualities.map((quality) => (
        <Quality key={quality._id} quality={quality} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
