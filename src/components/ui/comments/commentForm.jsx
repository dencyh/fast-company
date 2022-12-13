import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextArea from "../../common/forms/textArea";
import { validator } from "../../../utils/validator";

const CommentForm = ({ onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  const [content, setContent] = useState("");

  const validatorConfig = {
    content: {
      isRequired: {
        message: "Поле не может быть пустым"
      }
    }
  };

  const validate = () => {
    const errors = validator({ content }, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = ({ value }) => {
    setContent(value);
  };

  useEffect(() => {
    if (!valid) {
      setValid(validate());
    }
  }, [content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    setValid(isValid);
    if (!isValid) return null;

    onSubmit(content);

    setContent("");
  };

  return (
    <div className="card-body">
      <div>
        <h2>Новый комментарий</h2>
        <form onSubmit={handleSubmit}>
          <TextArea
            label={"Сообщение"}
            name="content"
            value={content}
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
