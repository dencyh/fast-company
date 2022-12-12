import React, { useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({
  options,
  onChange,
  label,
  name,
  selectAll,
  defaultValue,
  error
}) => {
  let optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.values(options)
      : options;

  if (selectAll) {
    optionsArray = [{ label: "Выбрать все", value: "all" }, ...optionsArray];
  }

  const [values, setValues] = useState(defaultValue || []);

  const handleChange = (value) => {
    const allSelected = value.find((option) => option.value === "all");
    if (allSelected) {
      setValues(optionsArray.slice(1));
      onChange({ name, value: optionsArray.slice(1) });
    } else {
      setValues(value);
      onChange({ name, value });
    }
  };

  return (
    <div className="mb-4">
      <label className="form-label is-invalid">{label}</label>
      <Select
        styles={{ color: "white" }}
        isMulti
        defaultValue={defaultValue}
        closeMenuOnSelect={false}
        name="colors"
        options={optionsArray}
        value={values}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  selectAll: PropTypes.string,
  defaultValue: PropTypes.array,
  error: PropTypes.string
};

export default MultiSelectField;
