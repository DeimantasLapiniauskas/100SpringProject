import api from '../api';

const url = "http://localhost:8080/api/pets";

export const getPetsByAccountId = (account_id) => api.get(`${url}/${account_id}`);