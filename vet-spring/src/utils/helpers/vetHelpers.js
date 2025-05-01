import api from '../api';

export const getAllVets = () => api.get("/vets");

export const addVet = (payload) => api.post("/registerVet", payload);

export const updateVet = ( vetId, payload) => api.put(`${"/vet"}/${vetId}`, payload);