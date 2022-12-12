import axios from "axios";
import { toast } from "react-toastify";
import cfg from "../config";
import { httpAuth } from "../hooks/useAuth";
import { getRefreshToken, getTokenExpiresIn } from "./localStorage.service";

const httpInstance = axios.create({
  baseURL: cfg.API_URL
});

function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key]
      }))
    : data;
}

httpInstance.interceptors.response.use(
  (res) => {
    if (cfg.isFirebase) {
      res.data = { content: transformData(res.data) };
    }
    return res;
  },
  (e) => {
    const expectedError =
      e.response && e.response.status >= 400 && e.response.status < 500;
    if (!expectedError) {
      console.error(e);
      toast.error("Something went wrong");
    }
    return Promise.reject(e);
  }
);

httpInstance.interceptors.request.use(
  async (config) => {
    if (cfg.isFirebase) {
      config.url = config.url.replace(/\/$/, "") + ".json";

      const expiresIn = getTokenExpiresIn();
      const refreshToken = getRefreshToken();
      if (refreshToken && expiresIn > Date.now()) {
        const { data } = await httpAuth.post("token", {
          grant_type: "refresh_token",
          refresh_token: refreshToken
        });
        console.log(data);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const http = {
  get: httpInstance.get,
  post: httpInstance.post,
  put: httpInstance.put,
  delete: httpInstance.delete
};

export default http;
