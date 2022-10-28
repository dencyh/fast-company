import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ label, name, value, options, onChange }) => {
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      {options.map((option) => (
        <div className="form-check form-check-inline" key={option.value}>
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={option.value}
            value={option.value}
            checked={option.value === value}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor={option.value}>
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

RadioField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired
};

export default RadioField;
