import React, { useState, useEffect } from "react";
import CommentForm from "./commentForm";
import API from "../../../api";
import { useParams } from "react-router-dom";
import CommentsList from "./commentsList";

const CommentSection = () => {
  const params = useParams();
  const { id: pageId } = params;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    API.comments.fetchCommentsForUser(pageId).then((data) => {
      setComments(data);
    });
  }, []);

  const handleDeleteComment = async (commentId) => {
    const removedId = await API.comments.remove(commentId);
    setComments((prev) => prev.filter((comment) => comment._id !== removedId));
  };

  const handleSubmit = (values) => {
    API.comments.add({ ...values, pageId }).then((newComment) => {
      setComments((prev) => [...prev, newComment]);
    });
  };

  return (
    <div className="col-md-8">
      <div className="card mb-2">
        <CommentForm pageId={comments.pageId} onSubmit={handleSubmit} />
      </div>

      <div className="card mb-3">
        <CommentsList comments={comments} onDelete={handleDeleteComment} />
      </div>
    </div>
  );
};

export default CommentSection;
