import http from "./http.service";

const endpoint = "/profession/";

const professionService = {
  get: async () => {
    const { data } = await http.get(endpoint);
    return data;
  }
};

export default professionService;
