import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments, onDelete }) => {
  return (
    <div className="card-body">
      <h2>Комментарии</h2>
      <hr />
      {comments
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((comment) => (
          <Comment key={comment._id} comment={comment} onDelete={onDelete} />
        ))}
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CommentsList;
