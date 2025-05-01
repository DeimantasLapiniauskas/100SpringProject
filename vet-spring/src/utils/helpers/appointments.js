import api from '../api';

export const getClientAppointments = () => api.get('/appointments/client');

export const getVetAppointments = () => api.get('/appointments/vet');

export const postAppointment = (data) => api.post('/appointments', data);