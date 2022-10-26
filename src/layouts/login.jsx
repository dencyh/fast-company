import React, { useState, useEffect } from "react";
import Layout from ".";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Поле не может быть пустым"
      },
      isEmail: {
        message: "Некорректная эл. почта"
      }
    },
    password: {
      isRequired: {
        message: "Поле не может быть пустым"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать минимум одну заглавную букву"
      },
      isDigitSymbol: {
        message: "Пароль должен содержать минимум одну цифру"
      },
      min: {
        message: "Пароль должен состояить минимум из 8 символов",
        value: 8
      }
    }
  };

  useEffect(() => {
    validate();
  }, [values]);

  const validate = () => {
    const errors = validator(values, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return console.log("Error");
    console.log(values);
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <Layout>
      <div className="mt-5 col-md-5 offset-md-3 shadow p-5">
        <h3 className="mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="text"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Your email"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Your password"
          />
          <button
            type="sumbit"
            className={`btn btn-primary ${!isValid && "disabled"}`}
          >
            Sumbit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
