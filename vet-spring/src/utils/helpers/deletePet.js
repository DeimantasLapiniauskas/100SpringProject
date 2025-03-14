import api from '../api';

const url = "http://localhost:8080/api/pets";

export const deletePet = (petId) => api.delete(`${url}/${petId}`);