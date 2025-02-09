import axios from 'axios'
import {loadProgressBar} from 'axios-progress-bar'
import {notification} from '../components/Notification'
import {useDispatch} from "react-redux"

import {history} from '../utils/history'
import {userService} from "./user.services"
import {defaultImportStatus} from "../reducers/user.reducer"
import _ from 'lodash'
import * as Sentry from "@sentry/react"
import {store} from "../store/store"
import {userConstants} from "../constans/actions.type"

export const baseUrl =
    // 'http://staging.profitwhales.com';
    process.env.REACT_APP_ENV === 'production'
        ? process.env.REACT_APP_API_PROD || ''
        : process.env.REACT_APP_API_URL || ''

let lastError = null

export const encodeString = (string) => encodeURIComponent(string)

function handlerErrors(error, type = 'error', request_id) {
    if (lastError !== error) {
        lastError = error

        notification[type]({
            title: error,
            autoClose: !(type === 'error' && request_id),
            description: request_id ? `Request ID: ${request_id}` : ''
        })

        setTimeout(() => {
            lastError = null
        }, 1000)
    }
}

const urlGenerator = ({url, withDefaultUrl, withMarketplace, isAdminRequest}) => {
    if (withDefaultUrl) {
        if (withMarketplace) {
            const marketplace = JSON.parse(localStorage.getItem('activeMarketplace'))

            if (isAdminRequest) {
                return `${baseUrl}/api/${url}`
            }

            if (marketplace) {
                if (url.includes('?')) {
                    return `${baseUrl}/api/${url.split('?')[0]}?amazon_region_account_marketplace_id=${marketplace.id}&${url.split('?')[1]}`
                } else {
                    return `${baseUrl}/api/${url}?amazon_region_account_marketplace_id=${marketplace.id}`
                }
            }
        } else {
            return `${baseUrl}/api/${url}`
        }
    } else {
        return url
    }
}

const api = (method, url, data, type, abortToken, withDefaultUrl = true, showNotifications = true, withMarketplace = true) => {
    loadProgressBar()

    const token = localStorage.getItem('token'),
        adminToken = localStorage.getItem('adminToken')

    const isAdminRequest = url.split('/')[0] === 'admin' || url.split('/')[0] === 'agency'

    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: urlGenerator({url, withDefaultUrl, withMarketplace, isAdminRequest}),
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
                if (!error.response && !('message' in error)) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('adminToken')
                    if (window.location.pathname !== '/login') {
                        history.push(`/login?redirect=${history.location.pathname + history.location.search}`)
                    }
                } else if (error.response && error.response.status === 401) {
                    if (error.response.data.message === 'Incorrect login or password' || history.location.pathname.includes('/confirm-email')) {
                        reject(error)
                        handlerErrors(error.response.data.message)
                    } else {
                        localStorage.removeItem('token')
                        localStorage.removeItem('adminToken')
                        localStorage.removeItem('activeRegion')
                        localStorage.removeItem('activeMarketplace')

                        handlerErrors('Authorization has expired, please log in again', 'warning')

                        if (window.location.pathname !== '/login') {
                            history.push(`/login?redirect=${history.location.pathname + history.location.search}`)

                            store.dispatch({
                                type: userConstants.SET_ACTIVE_REGION,
                                payload: undefined
                            })
                        }
                    }
                } else if (error.response && error.response.status === 412) {
                    // history.push('/confirm-email')
                } else if (error.response && error.response.status === 423) {
                    localStorage.setItem('importStatus', JSON.stringify(_.mapValues(defaultImportStatus, () => ({required_parts_ready: false}))))
                    reject(error)
                } else if (error.response && showNotifications) {
                    if (!error.response.data || !error.response.data.message) {
                        handlerErrors('Something wrong!', 'error', error.response.data.request_id)
                        reject(error)
                    } else if (typeof error.response.data === 'object') {
                        reject(error)

                        if (error.response.status === 429) {
                            handlerErrors('This request is throttled, please try again later')
                        } else if (error.response.data.message === 'Retry with' || (error.response.status === 402 && error.response.data.message === "Payment Required") || (error.response.status === 403 && (error.response.data.message === "Forbidden" || error.response.data.message === "Access denied"))) {
                        } else if (error.response.data.message !== 'Product not found') {
                            if (error.response.data) {
                                handlerErrors(error.response.data.message ? error.response.data.message : error.response.data.error, 'error', error.response.data.request_id)
                            }
                        }
                    }
                } else {
                    reject(error)
                }

                if (axios.isCancel(error)) {
                    console.log('Request canceled')
                } else {
                    Sentry.withScope((scope) => {
                        Sentry.captureException(error)
                    })
                }
            })
    })
}

export default api
