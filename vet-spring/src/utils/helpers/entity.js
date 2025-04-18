import api from "../api";

const url = "http://localhost:8080/api";
const urlPassword = "http://localhost:8080/api/auth/verify-password"

export const postEntity = async (entityPath, payload) => api.post(`${url}/${entityPath}`, payload);

export const uploadEntityImage = async (entityPath, data) => api.post(`${url}/${entityPath}/upload`, data);

export const putEntity = async (entityPath, entityId, payload) =>
    api.put(`${url}/${entityPath}/${entityId}`, payload);
  
  export const deleteEntity = async (entityPath, entityId) => api.delete(`${url}/${entityPath}/${entityId}`);
  
  export const verifyPassword = async (password) => api.post(`${urlPassword}`, { newPassword: password })
  
  export const getEntityById = async (entityPath, entityId) => api.get(`${url}/${entityPath}/view/${entityId}`);