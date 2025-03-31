import api from "../api";

const urlUpload = "http://localhost:8080/api/posts/upload";
const url = "http://localhost:8080/api/posts";

export const uploadImage = async (data) => api.post(urlUpload, data);

export const postPost = async (payload) => api.post(url, payload);

export const updatePost = async (postId, payload) =>
  api.put(`${url}/${postId}`, payload);

export const deletePost = async (postId) =>
    api.delete(`${url}/${postId}`);
