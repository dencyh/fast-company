import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import CommentPlaceholder from "./commentPlaceholder";

const dummyComments = Array(3)
  .fill(0)
  .map((_, i) => i);
console.log(dummyComments);

const CommentsList = ({ comments, onDelete, isLoading }) => {
  return (
    <div className="card-body">
      <h2>Комментарии</h2>
      <hr />
      {!isLoading
        ? comments.map((comment) => (
            <Comment key={comment._id} comment={comment} onDelete={onDelete} />
          ))
        : dummyComments.map((comment) => <CommentPlaceholder key={comment} />)}
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default CommentsList;
