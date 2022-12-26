import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { selectCurrentUser } from "../../../redux/usersSlice";
import { useSelector } from "react-redux";

const PersonalInfo = ({ user }) => {
  const history = useHistory();

  const currentUser = useSelector(selectCurrentUser);

  const handleEdit = () => {
    history.push(`/users/${user._id}/edit`);
  };
  return (
    <div className="card mb-3">
      <div className="card-body">
        {currentUser._id === user._id && (
          <button
            className="position-absolute top-0 end-0 d-flex justify-content-center align-items middle btn btn-md"
            style={{ zIndex: 1000 }}
            onClick={handleEdit}
            aria-label="settings button"
          >
            <i className="bi bi-gear"></i>
          </button>
        )}

        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={user.image}
            className="rounded-circle"
            alt="avatar"
            width="150"
          />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">{user.profession.name}</p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"
              ></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PersonalInfo.propTypes = {
  user: PropTypes.object
};

export default PersonalInfo;
