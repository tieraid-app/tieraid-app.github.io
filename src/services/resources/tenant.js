import api from '@/services/api';
export default {
    fetch: () => api.get('/info/')
}
