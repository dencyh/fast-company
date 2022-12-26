import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useSelector, useDispatch } from "react-redux";
import {
  selectQualitiesLoading,
  selectQualitiesByIds,
  loadQualities
} from "../../../redux/qualitiesSlice";

const QualitiesList = ({ qualities: qualitiesIds }) => {
  const dispatch = useDispatch();

  const qualities = useSelector(selectQualitiesByIds(qualitiesIds));
  const qualitiesLoading = useSelector(selectQualitiesLoading);

  // useEffect(() => {
  //   dispatch(loadQualities());
  // }, []);

  if (qualitiesLoading) return "Loading...";
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
