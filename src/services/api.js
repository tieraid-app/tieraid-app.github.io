import axios from "axios";

axios.defaults.baseURL = '/';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

const customRequest = (data) => {
    return axios(data).then(response => {
        return response.data;
    }).catch(err => {
        throw err;
    })
}

export default {
    get: (url) => customRequest({ method: 'get', url }),
    post: (url, data) => customRequest({ method: 'post', url, data }),
    put: (url, data) => customRequest({ method: 'put', url, data }),
    delete: (url, data) => {
        if(!data) {
            return customRequest({ method: 'delete', url })
        }
        return customRequest({ method: 'delete', url, data })
    }
}