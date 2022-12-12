import axios from "axios";
import { toast } from "react-toastify";
import cfg from "../config";

const httpInstance = axios.create({
  baseURL: cfg.API_URL
});

function transformData(data) {
  return data
    ? Object.keys(data).map((key) => ({
        ...data[key]
      }))
    : [];
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
  (config) => {
    if (cfg.isFirebase) {
      config.url = config.url.replace(/\/$/, "") + ".json";
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
