import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ user, onBookmark }) => {
  return (
    <button className="btn" onClick={() => onBookmark(user._id)}>
      {user.bookmark ? (
        <i className="bi bi-star-fill"></i>
      ) : (
        <i className="bi bi-star"></i>
      )}
    </button>
  );
};

Bookmark.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    bookmark: PropTypes.bool
  }).isRequired,
  onBookmark: PropTypes.func.isRequired
};

export default Bookmark;
