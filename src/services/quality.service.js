import http from "./http.service";

const endpoint = "/quality/";

const qualityService = {
  get: async () => {
    const { data } = await http.get(endpoint);
    return data;
  }
};

export default qualityService;
