import http from "./http.service";

const endpoint = "/user/";

const userService = {
  get: async () => {
    const { data } = await http.get(endpoint);
    return data;
  }
};

export default userService;
