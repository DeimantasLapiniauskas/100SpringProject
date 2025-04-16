import api from '../api';
const urlUpload = "http://localhost:8080/api/services/upload";
const url = "http://localhost:8080/api/services";

export const uploadServiceImage = async (data) => api.post(urlUpload, data);

export const addService = (payload) => api.post(`${url}`, payload);

export const updateService = (Id, payload) =>
  api.put(`${url}/${Id}`, payload);

export const getServices = () => api.get(`${url}`);