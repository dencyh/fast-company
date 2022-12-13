import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

const CommentsProvider = ({ children }) => {
  const { id: userId } = useParams();
  const { currentUser } = useAuth();

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getComments();
  }, [userId]);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  async function createComment(content) {
    const comment = {
      _id: nanoid(),
      content,
      pageId: userId,
      userId: currentUser._id,
      createdAt: Date.now()
    };

    try {
      const { content } = await commentService.createComment(comment);
      setComments((prev) => [...prev, content]);
    } catch (e) {
      errorCatcher(e);
    }
  }
  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId);
      setComments(content);
    } catch (e) {
      errorCatcher(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteComment(id) {
    try {
      await commentService.deleteComment(id);
      setComments((prev) => prev.filter((comment) => comment._id !== id));
    } catch (e) {
      errorCatcher(e);
    }
  }

  return (
    <CommentsContext.Provider
      value={{
        comments,
        createComment,
        deleteComment,
        isLoading
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default CommentsProvider;
