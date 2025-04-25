import api from '../api';

export const addProduct = (payload) => api.post(`${"http://localhost:8080/api/products"}`, payload);

export const updateProduct = ( productID, payload) => api.put(`${"http://localhost:8080/api/products"}/${productID}`, payload);

export const deleteProduct = (productID) => api.delete(`${"http://localhost:8080/api/products"}/${productID}`);