import api from "../api";

const urlUpload = "http://localhost:8080/api/posts/upload";
const urlPassword = "http://localhost:8080/api/auth/verify-password";
const url = "http://localhost:8080/api/posts";

export const uploadImage = async (data) => api.post(urlUpload, data);

export const postPost = async (payload) => api.post(url, payload);

export const updatePost = async (postId, payload) =>
  api.put(`${url}/${postId}`, payload);

export const deletePost = async (postId) => api.delete(`${url}/${postId}`);

export const verifyPassword = async (password) => api.post(`${urlPassword}`, { newPassword: password })

export const getPostById = async (postId) => api.get(`${url}/view/${postId}`);
