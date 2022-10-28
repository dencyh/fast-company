import React from "react";
import PropTypes from "prop-types";

const CheckboxField = ({ name, value, onChange, children, error }) => {
  const handleChange = (e) => {
    onChange(name, !value);
  };
  return (
    <div className="form-check mb-4">
      <input
        className="form-check-input"
        type="checkbox"
        id={name}
        onChange={handleChange}
        checked={value}
      />
      <label className="form-check-label is-invalid" htmlFor={name}>
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  error: PropTypes.string
};

export default CheckboxField;
