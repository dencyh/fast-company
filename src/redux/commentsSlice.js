import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      state.comments.push(action.payload);
      state.isLoading = false;
    },
    commentDeleted: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      );
      state.isLoading = false;
    }
  }
});

const {
  commentsReceived,
  commentsRequested,
  commentsRequestFailed,
  commentCreated,
  commentDeleted
} = commentsSlice.actions;

export function loadComments(userId) {
  return async function (dispatch) {
    try {
      dispatch(commentsRequested());
      const { content } = await commentService.getComments(userId);
      dispatch(commentsReceived(content));
    } catch (e) {
      dispatch(commentsRequestFailed(e));
    }
  };
}

export function createComment(payload) {
  return async function (dispatch, getState) {
    dispatch(commentsRequested());
    const comment = {
      _id: nanoid(),
      content: payload.content,
      pageId: payload.id,
      userId: getState().users.auth.userId,
      createdAt: Date.now()
    };
    try {
      const { content } = await commentService.createComment(comment);
      dispatch(commentCreated(content));
    } catch (e) {
      dispatch(commentsRequestFailed(e));
    }
  };
}

export function deleteComment(commendId) {
  return async function (dispatch, getState) {
    dispatch(commentsRequested());

    try {
      await commentService.deleteComment(commendId);
      dispatch(commentDeleted(commendId));
    } catch (e) {
      dispatch(commentsRequestFailed(e));
    }
  };
}

export const selectCommentsLoading = (state) => state.comments.isLoading;

export const selectAllComments = (state) => state.comments.comments;

export default commentsSlice.reducer;
