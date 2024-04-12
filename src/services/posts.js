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

//create new post
export const createPost = async (postData) => {
  let form_data = new FormData();

  form_data.append("image", postData.image);
  form_data.append("title", postData.title);
  form_data.append("text_body", postData.text_body);
  form_data.append("author", postData.author);

  try {
    const response = await api.post("/posts/", form_data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get a post with id
export const getPost = async (id) => {
  try {
    const response = await api.get(`/posts/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get a post comments with id
export const getPostComments = async (id) => {
  try {
    const response = await api.get(`/posts/${id}/comments/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
