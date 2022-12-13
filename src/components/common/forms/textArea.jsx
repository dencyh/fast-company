import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ label, type, name, value, onChange, error, ...rest }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="input-group has-validation">
        <textarea
          className={`form-control ${error ? "is-invalid" : ""}`}
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange({ name, value: e.target.value })}
          {...rest}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextArea.defaultProps = {
  type: "text"
};

TextArea.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default TextArea;
