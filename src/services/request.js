import axios from 'axios';
import { loadProgressBar } from 'axios-progress-bar';
import { notification } from 'antd';
import { history } from '../utils/history';

const baseUrl =
    process.env.REACT_APP_ENV === 'developer'
        ? process.env.REACT_APP_API_URL
        : process.env.REACT_APP_API_PROD || '';

notification.config({
    placement: 'bottomRight',
    bottom: 50,
    duration: 3
});

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
                authorization: token ? `Bearer ${token}` : true
            }
        })
            .then(result => {
                resolve(result.data);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    history.push('/login');
                    localStorage.clear();
                }

                if (error.response) {
                    // console.log('error.response :', error.response);
                    if (typeof error.response.data === 'object') {
                        reject(error);

                        if (error.response.status === 401) {
                            notification.error({
                                message: error.response.data
                                    ? error.response.data.error
                                    : ''
                            });
                        } else {
                            notification.error({
                                message: error.response.data
                                    ? error.response.data.message
                                    : ''
                            });
                        }
                    }
                }
            });
    });
};

export default api;
