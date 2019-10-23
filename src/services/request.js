import axios from 'axios';
import { loadProgressBar } from 'axios-progress-bar';
import {notification} from 'antd';

const baseUrl =
    process.env.REACT_APP_ENV === 'developer'
        ? process.env.REACT_APP_API_URL
        : process.env.REACT_APP_API_PROD;

const api = (method, url, data, type) => {
    loadProgressBar();

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
                console.log(error.response);
                notification.error({
                    message: error.response.data ? error.response.data.message : '',
                    // description: error.response.data.message,
                });
            });
    });
};

export default api;
