import api from '../api';

export const getAllPets = () => api.get(`${"/pets/all"}`);

export const addPet = (payload) => api.post(`${"/pets/add"}`, payload);

export const updatePet = ( petId, payload) => api.put(`${"/pets"}/${petId}`, payload);

export const deletePet = (petId) => api.delete(`${"/pets"}/${petId}`);

export const getPetsByAccountId = (owner_id) => api.get(`${"/pets"}/${owner_id}`);