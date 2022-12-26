import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: {
    qualities: [],
    lastUpdate: null,
    isLoading: true,
    error: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true;
    },
    qualitiesReceived: (state, action) => {
      state.qualities = action.payload;
      state.isLoading = false;
      state.lastUpdate = Date.now();
    },
    qualitiesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { qualitiesReceived, qualitiesRequested, qualitiesRequestFailed } =
  qualitiesSlice.actions;

function isExpired(data) {
  if (Date.now() - data > 1000 * 60 * 10) {
    return true;
  }
  return false;
}

export const loadQualities = () => async (dispatch, getState) => {
  try {
    const { lastUpdate } = getState().qualities;

    if (!isExpired(lastUpdate)) return;

    dispatch(qualitiesRequested());
    const { content } = await qualityService.get();
    dispatch(qualitiesReceived(content));
  } catch (e) {
    dispatch(qualitiesRequestFailed(e));
  }
};

export const selectAllQualities = (state) => state.qualities.qualities;

export const selectQualitiesLoading = (state) => state.qualities.isLoading;

export const selectQualitiesByIds = (ids) => (state) =>
  state.qualities.qualities.filter((quality) => ids.includes(quality._id));

export default qualitiesSlice.reducer;
