import React, { useState, useEffect } from "react";
import TextField from "../common/forms/textField";
import { validator } from "../../utils/validator";
import API from "../../api";
import SelectField from "../common/forms/selectField";
import RadioField from "../common/forms/radioField";
import MultiSelectField from "../common/forms/multiSelectField";
import { useParams, useHistory } from "react-router-dom";
import Loader from "../common/loader";

const EditUserForm = () => {
  const { id: userId } = useParams();
  const history = useHistory();
  const [values, setValues] = useState({
    name: "noname",
    email: "no@email.com",
    profession: "noprof",
    sex: "male",
    qualities: []
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  useEffect(() => {
    setLoading(true);
    API.users
      .getById(userId)
      .then((data) => {
        const { name, email, profession, sex } = data;

        const qualities = Object.keys(data.qualities).map((optionName) => ({
          label: data.qualities[optionName].name,
          value: data.qualities[optionName]._id,
          color: data.qualities[optionName].color
        }));

        setValues((prev) => ({
          ...prev,
          name,
          email,
          profession: profession._id,
          sex,
          qualities
        }));
      })
      .finally(() => setLoading(false));
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
    name: {
      isRequired: {
        message: "Поле не может быть пустым"
      }
    },
    email: {
      isRequired: {
        message: "Поле не может быть пустым"
      },
      isEmail: {
        message: "Некорректная эл. почта"
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
    const updatedUser = {
      ...values,
      profession: getProfessionById(values.profession),
      qualities: getQualities(values.qualities)
    };
    console.log(updatedUser);
    API.users.update(userId, updatedUser);

    history.replace(`/users/${userId}`);
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="col-6 mx-auto mt-4 px-5 py-4 shadow"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <TextField
            label="Имя"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
          />
          <TextField
            label="Электронная почта"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
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
          <button
            type="sumbit"
            className={`btn btn-primary ${!isValid ? "disabled" : ""}`}
          >
            Обновить
          </button>
        </>
      )}
    </form>
  );
};

export default EditUserForm;
