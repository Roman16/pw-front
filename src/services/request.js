import axios from 'axios';
import {loadProgressBar} from 'axios-progress-bar';
import {notification} from '../components/Notification';

import {history} from '../utils/history';

const baseUrl =
    process.env.REACT_APP_ENV === 'production'
        ? process.env.REACT_APP_API_PROD
        : process.env.REACT_APP_API_URL || '';


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
                // authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZnJvbnQxLnByb2ZpdHdoYWxlcy5jb21cL2FwaVwvdXNlclwvbG9naW4iLCJpYXQiOjE1NzQwODk4MjMsImV4cCI6MTU3NDE3NjIyMywibmJmIjoxNTc0MDg5ODIzLCJqdGkiOiI4b0ZOdERlOU1iYWhLaUQwIiwic3ViIjo4OSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.ZdkLDxKxxKTz72qVcMmwE4L4xfUF7o1rb1pYVG4mt5g`
                authorization: token ? `Bearer ${token}` : true
            }
        })
            .then(result => {
                resolve(result.data);
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
                            if(error.response.data) {
                                notification.error({
                                    title: error.response.data.message ? error.response.data.message : error.response.data.error,
                                });
                            }
                        } else {
                            if(error.response.data) {
                                notification.error({
                                    title: error.response.data.message ? error.response.data.message : error.response.data.error
                                });
                            }

                        }
                    }
                }
            });
    });
};

export default api;
