import axios from "axios";
import { getAccessToken, setTokens } from "./localStorage.service";

export const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: API_KEY
  }
});

export const authService = {
  signUp: async ({ email, password }) => {
    const { data } = await httpAuth.post("accounts:signUp", {
      email,
      password,
      returnSecureToken: true
    });
    return data;
  },
  signIn: async ({ email, password }) => {
    const { data } = await httpAuth.post("accounts:signInWithPassword", {
      email,
      password,
      returnSecureToken: true
    });
    return data;
  },
  updateEmail: async ({ email }) => {
    const { data } = await httpAuth.post("accounts:update", {
      idToken: getAccessToken(),
      email,
      returnSecureToken: true
    });
    setTokens(data);
  }
};
