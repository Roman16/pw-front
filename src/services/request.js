import axios from 'axios'
import {loadProgressBar} from 'axios-progress-bar'
import {notification} from '../components/Notification'
import {useDispatch} from "react-redux"

import {history} from '../utils/history'
import {userService} from "./user.services"

const baseUrl =
    // 'http://staging.profitwhales.com';
    process.env.REACT_APP_ENV === 'production'
        ? process.env.REACT_APP_API_PROD || ''
        : process.env.REACT_APP_API_URL || ''

let lastError = null


function handlerErrors(error) {
    if (lastError !== error) {
        lastError = error

        notification.error({
            title: error,
        })

        setTimeout(() => {
            lastError = null
        }, 1000)
    }
}


const api = (method, url, data, type, abortToken) => {
    loadProgressBar()

    const token = localStorage.getItem('token'),
        adminToken = localStorage.getItem('adminToken')

    const isAdminRequest = url.split('/')[0] === 'admin'

    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: `${baseUrl}/api/${url}`,
            data: data,
            headers: {
                'Content-Type': type || 'application/json',
                authorization: token ?
                    isAdminRequest ?
                        adminToken ? `Bearer ${adminToken}` : `Bearer ${token}`
                        : `Bearer ${token}`
                    : true
            },
            cancelToken: abortToken

        })
            .then(result => {
                if (result.status === 208) {
                    resolve({
                        status: 'already'
                    })
                } else if (result.status === 200 || result.status === 207) {
                    resolve(result.data)
                } else {
                    reject(null)
                }
            })
            .catch(error => {

                if (error.response && error.response.status === 401) {
                    if (error.response.data.message === 'Incorrect login or password') {
                        handlerErrors(error.response.data.message)
                    } else {
                        history.push(`/login?redirect=${window.location.pathname}`)
                    }
                } else if (error.response && error.response.status === 412) {
                    userService.resendConfirmEmail()
                        .then(() => {
                            history.push('/confirm-email')
                        })
                } else if (error.response) {
                    if (error.response.status === 500 && (!error.response.data || !error.response.data.message)) {
                        handlerErrors('Something wrong!')
                        reject(error)
                    } else if (typeof error.response.data === 'object') {
                        reject(error)
                        if (error.response.status === 401) {
                            if (error.response.data) {
                                handlerErrors(error.response.data.message ? error.response.data.message : error.response.data.error)
                            }
                        } else if (error.response.status === 429 || error.response.data.message === 'Retry with' || (error.response.status === 402 && error.response.statusText === "Payment Required") || (error.response.status === 403 && error.response.statusText === "Forbidden")) {
                        } else if (error.response.data.message !== 'Product not found') {
                            if (error.response.data) {
                                handlerErrors(error.response.data.message ? error.response.data.message : error.response.data.error)
                            }
                        }
                    }
                } else {
                    reject(error)
                }
            })
    })
}

export default api
