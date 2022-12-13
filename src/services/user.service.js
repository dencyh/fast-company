import http from "./http.service";
import { getUserLocalId } from "./localStorage.service";

const endpoint = "/user/";

const userService = {
  get: async () => {
    const { data } = await http.get(endpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await http.put(endpoint + payload._id, payload);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await http.get(endpoint + getUserLocalId());
    return data;
  },
  updateUser: async (payload) => {
    const { data } = await http.patch(endpoint + payload._id, payload);
    return data;
  }
};

export default userService;
