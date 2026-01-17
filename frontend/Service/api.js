import axios from 'axios';

// Create an axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust if backend port differs
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include auth token if available
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.session?.access_token || user?.token; // Handle both structures if needed
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Auth API services
export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProfile = async () => {
    try {
        const response = await api.get('/auth/profile');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Project API services
export const fetchProjects = async () => {
    try {
        const response = await api.get('/projects');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createProject = async (projectData) => {
    try {
        const response = await api.post('/projects', projectData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProjectById = async (id) => {
    try {
        const response = await api.get(`/projects/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProject = async (id, projectData) => {
    try {
        const response = await api.put(`/projects/${id}`, projectData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProject = async (id) => {
    try {
        const response = await api.delete(`/projects/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;
