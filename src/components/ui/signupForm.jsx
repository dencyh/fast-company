import React, { useState, useEffect } from "react";
import TextField from "../common/forms/textField";
import { validator } from "../../utils/validator";
import API from "../../api";
import SelectField from "../common/forms/selectField";
import RadioField from "../common/forms/radioField";
import MultiSelectField from "../common/forms/multiSelectField";
import CheckboxField from "../common/forms/checkboxField";

const SignupForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
  });

  const [errors, setErrors] = useState({});

  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  useEffect(() => {
    API.professions.fetchAll().then((data) =>
      setProfessions(
        Object.keys(data).map((professionName) => ({
          label: data[professionName].name,
          value: data[professionName]._id
        }))
      )
    );
    API.qualities.fetchAll().then((data) =>
      setQualities(
        Object.keys(data).map((optionName) => ({
          label: data[optionName].name,
          value: data[optionName]._id,
          color: data[optionName].color
        }))
      )
    );
  }, []);

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
        message: "Пароль должен состояить минимум из 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: "Необходимо выбрать профессию"
      }
    },
    licence: {
      isRequired: {
        message: "Необходимо принять Пользовательское соглашение"
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

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log({
      ...values,
      profession: getProfessionById(values.profession),
      qualities: getQualities(values.qualities)
    });
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
        name="profession"
        defaultOption="Выбрать..."
        value={values.profession}
        error={errors.profession}
        options={professions}
        onChange={handleChange}
      />
      <RadioField
        name="sex"
        label="Выбрать пол"
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" }
        ]}
        value={values.sex}
        onChange={handleChange}
      />
      <MultiSelectField
        defaultValue={values.qualities}
        options={qualities}
        onChange={handleChange}
        name="qualities"
        selectAll="Выбрать все"
        label="Выбрать качества"
      />

      <CheckboxField
        value={values.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Я принимаю условия <a className="link">Пользовательского соглашения</a>
      </CheckboxField>

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
