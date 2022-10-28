import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  value,
  onChange,
  defaultOption,
  options,
  error
}) => {
  const optionsArr =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          name: options[optionName].name,
          value: options[optionName]._id
        }))
      : options;

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <select
        className={`form-select ${error ? "is-invalid" : ""}`}
        id="validationCustom04"
        name="profession"
        value={value}
        onChange={onChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArr &&
          optionsArr.map((option) => (
            <option key={option.value} value={option.name}>
              {option.name}
            </option>
          ))}
      </select>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default SelectField;
