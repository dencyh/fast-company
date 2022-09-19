import React from "react";
import Bookmark from "./bookmark";
import Quality from "./quality";
import PropTypes, { string } from "prop-types";

const User = ({ user, handleBookmark, handleDeletion }) => {
  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((quality) => (
            <Quality key={quality._id} quality={quality} />
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td className="text-center pointer">
          <Bookmark user={user} onBookmark={handleBookmark} />
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => handleDeletion(user._id)}
          >
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    _id: string,
    name: string,
    profession: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    }),
    qualities: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        color: PropTypes.string
      })
    ),
    completedMeetings: PropTypes.number,
    rate: PropTypes.number,
    bookmark: PropTypes.bool
  }).isRequired,
  handleBookmark: PropTypes.func.isRequired,
  handleDeletion: PropTypes.func.isRequired
};

export default User;
