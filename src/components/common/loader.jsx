import React from "react";
import PropTypes from "prop-types";

const Loader = ({ plain }) => {
  return (
    <h3 className="my-2">
      <span className="badge bg-primary">
        <span className="spinner-border spinner-border-sm text-light"></span>{" "}
        {!plain && <span>Загрузка...</span>}
      </span>
    </h3>
  );
};

Loader.defaultProps = {
  plain: false
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
  plain: PropTypes.bool
};

export default Loader;
