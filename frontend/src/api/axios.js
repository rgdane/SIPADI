import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}` kalau pakai token
    },
});

export default api;
