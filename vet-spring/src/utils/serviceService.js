import api from './api';

const url = "http://localhost:8080/api/services";

export const addService = (payload) => api.post(`${url}`, payload);

export const updateService = (serviceId, payload) =>
  api.put(`${url}/${serviceId}`, payload);