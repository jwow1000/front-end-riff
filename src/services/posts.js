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