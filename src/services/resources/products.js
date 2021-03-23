import api from '@/services/api';
export default {
    fetchAll: () => api.get('/api/products/'),
    fetch: (id) => api.get(`/api/products/${id}/`),
    create: (data) => api.post('/api/products/', data),
    delete: (id) => api.delete(`/api/products/${id}/`),
    update: (id, data) => api.put(`/api/products/${id}/`, data),
    
}