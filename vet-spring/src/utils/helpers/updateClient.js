import api from '../api';

export const updateClient = ( clientId, payload) => api.put(`${"http://localhost:8080/api/client"}/${clientId}`, payload);