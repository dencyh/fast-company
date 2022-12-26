import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualitiesSlice";

const rootReducer = combineReducers({
  qualities: qualitiesReducer
});

export const store = configureStore({
  reducer: rootReducer
});
