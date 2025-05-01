import api from '../api';

export const updateClient = ( clientId, payload) => api.put(`${"/client"}/${clientId}`, payload);