import { createSlice } from "@reduxjs/toolkit";
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
    }
  }
});

const { commentsReceived, commentsRequested, commentsRequestFailed } =
  commentsSlice.actions;

export const loadComments = (userId) => async (dispatch) => {
  try {
    dispatch(commentsRequested());
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceived(content));
  } catch (e) {
    dispatch(commentsRequestFailed(e));
  }
};

export const selectCommentsLoading = (state) => state.comments.isLoading;

export const selectAllComments = (state) => state.comments.comments;

export default commentsSlice.reducer;
