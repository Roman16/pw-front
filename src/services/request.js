import axios from 'axios'
import {loadProgressBar} from 'axios-progress-bar'
import {notification} from '../components/Notification'
import {useDispatch} from "react-redux"

import {history} from '../utils/history'
import {userService} from "./user.services"
import {defaultImportStatus} from "../reducers/user.reducer"
import _ from 'lodash'
import * as Sentry from "@sentry/react"

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


const api = (method, url, data, type, abortToken, withDefaultUrl = true, showNotifications = true) => {
    loadProgressBar()

    const token = localStorage.getItem('token'),
        adminToken = localStorage.getItem('adminToken')

    const isAdminRequest = url.split('/')[0] === 'admin'

    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: withDefaultUrl ? `${baseUrl}/api/${url}` : url,
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
                    if (typeof result.data === 'object') {
                        resolve(result.data)
                    } else {
                        reject(result.data)
                        notification.error({title: 'Error!'})
                    }
                } else {
                    reject(null)
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    if (error.response.data.message === 'Incorrect login or password' || history.location.pathname.includes('/confirm-email')) {
                        reject(error)
                        handlerErrors(error.response.data.message)
                    } else {
                        localStorage.removeItem('token')
                        localStorage.removeItem('adminToken')
                        if (window.location.pathname !== '/login') {
                            history.push(`/login?redirect=${history.location.pathname + history.location.search}`)
                        }
                    }
                } else if (error.response && error.response.status === 412) {
                    history.push('/confirm-email')
                } else if (error.response && error.response.status === 423) {
                    localStorage.setItem('importStatus', JSON.stringify(_.mapValues(defaultImportStatus, () => ({required_parts_ready: false}))))
                    reject(error)
                } else if (error.response) {
                    if (!error.response.data || !error.response.data.message) {
                        handlerErrors('Something wrong!')
                        reject(error)
                    } else if (typeof error.response.data === 'object' && showNotifications) {
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


                Sentry.withScope((scope) => {
                    Sentry.captureException(error)
                })
            })
    })
}

export default api
