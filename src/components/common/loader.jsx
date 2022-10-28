import React from "react";
import PropTypes from "prop-types";

const Loader = () => {
  return (
    <h3 className="m-2">
      <span className="badge bg-primary">
        <span className="spinner-border spinner-border-sm text-light"></span>{" "}
        Загрузка...
      </span>
    </h3>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool
};

export default Loader;
