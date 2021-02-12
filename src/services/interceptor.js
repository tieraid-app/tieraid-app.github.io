import axios from 'axios';
import store from '@/store'

export default function() {
    axios.interceptors.request.use(function(config) {
        const token = store.getters['auth/getAccessToken'];
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function(err) {
        return Promise.reject(err);
    });
}