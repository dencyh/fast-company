import http from "./http.service";

const endpoint = "/comment/";

const commentService = {
  createComment: async (payload) => {
    const { data } = await http.put(endpoint + payload._id, payload);
    return data;
  },
  getComments: async (pageId) => {
    const { data } = await http.get(endpoint, {
      params: {
        orderBy: JSON.stringify("pageId"),
        equalTo: JSON.stringify(pageId)
      }
    });
    return data;
  },
  deleteComment: async (id) => {
    const { data } = await http.delete(endpoint + id);
    return data;
  }
};

export default commentService;
