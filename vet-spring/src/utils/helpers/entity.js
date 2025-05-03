import api from "../api";

const url = "http://localhost:8080/api";
const urlPassword = "http://localhost:8080/api/auth/verify-password"

export const postEntity = async (entityPath, payload, signal) => api.post(`${url}/${entityPath}`, payload, signal ? {signal} : {});

export const uploadEntityImage = async (entityPath, data, signal) => api.post(`${url}/${entityPath}/upload`, data, signal ? {signal} : {});

export const putEntity = async (entityPath, entityId, payload, signal) =>
    api.put(`${url}/${entityPath}/${entityId}`, payload, signal ? {signal} : {});
  
  export const deleteEntity = async (entityPath, entityId) => api.delete(`${url}/${entityPath}/${entityId}`);
  
  export const verifyPassword = async (password) => api.post(`${urlPassword}`, { newPassword: password })
  
  export const getEntityById = async (entityPath, entityId) => api.get(`${url}/${entityPath}/${entityId}`);

  export const getAllEntitys = async (entityPath) => api.get(`${url}/${entityPath}`)

  export const patchEntity = async (entityPath, entityId, data) => api.patch(`${entityPath}/${entityId}`, data)
