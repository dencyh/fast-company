import React, { useState, useEffect, useMemo } from "react";
import TextField from "../../common/forms/textField";
import { validator } from "../../../utils/validator";
import SelectField from "../../common/forms/selectField";
import RadioField from "../../common/forms/radioField";
import MultiSelectField from "../../common/forms/multiSelectField";
import { useParams, useHistory } from "react-router-dom";
import Loader from "../../common/loader";
import { useProfessions } from "../../../hooks/useProfessions";
import { useAuth } from "../../../hooks/useAuth";
import { selectFormat } from "../../../utils/selectFormat";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  selectAllQualities,
  selectQualitiesLoading,
  selectQualitiesByIds
} from "../../../redux/qualitiesSlice";

const UserEditPage = () => {
  const { id: userId } = useParams();
  const { updateUser } = useAuth();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "",
    qualities: []
  });

  const { currentUser } = useAuth();
  if (!currentUser) return <Loader />;
  const { professions, isLoading: loadingProfessions } = useProfessions();

  const qualities = useSelector(selectAllQualities);
  const qualitiesLoading = useSelector(selectQualitiesLoading);
  const userQualities = useSelector(
    selectQualitiesByIds(currentUser.qualities)
  );

  const professionsTransformed = useMemo(
    () => selectFormat(professions),
    [professions]
  );

  const qualitiesTransformed = useMemo(
    () => selectFormat(qualities),
    [qualities]
  );

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
      profession: currentUser.profession,
      sex: currentUser.sex,
      qualities: selectFormat(userQualities)
    });
  }, [qualities]);

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
    },
    qualities: {
      notEmpty: {
        message: "Выберите минимум одно качество"
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
    const updatedUser = {
      ...values,
      qualities: values.qualities.map((qual) => qual.value)
    };

    try {
      await updateUser(updatedUser);
      history.replace(`/users/${userId}`);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className="container mt-4">
      <button className="btn btn-primary" onClick={() => history.goBack()}>
        <i className="bi bi-caret-left"></i>
        Назад
      </button>
      <div className="row">
        <form
          onSubmit={handleSubmit}
          className="col-6 mx-auto px-5 py-4 shadow"
        >
          {qualitiesLoading || loadingProfessions ? (
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
                options={professionsTransformed}
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
                options={qualitiesTransformed}
                onChange={handleChange}
                name="qualities"
                selectAll="Выбрать все"
                label="Выбрать качества"
                error={errors.qualities}
              />
              <button
                type="submit"
                className={`btn btn-primary ${!isValid ? "disabled" : ""}`}
              >
                Обновить
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserEditPage;
