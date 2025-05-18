import api from "../api/axios";

export async function getArchivesData() {
    try {
        const response = await api.get('/api/archives');
        return response.data.data.map((item, index) => ({
        ...item,
        key: item.id || index,
        }));
    } catch (error) {
        console.error('Gagal mengambil data arsip:', error);
        throw error;
    }
}

export async function createArchiveData(data) {
    return api.post('/api/archives', data);
}

export async function updateArchiveData(id, data) {
    return api.post(`/api/archives/${id}?_method=PUT`, data)
}

export async function deleteArchiveData(id) {
    return api.delete(`/api/archives/${id}`);
}