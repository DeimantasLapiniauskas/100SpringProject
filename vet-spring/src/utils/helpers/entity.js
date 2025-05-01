import api from "../api";

export const postEntity = async (entityPath, payload) => api.post(`/${entityPath}`, payload);

export const uploadEntityImage = async (entityPath, data) => api.post(`/${entityPath}/upload`, data);

export const putEntity = async (entityPath, entityId, payload) =>
  api.put(`/${entityPath}/${entityId}`, payload);

export const deleteEntity = async (entityPath, entityId) => api.delete(`/${entityPath}/${entityId}`);

export const verifyPassword = async (password) => api.post(`/auth/verify-password`, { newPassword: password });

export const getEntityById = async (entityPath, entityId) => api.get(`/${entityPath}/${entityId}`);

export const getAllEntitys = async (entityPath) => api.get(`/${entityPath}`);