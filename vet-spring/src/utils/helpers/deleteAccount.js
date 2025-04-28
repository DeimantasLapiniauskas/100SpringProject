import api from '../api';

export const deleteAccount = (ID) => api.delete(`${"http://localhost:8080/api/accounts"}/${ID}`);