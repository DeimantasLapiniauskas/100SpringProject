import api from '../api';

export const uploadServiceImage = async (data) => api.post('/services/upload', data);

export const addService = (payload) => api.post('/services', payload);

export const updateService = (Id, payload) => api.put(`/services/${Id}`, payload);

export const getServices = () => api.get('/services');