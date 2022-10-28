import React from "react";
import { useHistory, useParams } from "react-router-dom";
import QualitiesList from "./qualities/qualitiesList";
import PropTypes from "prop-types";

const UserCard = ({ user }) => {
  if (!user) return null;
  const history = useHistory();
  const { id } = useParams();
  const handleBack = () => {
    history.push("/users");
  };
  const handleEdit = () => {
    history.push(`/users/${id}/edit`);
  };
  return (
    <div className="shadow p-3 my-4 bg-white w-25 rounded">
      <h3>{user.name}</h3>
      <h4>Профессия: {user.profession.name}</h4>
      <div className="my-1">
        <QualitiesList qualities={user.qualities} />
      </div>
      <p>Встретился, раз: {user.completedMeetings}</p>
      <h3>Рейтинг: {user.rate}</h3>
      <div className="d-flex">
        <button
          className="btn btn-light my-2 col-4 me-2"
          onClick={() => handleBack()}
        >
          Назад
        </button>
        <button
          className="btn btn-primary my-2 col-6"
          onClick={() => handleEdit()}
        >
          Редактировать
        </button>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object
};

export default UserCard;
