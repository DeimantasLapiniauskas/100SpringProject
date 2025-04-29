import api from "../api";

export const updateAccountPassword = ( accountId, payload) => api.put(`${"http://localhost:8080/api/account/password"}/${accountId}`, payload);