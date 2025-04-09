import api from '../api';

const url = "http://localhost:8080/api/appointments";

export const getClientAppointments = () => api.get(`${url}/client`);

export const getVetAppointments = () => api.get(`${url}/vet`)

export const postAppointment = (data) => api.post(`${url}`, data);