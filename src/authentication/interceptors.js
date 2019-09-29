import axios from 'axios';

window.BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://front1.profitwhales.com';

const initialInterceptors = () => {
    axios.interceptors.request.use(
        (config) => {
            config.baseURL = window.BASE_URL;


            return config;
        },
    );
};

export default initialInterceptors;
