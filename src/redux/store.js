import { combineReducers, configureStore } from "@reduxjs/toolkit";
import professionReducer from "./professionsSlice";
import qualitiesReducer from "./qualitiesSlice";

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionReducer
});

export const store = configureStore({
  reducer: rootReducer
});
