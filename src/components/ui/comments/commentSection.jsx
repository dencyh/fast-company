import React from "react";
import CommentForm from "./commentForm";
import CommentsList from "./commentsList";
import { useComments } from "../../../hooks/useComments";

const CommentSection = () => {
  const { comments, deleteComment } = useComments();

  const { createComment } = useComments();

  const handleDeleteComment = async (commentId) => {
    deleteComment(commentId);
  };

  const handleSubmit = (data) => {
    createComment(data);
  };

  return (
    <div className="col-md-8">
      <div className="card mb-2">
        {comments && (
          <CommentForm pageId={comments.pageId} onSubmit={handleSubmit} />
        )}
      </div>

      <div className="card mb-3">
        {comments && (
          <CommentsList comments={comments} onDelete={handleDeleteComment} />
        )}
      </div>
    </div>
  );
};

export default CommentSection;
