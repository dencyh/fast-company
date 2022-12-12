import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import axios from "axios";
import { getAccessToken, setTokens } from "../services/localStorage.service";
import { randomInt } from "../utils/randomInt";

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
  const [currentUser, setCurrentUser] = useState({});

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
    }
  }

  useEffect(() => {
    if (getAccessToken()) {
      getUserData();
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
      console.log(data);
      setTokens(data);
      getUserData();
    } catch (e) {
      const { code, message } = e.response.data.error;
      if (code === 400) {
        if (message === "INVALID_PASSWORD") {
          const errorObject = {
            message: "Пользователь с такими данными не найден"
          };
          errorCatcher(errorObject);
          throw errorObject;
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setCurrentUser(content);
    } catch (e) {
      errorCatcher(e);
    }
  }

  function errorCatcher(error) {
    const { message } = error;
    setError(message);
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
      {children}
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
