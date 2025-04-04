import api from '../api';

const url = "http://localhost:8080/api/appointments";

export const getAppointments = () => api.get(`${url}/client`);

export const postAppointment = (data) => api.post(`${url}`, data);
