import { combineReducers, configureStore } from "@reduxjs/toolkit";
import professionReducer from "./professionsSlice";
import qualitiesReducer from "./qualitiesSlice";
import usersReducer from "./usersSlice";
import commentsReducer from "./commentsSlice";

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionReducer,
  users: usersReducer,
  comments: commentsReducer
});

export const store = configureStore({
  reducer: rootReducer
});
