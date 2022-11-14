import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectField from "../../common/forms/selectField";
import API from "../../../api";
import Loader from "../../common/loader";
import TextArea from "../../common/forms/textArea";
import { validator } from "../../../utils/validator";

const CommentForm = ({ onSubmit }) => {
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  const initValues = {
    userId: "",
    content: ""
  };

  const [values, setValues] = useState(initValues);

  const validatorConfig = {
    userId: {
      isRequired: {
        message: "Необходимо выбрать автора"
      }
    },
    content: {
      isRequired: {
        message: "Поле не может быть пустым"
      }
    }
  };

  const validate = () => {
    const errors = validator(values, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    setIsLoading(true);
    API.users
      .fetchAll()
      .then((data) => {
        setUsers(
          Object.keys(data).map((professionName) => ({
            label: data[professionName].name,
            value: data[professionName]._id
          }))
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = ({ name, value }) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!valid) {
      setValid(validate());
    }
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    setValid(isValid);
    if (!isValid) return null;

    onSubmit(values);

    setValues(initValues);
  };

  return (
    <div className="card-body">
      <div>
        <h2>Новый комментарий</h2>
        <form onSubmit={handleSubmit}>
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <SelectField
                label="Автор"
                name="userId"
                defaultOption="Выберите пользователя..."
                value={values.userId}
                error={errors.userId}
                options={users}
                onChange={handleChange}
              />
            )}
          </>

          <TextArea
            label={"Сообщение"}
            name="content"
            value={values.content}
            onChange={handleChange}
            error={errors.content}
            rows={3}
          />
          <button
            type="submit"
            className={`btn btn-primary float-end ${!valid ? "disabled" : ""}`}
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CommentForm;
