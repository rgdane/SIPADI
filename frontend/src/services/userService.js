import api from "../api/axios";

export async function getUsersData() {
    try {
        const response = await api.get('/api/users');
        return response.data.data.map((item, index) => ({
        ...item,
        key: item.id || index,
        }));
    } catch (error) {
        console.error('Gagal mengambil data pengguna:', error);
        throw error;
    }
}

export async function createUserData(data) {
    return api.post('/api/users', data);
}

export async function updateUserData(id, data) {
    return api.post(`/api/users/${id}?_method=PUT`, data)
}

export async function deleteUserData(id) {
    return api.delete(`/api/users/${id}`);
}