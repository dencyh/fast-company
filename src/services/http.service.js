import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../config";

axios.defaults.baseURL = config.API_URL;

axios.interceptors.response.use(
  (res) => res,
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

export const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default http;
