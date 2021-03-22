import api from '@/services/api';

const BASE_URL = '/api/users/'

export default {
    me: () => api.get(`${BASE_URL}/me/`),
    update: (id, data) => api.put(`${BASE_URL}${id}/`, data)
}