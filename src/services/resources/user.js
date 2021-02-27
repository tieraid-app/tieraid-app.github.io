import api from '@/services/api';
export default {
    me: () => api.get('/user/')
}