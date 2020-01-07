import axios from 'axios';
import {loadProgressBar} from 'axios-progress-bar';
import {notification} from '../components/Notification';

import {history} from '../utils/history';

const baseUrl =
    process.env.REACT_APP_ENV === 'production'
        ? process.env.REACT_APP_API_PROD || ''
        : process.env.REACT_APP_API_URL || '';

let lastError = null;


function handlerErrors(error) {
    if (lastError !== error) {
        lastError = error;

        notification.error({
            title: error,
        });

        setTimeout(() => {
            lastError = null;
        }, 1000)
    }
}


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
                if (result.status === 200) {
                    resolve(result.data);
                } else {
                    resolve({});
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    history.push('/login');
                    localStorage.clear();
                }

                if (error.response) {
                    // console.log('error.response :', error.response);
                    if (typeof error.response.data === 'object') {
                        reject(error);
                        if (error.response.status === 401) {
                            if (error.response.data) {
                                handlerErrors(error.response.data.message ? error.response.data.message : error.response.data.error)
                            }
                        } else if (error.response.status === 429) {

                        } else if (error.response.status === 402 && error.response.statusText === "Payment Required") {

                        } else if (error.response.status === 403 && error.response.statusText === "Forbidden") {

                        } else {
                            if (error.response.data) {
                                handlerErrors(error.response.data.message ? error.response.data.message : error.response.data.error)
                            }
                        }
                    }
                }
            });
    });
};

export default api;
