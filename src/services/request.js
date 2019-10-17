import axios from 'axios';
// import {notification} from 'antd';

const baseUrl =
    process.env.REACT_APP_ENV === 'developer'
        ? process.env.REACT_APP_API_URL
        : process.env.REACT_APP_API_PROD;

const api = (method, url, data, type) => {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: `${baseUrl}/api/${url}`,
            data: data,
            headers: {
                'Content-Type': type || 'application/json',
                authorization:  token ? `Bearer ${token}` : true
            }
        })
            .then(result => {
                resolve(result.data);
            })
            .catch(error => {
                reject(error);
                console.log(error);
                // notification.error({
                //     message: error.response.data.errorMessage,
                //     description: error.response.data.userMessage,
                // });
            });
    });
};

export default api;
