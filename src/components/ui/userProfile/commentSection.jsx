import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import CommentForm from "./commentForm";
import API from "../../../api";

const CommentSection = ({ pageId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    API.comments.fetchCommentsForUser(pageId).then((data) => {
      setComments(data);
    });
  }, []);

  const handleDeleteComment = () => {
    console.log("delete");
  };

  const handleSumbit = (values) => {
    API.comments
      .add({ ...values, pageId })
      .then((newComment) => setComments((prev) => [...prev, newComment]));
  };

  console.log(comments);

  return (
    <div className="col-md-8">
      <div className="card mb-2">
        <CommentForm pageId={comments.pageId} onSubmit={handleSumbit} />
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <h2>Comments</h2>
          <hr />
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

CommentSection.propTypes = {
  pageId: PropTypes.string
};

export default CommentSection;
