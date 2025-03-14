import api from '../api';

const url = "http://localhost:8080/api/pets";

export const addPet = (payload) => api.post(`${url}/add`, payload);

export const updatePet = ( petId, payload) => api.put(`${url}/${petId}`, payload);