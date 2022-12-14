import React, { useState, useEffect, useMemo } from "react";
import TextField from "../../common/forms/textField";
import { validator } from "../../../utils/validator";
import SelectField from "../../common/forms/selectField";
import RadioField from "../../common/forms/radioField";
import MultiSelectField from "../../common/forms/multiSelectField";
import { useParams, useHistory } from "react-router-dom";
import Loader from "../../common/loader";
import { selectFormat } from "../../../utils/selectFormat";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllQualities,
  selectQualitiesLoading,
  selectQualitiesByIds
} from "../../../redux/qualitiesSlice";
import {
  selectAllProfessions,
  selectProfessionsLoading
} from "../../../redux/professionsSlice";
import { selectCurrentUser, updateUser } from "../../../redux/usersSlice";

const UserEditPage = () => {
  const dispatch = useDispatch();
  const { id: userId } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "",
    qualities: []
  });

  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) return <Loader />;

  const professions = useSelector(selectAllProfessions);
  const professionsLoading = useSelector(selectProfessionsLoading);

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
        message: "???????? ???? ?????????? ???????? ????????????"
      }
    },
    email: {
      isRequired: {
        message: "???????? ???? ?????????? ???????? ????????????"
      },
      isEmail: {
        message: "???????????????????????? ????. ??????????"
      }
    },
    profession: {
      isRequired: {
        message: "???????????????????? ?????????????? ??????????????????"
      }
    },
    qualities: {
      notEmpty: {
        message: "???????????????? ?????????????? ???????? ????????????????"
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
      _id: userId,
      ...values,
      qualities: values.qualities.map((qual) => qual.value)
    };

    try {
      dispatch(updateUser(updatedUser));
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
        ??????????
      </button>
      <div className="row">
        <form
          onSubmit={handleSubmit}
          className="col-6 mx-auto px-5 py-4 shadow"
        >
          {qualitiesLoading || professionsLoading ? (
            <Loader />
          ) : (
            <>
              <TextField
                label="??????"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="?????????????????????? ??????????"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="??????????????????"
                name="profession"
                defaultOption="??????????????..."
                value={values.profession}
                error={errors.profession}
                options={professionsTransformed}
                onChange={handleChange}
              />
              <RadioField
                name="sex"
                label="?????????????? ??????"
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
                selectAll="?????????????? ??????"
                label="?????????????? ????????????????"
                error={errors.qualities}
              />
              <button
                type="submit"
                className={`btn btn-primary ${!isValid ? "disabled" : ""}`}
              >
                ????????????????
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserEditPage;
