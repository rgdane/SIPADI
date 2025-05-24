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

export const createArchiveData = async (formData) => {
    const response = await api.post('/api/archives', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export async function updateArchiveData(id, formData) {
    const response = api.post(`/api/archives/${id}?_method=PUT`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data 
}

export async function deleteArchiveData(id) {
    return api.delete(`/api/archives/${id}`);
}