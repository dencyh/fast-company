import React from "react";

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

export default Bookmark;
