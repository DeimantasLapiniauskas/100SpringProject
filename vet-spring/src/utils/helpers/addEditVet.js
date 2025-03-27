import api from '../api';

export const addVet = (payload) => api.post(`${"http://localhost:8080/api/registerVet"}`, payload);

export const updateVet = ( vetId, payload) => api.put(`${"http://localhost:8080/api/vet"}/${vetId}`, payload);