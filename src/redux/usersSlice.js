import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import {
  getAccessToken,
  removeAuthData,
  setTokens
} from "../services/localStorage.service";
import { randomInt } from "../utils/randomInt";
import { httpAuth } from "../services/auth.service";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    currentUser: null,
    isLoading: true,
    error: null
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    currentUserUpdated: (state, action) => {
      const currentUser = action.payload;
      state.currentUser = currentUser;
      state.users = state.users.map((user) =>
        user._id === currentUser._id ? currentUser : user
      );
      state.isLoading = false;
    },

    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.lastUpdate = Date.now();
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const {
  usersReceived,
  usersRequested,
  usersRequestFailed,
  setCurrentUser,
  currentUserUpdated
} = usersSlice.actions;

export const loadUsers = () => async (dispatch) => {
  try {
    dispatch(usersRequested());
    const { content } = await userService.get();
    dispatch(usersReceived(content));
  } catch (e) {
    dispatch(usersRequestFailed(e));
  }
};

function createUser(data) {
  return async function (dispatch) {
    dispatch(usersRequested());
    try {
      const { content } = await userService.create(data);

      dispatch(setCurrentUser(content));
    } catch (e) {
      usersRequestFailed(e.message);
    }
  };
}

export const signUp = (payload) => async (dispatch) => {
  const url = "accounts:signUp";
  const { email, password, ...rest } = payload;
  try {
    const { data } = await httpAuth.post(url, {
      email,
      password,
      returnSecureToken: true
    });
    setTokens(data);
    dispatch(
      createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      })
    );
  } catch (e) {
    dispatch(usersRequestFailed(e.message));
  }
};

export function signIn({ email, password }) {
  return async function (dispatch) {
    const url = "accounts:signInWithPassword";
    dispatch(usersRequested());

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      dispatch(getUserData());
    } catch (e) {
      dispatch(usersRequestFailed(e.message));
    }
  };
}

export function getUserData() {
  return async function (dispatch) {
    dispatch(usersRequested());
    try {
      const { content } = await userService.getCurrentUser();
      dispatch(setCurrentUser(content));
    } catch (e) {
      dispatch(usersRequestFailed(e.message));
    }
  };
}

export function signOut() {
  return function (dispatch) {
    history.push("/");
    dispatch(setCurrentUser(null));
    removeAuthData();
  };
}

async function updateEmail(email) {
  const url = "accounts:update";
  const { data } = await httpAuth.post(url, {
    idToken: getAccessToken(),
    email,
    returnSecureToken: true
  });
  setTokens(data);
  return data;
}

export function updateUser(payload) {
  return async function (dispatch, getState) {
    const currentUser = getState().users.currentUser;

    try {
      if (payload.email !== undefined && payload.email !== currentUser.email) {
        await updateEmail(payload.email);
      }
      const { content } = await userService.updateUser({
        ...payload,
        _id: currentUser._id
      });

      dispatch(currentUserUpdated({ ...currentUser, ...content }));
    } catch (e) {
      dispatch(usersRequestFailed(e.message));
    }
  };
}

export const selectUsersLoading = (state) => state.users.isLoading;

export const selectAllUsers = (state) => state.users.users;

export const selectCurrentUser = (state) => state.users.currentUser;

export const selectUserById = (id) => (state) =>
  state.users.users.find((prof) => prof._id === id);

export default usersSlice.reducer;
