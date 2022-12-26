import React, { useState, useEffect } from "react";
import TextField from "../common/forms/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/forms/selectField";
import RadioField from "../common/forms/radioField";
import MultiSelectField from "../common/forms/multiSelectField";
import CheckboxField from "../common/forms/checkboxField";
import { useProfessions } from "../../hooks/useProfessions";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectAllQualities,
  selectQualitiesLoading
} from "../../redux/qualitiesSlice";
import Loader from "../common/loader";

const SignUpForm = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false
  });

  const { signUp } = useAuth();
  const qualities = useSelector(selectAllQualities);
  const qualitiesLoading = useSelector(selectQualitiesLoading);
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id
  }));

  const { professions } = useProfessions();
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }));

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
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      },
      min: {
        message: "Имя должно состоять минимум из 1 буквы",
        value: 1
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
    },
    profession: {
      isRequired: {
        message: "Необходимо выбрать профессию"
      }
    },
    qualities: {
      notEmpty: {
        message: "Необходимо выбрать хотя бы одно качество"
      }
    },
    license: {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const data = {
      ...values,
      qualities: values.qualities.map((quality) => quality.value)
    };

    try {
      await signUp(data);
      history.push("/");
    } catch (e) {
      setErrors(e);
      console.log(e);
    }
  };

  const isValid = Object.keys(errors).length === 0;

  if (qualitiesLoading) return <Loader />;
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
        label="Имя"
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
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
        options={professionsList}
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
        options={qualitiesList}
        onChange={handleChange}
        name="qualities"
        selectAll="Выбрать все"
        label="Выбрать качества"
        error={errors.qualities}
      />

      <CheckboxField
        value={values.license}
        onChange={handleChange}
        name="license"
        error={errors.license}
      >
        Я принимаю условия <a className="link">Пользовательского соглашения</a>
      </CheckboxField>

      <button
        type="submit"
        className={`btn btn-primary ${!isValid && "disabled"}`}
      >
        Зарегистрироваться
      </button>
    </form>
  );
};

export default SignUpForm;
