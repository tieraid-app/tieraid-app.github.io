import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_DOMAIN || '/';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';
const customRequest = (options) => {
    const { data } = options;
    if (data && data.multipartFormData) {
        let formData = new FormData();
        for (let key in data) {
            const content = data[key];
            if (content) {
                formData.append(key, content);
            }
        }
        data.headers = { 'Content-Type': 'multipart/form-data' }
        options.data = formData;
    }
    return axios(options)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            throw err;
        });
};

export default {
    get: (url) => customRequest({ method: 'get', url }),
    post: (url, data) => customRequest({ method: 'post', url, data }),
    put: (url, data) => customRequest({ method: 'put', url, data }),
    delete: (url, data) => {
        if (!data) {
            return customRequest({ method: 'delete', url });
        }
        return customRequest({ method: 'delete', url, data });
    },
};
