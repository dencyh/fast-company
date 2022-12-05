import http from "./http.service";

const endpoint = "/user/";

const userService = {
  get: async () => {
    const { data } = await http.get(endpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await http.put(endpoint + payload._id, payload);
    return data;
  }
};

export default userService;
