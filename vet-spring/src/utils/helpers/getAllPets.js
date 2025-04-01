import api from '../api';

const url = "http://localhost:8080/api/pets/all";

export const getAllPets = () => api.get(`${url}`);