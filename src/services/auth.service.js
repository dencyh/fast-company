import axios from "axios";

export const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: API_KEY
  }
});

const authService = {
  signUp: async ({ email, password }) => {
    const { data } = httpAuth.post("accounts:signUp", {
      email,
      password,
      returnSecureToken: true
    });
    return data;
  }
};
