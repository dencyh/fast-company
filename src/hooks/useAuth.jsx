import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import axios from "axios";
import {
  getAccessToken,
  removeAuthData,
  setTokens
} from "../services/localStorage.service";
import { randomInt } from "../utils/randomInt";
import { useHistory } from "react-router-dom";

export const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: API_KEY
  }
});

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const [error, setError] = useState(null);
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
    } catch (e) {
      errorCatcher(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  async function signUp({ email, password, ...rest }) {
    const url = "accounts:signUp";
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      });
    } catch (e) {
      // errorCatcher(e);
      const { code, message } = e.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с такой эл. почтой уже зарегистрирован"
          };
          throw errorObject;
        }
      }
    }
  }

  async function signIn({ email, password }) {
    const url = "accounts:signInWithPassword";

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await getUserData();
    } catch (e) {
      const { code, message } = e.response.data.error;

      if (
        code === 400 &&
        (message === "INVALID_PASSWORD" || message === "EMAIL_NOT_FOUND")
      ) {
        const errorObject = {
          message: "Пользователь с такими данными не найден"
        };
        errorCatcher(errorObject);
        throw errorObject;
      } else {
        const errorObject = {
          message: "Что-то пошло не так"
        };
        errorCatcher(errorObject);
        throw errorObject;
      }
    }
  }

  function signOut() {
    history.push("/");
    setCurrentUser(null);
    removeAuthData();
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);

      setCurrentUser(content);
    } catch (e) {
      errorCatcher(e);
    }
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

  async function updateUser(payload) {
    try {
      if (payload.email !== undefined && payload.email !== currentUser.email) {
        await updateEmail(payload.email);
      }
      const { content } = await userService.updateUser({
        ...payload,
        _id: currentUser._id
      });

      setCurrentUser((prev) => ({ ...prev, ...content }));
    } catch (e) {
      throw new Error("Что-то пошло не так");
    }
  }

  function errorCatcher(error) {
    const { message } = error;
    setError(message);
  }

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, signOut, currentUser, updateUser }}
    >
      {loading ? "Loading..." : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default AuthProvider;
