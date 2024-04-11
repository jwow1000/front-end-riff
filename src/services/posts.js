// this is for crudding the post 
import api from "./apiConfig.js";

// get all posts
export const getPosts = async () => {
    try {
      const response = await api.get("/posts/");
      return response.data;
    } catch (error) {
      throw error;
    }
};

// get a post with id
export const getPost = async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
};

// get a post with id
export const getPostComments = async (id) => {
    try {
      const response = await api.get(`/posts/${id}/comments`);
      return response.data;
    } catch (error) {
      throw error;
    }
};

// still devvvving thissss
// // get a post with id
// export const getFavPosts = async (id) => {
//     try {
//       const response = await api.get(`/posts/${id}/comments`);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
// };


