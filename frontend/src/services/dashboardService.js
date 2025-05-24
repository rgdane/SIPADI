import api from '../api/axios';

export const getDashboardData = async () => {
    try {
        const response = await api.get('/api/dashboard');
        return response.data;
    } catch (error) {
        console.error('Gagal mengambil data dashboard:', error);
        throw error;
    }
};
