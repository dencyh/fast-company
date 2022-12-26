import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import {
  getAccessToken,
  getUserLocalId,
  removeAuthData,
  setTokens
} from "../services/localStorage.service";
import { randomInt } from "../utils/randomInt";
import { authService } from "../services/auth.service";
import history from "../utils/history";

const initialState = getAccessToken()
  ? {
      users: [],
      isLoading: true,
      error: null,
      auth: {
        userId: getUserLocalId()
      },
      isLogged: true,
      dataLoaded: false
    }
  : {
      users: [],
      isLoading: false,
      error: null,
      auth: {
        userId: null
      },
      isLogged: false,
      dataLoaded: false
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLogged = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      state.users.push(action.payload);
    },
    userLoggedOut: (state, action) => {
      state.auth.userId = null;
      state.isLogged = false;
    },
    userUpdated: (state, action) => {
      const newUserData = action.payload;
      state.users = state.users.map((user) =>
        user._id === newUserData._id ? { ...user, ...newUserData } : user
      );
    },
    userUpdateFailed: (state, action) => {
      state.error = action.payload;
    }
  }
});

const {
  usersReceived,
  usersRequested,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdated,
  userUpdateFailed
} = usersSlice.actions;

const userCreateRequested = createAction("user/createRequested");
const authRequested = createAction("user/authRequested");
const userCreateFailed = createAction("user/createFailed");
const userUpdateRequest = createAction("user/updateRequest");

export function loadUsers() {
  return async function (dispatch) {
    try {
      dispatch(usersRequested());
      const { content } = await userService.get();
      dispatch(usersReceived(content));
    } catch (e) {
      dispatch(usersRequestFailed(e));
    }
  };
}

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(payload);

      dispatch(userCreated(content));
      history.push("/users");
    } catch (e) {
      dispatch(userCreateFailed(e.message));
    }
  };
}

export function signUp(payload) {
  return async function (dispatch) {
    dispatch(authRequested());
    const { email, password, ...rest } = payload;
    try {
      const data = await authService.signUp({
        email,
        password
      });
      setTokens(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: randomInt(1, 5),
          completedMeetings: randomInt(0, 200),
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest
        })
      );
    } catch (e) {
      dispatch(authRequestFailed(e.message));
    }
  };
}

export function signIn({ payload, redirect }) {
  return async function (dispatch) {
    const { email, password } = payload;
    dispatch(authRequested());

    try {
      const data = await authService.signIn({
        email,
        password
      });
      dispatch(authRequestSuccess({ userId: data.localId }));
      setTokens(data);
      history.push(redirect);
    } catch (e) {
      dispatch(authRequestFailed(e.message));
    }
  };
}

export function signOut() {
  return function (dispatch) {
    removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
  };
}

export function updateUser(payload) {
  return async function (dispatch, getState) {
    dispatch(userUpdateRequest());

    const currentUser = getState().users.users.find(
      (user) => user._id === payload._id
    );

    try {
      if (payload.email !== currentUser.email) {
        await authService.updateEmail({
          email: payload.email
        });
      }
      const { content } = await userService.updateUser({
        ...payload,
        _id: currentUser._id
      });

      dispatch(userUpdated(content));
    } catch (e) {
      dispatch(userUpdateFailed(e.message));
    }
  };
}

export const selectUsersLoading = (state) => state.users.isLoading;

export const selectAllUsers = (state) => state.users.users;

export const selectUserById = (id) => (state) =>
  state.users.users.find((prof) => prof._id === id);

export const selectIsLogged = (state) => state.users.isLogged;

export const selectDataLoaded = (state) => state.users.dataLoaded;

export const selectCurrentUserId = (state) => state.users.auth.userId;

export const selectCurrentUser = createSelector(
  [selectAllUsers, selectCurrentUserId],
  (users, userId) => users.find((user) => user._id === userId)
);

export default usersSlice.reducer;
