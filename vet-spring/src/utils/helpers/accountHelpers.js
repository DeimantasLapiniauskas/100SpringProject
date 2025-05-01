import api from '../api';

export const deleteAccount = (ID) => api.delete(`${"/accounts"}/${ID}`);

export const updateAccountPassword = ( accountId, payload) => api.put(`${"/account/password"}/${accountId}`, payload);