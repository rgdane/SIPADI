import api from '../api/axios';

export const login = async (credentials) => {
    await api.get('/sanctum/csrf-cookie',{
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const response = await api.post('/api/login', credentials);
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get('/api/user');
    return response.data;
};

export const logout = async () => {
    await api.post('/api/logout');
};
