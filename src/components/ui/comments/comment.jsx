import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { formatCommentTime } from "../../../utils/timeFromNow";
import API from "../../../api";
import CommentPlaceholder from "./commentPlaceholder";

const Comment = ({ comment, onDelete }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.users
      .getById(comment.userId)
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    onDelete(comment._id);
  };

  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          {loading ? (
            <CommentPlaceholder />
          ) : (
            <div className="d-flex flex-start">
              <img
                src={`https://avatars.dicebear.com/api/avataaars/${(
                  Math.random() + 1
                )
                  .toString(36)
                  .substring(7)}.svg`}
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
                        {formatCommentTime(comment.created_at)}
                      </span>
                    </p>
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={handleDelete}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
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
