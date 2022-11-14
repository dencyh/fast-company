import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  name,
  value,
  onChange,
  defaultOption,
  options,
  error
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.values(options)
      : options;

  return (
    <div className="mb-4">
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      )}
      <select
        className={`form-select ${error ? "is-invalid" : ""}`}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange({ name, value: e.target.value })}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray.length > 0 &&
          optionsArray.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default SelectField;
