import api from '../api';

const url = "http://localhost:8080/api/services";

export const addService = (payload) => api.post(`${url}`, payload);

export const updateService = (Id, payload) =>
  api.put(`${url}/${Id}`, payload);