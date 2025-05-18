import api from "../api/axios";

export async function getCategoriesData() {
    try {
        const response = await api.get('/api/categories');
        return response.data.data.map((item, index) => ({
        ...item,
        key: item.id || index,
        }));
    } catch (error) {
        console.error('Gagal mengambil data kategori:', error);
        throw error;
    }
}

export async function createCategoryData(data) {
    return api.post('/api/categories', data);
}

export async function updateCategoryData(id, data) {
    return api.post(`/api/categories/${id}?_method=PUT`, data)
}

export async function deleteCategoryData(id) {
    return api.delete(`/api/categories/${id}`);
}