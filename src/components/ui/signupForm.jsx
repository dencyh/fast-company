import React, { useState, useEffect } from "react";
import TextField from "../common/forms/textField";
import { validator } from "../../utils/validator";
import API from "../../api";
import SelectField from "../common/forms/selectField";
import RadioField from "../common/forms/radioField";
import Select from "react-select";

const SignupForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male"
  });

  const [errors, setErrors] = useState({});

  const [professions, setProfessions] = useState([]);
  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

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
    },
    profession: {
      isRequired: {
        message: "Необходимо выбрать профессию"
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
      <SelectField
        label="Профессия"
        defaultOption="Выбрать..."
        value={values.profession}
        error={errors.profession}
        options={professions}
        onChange={handleChange}
      />
      <RadioField
        name="sex"
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" }
        ]}
        value={values.sex}
        onChange={handleChange}
      />
      <Select
        isMulti
        name="colors"
        options={professions}
        className="basic-multi-select"
        classNamePrefix="select"
      />

      <button
        type="sumbit"
        className={`btn btn-primary ${!isValid && "disabled"}`}
      >
        Зарегистроваться
      </button>
    </form>
  );
};

export default SignupForm;
