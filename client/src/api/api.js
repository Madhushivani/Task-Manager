import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

export const fetchTasks = (filters) => API.get('/api/tasks', { params: filters });
export const createTask = (task) => API.post('/api/tasks', task);
export const updateTask = (id, task) => API.put(`/api/tasks/${id}`, task);
export const deleteTask = (id) => API.delete(`/api/tasks/${id}`);
export const googleLogin = () => window.open('http://localhost:5000/auth/google', '_self');
export const logout = () => API.get('/auth/logout');
export const getUser = () => API.get('/auth/user');
