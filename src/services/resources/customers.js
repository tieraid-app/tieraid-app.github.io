import api from '@/services/api';

const BASE_URL = '/api/agreements'

export default {
    fetch: () => api.get(`${BASE_URL}/`),
}