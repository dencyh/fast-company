import React from "react";
import PropTypes from "prop-types";
import { formatCommentTime } from "../../../utils/timeFromNow";
import CommentPlaceholder from "./commentPlaceholder";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectUserById } from "../../../redux/usersSlice";

const Comment = ({ comment, onDelete }) => {
  const user = useSelector(selectUserById(comment.userId));
  const currentUser = useSelector(selectCurrentUser);

  const commentAuthor = currentUser._id === comment.userId;
  const pageOwner = currentUser._id === comment.pageId;
  const canDeleteComment = commentAuthor || pageOwner;

  const handleDelete = async () => {
    onDelete(comment._id);
  };

  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          {!user ? (
            <CommentPlaceholder />
          ) : (
            <div className="d-flex flex-start">
              <img
                src={user.image}
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="65"
                height="65"
              />
              <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1">
                      {user.name}{" "}
                      <span className="small">
                        {formatCommentTime(comment.createdAt)}
                      </span>
                    </p>
                    {canDeleteComment && (
                      <button
                        className="btn btn-sm text-primary d-flex align-items-center"
                        onClick={handleDelete}
                        aria-label="delete comment"
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    )}
                  </div>
                  <p className="small mb-0">{comment.content}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  onDelete: PropTypes.func,
  comment: PropTypes.object
};

export default React.memo(Comment);
