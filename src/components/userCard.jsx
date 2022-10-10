import React from "react";
import { useHistory } from "react-router-dom";
import QualitiesList from "./qualitiesList";
import PropTypes from "prop-types";

const UserCard = ({ user }) => {
  if (!user) return null;
  const history = useHistory();
  const handleRedirrect = () => {
    history.push("/users");
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
      <button
        className="btn btn-primary my-2"
        onClick={() => handleRedirrect()}
      >
        Все пользователи
      </button>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object
};

export default UserCard;
