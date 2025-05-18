import api from "../api/axios";

export async function getUsersData() {
    try {
        const response = await api.get('/users');
        return response.data.data.map((item, index) => ({
        ...item,
        key: item.id || index,
        }));
    } catch (error) {
        console.error('Gagal mengambil data pengguna:', error);
        throw error;
    }
}