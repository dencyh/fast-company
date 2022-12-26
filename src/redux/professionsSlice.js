import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionsSlice = createSlice({
  name: "professions",
  initialState: {
    professions: [],
    lastUpdate: null,
    isLoading: true,
    error: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsReceived: (state, action) => {
      state.professions = action.payload;
      state.isLoading = false;
      state.lastUpdate = Date.now();
    },
    professionsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { professionsReceived, professionsRequested, professionsRequestFailed } =
  professionsSlice.actions;

function isExpired(data) {
  if (Date.now() - data > 1000 * 60 * 10) {
    return true;
  }
  return false;
}

export const loadProfessions = () => async (dispatch, getState) => {
  try {
    const { lastUpdate } = getState().professions;

    if (!isExpired(lastUpdate)) return;

    dispatch(professionsRequested());
    const { content } = await professionService.get();
    dispatch(professionsReceived(content));
  } catch (e) {
    dispatch(professionsRequestFailed(e));
  }
};

export const selectProfessionsLoading = (state) => state.professions.isLoading;

export const selectAllProfessions = (state) => state.professions.professions;

export const selectProfessionById = (id) => (state) =>
  state.professions.professions.find((prof) => prof._id === id);

export default professionsSlice.reducer;
