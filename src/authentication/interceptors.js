import axios from 'axios';

window.BASE_URL =    process.env.REACT_APP_ENV === 'developer'
        ? process.env.REACT_APP_API_URL
        : process.env.REACT_APP_API_PROD;
const token = global.localStorage.getItem('token');

const initialInterceptors = () => {
    axios.interceptors.request.use((config) => {
        config.baseURL = window.BASE_URL;
        // config.headers.Authorization = token;

        return config;
    });
};

export default initialInterceptors;
