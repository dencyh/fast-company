import React, { useEffect, useMemo } from "react";
import CommentForm from "./commentForm";
import CommentsList from "./commentsList";
import { useComments } from "../../../hooks/useComments";
import { useDispatch, useSelector } from "react-redux";
import {
  loadComments,
  selectAllComments,
  selectCommentsLoading
} from "../../../redux/commentsSlice";
import { useParams } from "react-router-dom";

const CommentSection = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(loadComments(id));
  }, [id, dispatch]);

  const comments = useSelector(selectAllComments);
  const commentsLoading = useSelector(selectCommentsLoading);

  const sortedComments = useMemo(
    () => comments.slice(0).sort((a, b) => b.createdAt - a.createdAt),
    [comments]
  );

  const { deleteComment } = useComments();

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
        <CommentsList
          comments={sortedComments}
          isLoading={commentsLoading}
          onDelete={handleDeleteComment}
        />
      </div>
    </div>
  );
};

export default CommentSection;
