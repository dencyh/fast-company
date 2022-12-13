import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { validator } from "../../utils/validator";
import CheckboxField from "../common/forms/checkboxField";
import TextField from "../common/forms/textField";

const initValues = {
  email: "",
  password: "",
  keepLogged: false
};

const LoginForm = () => {
  const history = useHistory();

  const { signIn } = useAuth();

  const [values, setValues] = useState(initValues);

  const [errors, setErrors] = useState({});

  const handleChange = ({ name, value }) => {
    setValues((prev) => ({ ...prev, [name]: value }));
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
        message: "Пароль должен состоять минимум из 8 символов",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return console.log("Error");
    try {
      await signIn(values);
      const toGo = history.location.state?.from.pathname || "/";
      history.push(toGo);
    } catch (e) {
      setValues(initValues);
    }
  };

  const isValid = Object.keys(errors).length === 0;
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Эл. почта"
        name="email"
        type="text"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />

      <CheckboxField
        value={values.keepLogged}
        onChange={handleChange}
        name="keepLogged"
      >
        Оставаться в системе
      </CheckboxField>
      <button
        type="submit"
        className={`btn btn-primary ${!isValid && "disabled"}`}
      >
        Войти
      </button>
    </form>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
