import React from "react";
import PropTypes from "prop-types";

const Loader = () => {
  return (
    <h1 className="m-2">
      <span className="badge bg-primary">
        <span className="spinner-border text-light"></span> Загрузка...
      </span>
    </h1>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool
};

export default Loader;
