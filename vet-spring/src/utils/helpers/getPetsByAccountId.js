import api from '../api';

const url = "http://localhost:8080/api/pets";

export const getPetsByAccountId = (owner_id) => api.get(`${url}/${owner_id}`);