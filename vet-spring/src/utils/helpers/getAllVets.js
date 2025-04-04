import api from '../api';

const url = "http://localhost:8080/api/vets";

export const getAllVets = () => api.get(`${url}`);