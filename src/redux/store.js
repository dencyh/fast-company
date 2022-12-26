import { combineReducers, configureStore } from "@reduxjs/toolkit";
import professionReducer from "./professionsSlice";
import qualitiesReducer from "./qualitiesSlice";
import usersReducer from "./usersSlice";

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionReducer,
  users: usersReducer
});

export const store = configureStore({
  reducer: rootReducer
});
