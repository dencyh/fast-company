import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <div className="input-group">
        <input
          className={`form-control ${error ? "is-invalid" : "is-valid"}`}
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e)}
          {...rest}
        />
        {type === "password" && (
          <button
            className="input-group-text"
            onClick={() => toggleShowPassword()}
          >
            {
              <i
                className={`bi ${
                  showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"
                }`}
              ></i>
            }
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextField.defaultProps = {
  type: "text"
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default TextField;
