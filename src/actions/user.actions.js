import {productsConstants, reportsConstants, userConstants} from '../constans/actions.type'
import {history} from '../utils/history'
import {userService} from '../services/user.services'
import {notification} from "../components/Notification"
import moment from "moment"
import {store} from "../store/store"
import {Redirect, Route} from "react-router-dom"
import React from "react"

export const userActions = {
    login,
    loginWithAmazon,
    logOut,
    regist,
    setMWS,
    getUserInfo,
    setInformation,
    getAuthorizedUserInfo,
    updateUserInformation,
    reSetState,
    getPersonalUserInfo,
    unsetAccount,
    resetChangesCount,
    setPpcStatus,
    setBootstrap,
    getImpersonationUserInformation,
    updateUser
}

function login() {
    return dispatch => {
        userService.getUserInfo()
            .then(userFullInformation => {
                dispatch(setInformation(userFullInformation))

                const mwsConnected = userFullInformation.account_links[0].amazon_mws.is_connected,
                    ppcConnected = userFullInformation.account_links[0].amazon_ppc.is_connected

                if (!mwsConnected && !ppcConnected) {
                    history.push('/connect-amazon-account')
                } else if (!mwsConnected && ppcConnected) {
                    history.push('/connect-mws-account')
                } else if (!ppcConnected && mwsConnected) {
                    history.push('/connect-ppc-account')
                } else {
                    history.push('/account/settings')
                }
            })
    }
}

function loginWithAmazon(user) {
    return dispatch => {
        userService.loginWithAmazon(user)
            .then(res => {
                dispatch(setInformation(res))

                localStorage.setItem('token', res.access_token)

                dispatch(getUserInfo())
            })
    }
}

function logOut() {
    return dispatch => {
        dispatch(setInformation({
            user: {}
        }))
    }
}

function reSetState() {
    return dispatch => {
        dispatch({
            type: userConstants.USER_LOGOUT
        })
    }
}

function regist(user) {
    return dispatch => {
        userService.regist(user)
            .then(res => {
                dispatch(setInformation({
                    user: {
                        email: user.email
                    }
                }))

                localStorage.setItem('token', res.access_token)

                // window.dataLayer.push({
                //     'event': 'Registration',
                // })

                history.push('/confirm-email')
            })
    }
}

function setMWS(data) {
    return dispatch => {
        dispatch(setInformation(data))

        if (data.account_links) {
            if (!data.account_links[0].amazon_ppc.is_connected) {
            } else {
                history.push('/account/settings')
            }
        }
    }
}

function unsetAccount(type) {
    return ({
        type: userConstants[`UNSET_AMAZON_${type}`],
    })
}

function getUserInfo() {
    return dispatch => {
        userService.getUserInfo().then(res => {
            const user = store.getState().user.user || null

            if (user && (user.id !== res.user.id)) {
                dispatch({
                    type: productsConstants.SET_PRODUCT_LIST,
                    payload: {
                        result: [],
                        fetching: false
                    }
                })

                dispatch({
                    type: reportsConstants.SET_REPORTS_LIST,
                    payload: {
                        data: [],
                        total_size: 0,
                        today_changes: "0",
                        counts: [],
                        counts_with_new: [],
                    }
                })
            }

            localStorage.setItem('userId', res.user.id)

            dispatch(setInformation(res))
        })
    }
}

function getPersonalUserInfo() {
    return dispatch => {
        userService.getUserInfo()
            .then(res => {
                dispatch(setInformation(res))
            })
    }
}


function getAuthorizedUserInfo() {
    return dispatch => {
        userService.getUserInfo()
            .then(res => {
                dispatch(setInformation(res))
            })
    }
}

function getImpersonationUserInformation() {
    return dispatch => {
        userService.getUserInfo()
            .then(res => {
                const user = store.getState().user.user || null

                if (user && (user.id !== res.user.id)) {
                    dispatch({
                        type: productsConstants.SET_PRODUCT_LIST,
                        payload: {
                            result: [],
                            fetching: false
                        }
                    })
                }

                localStorage.setItem('userId', res.user.id)

                dispatch(setInformation(res))

                setTimeout(() => {
                    history.push('/account/settings')
                }, 500)
            })
    }
}

function setInformation(user) {
    localStorage.setItem('userId', user.user.id)

    return {
        type: userConstants.SET_INFORMATION,
        payload: user
    }
}

function resetChangesCount(product) {
    return {
        type: userConstants.RESET_CHANGES_COUNT,
        payload: product
    }
}

function updateUserInformation(user) {
    return dispatch => {
        userService.updateInformation(user)
            .then(res => {
                dispatch(updateUser(res.user))

                notification.success({title: 'Completed'})
            })
    }
}



function updateUser(user) {
    return {
        type: userConstants.UPDATE_USER,
        payload: user
    }
}

function setPpcStatus(status) {
    return {
        type: userConstants.SET_PPC_STATUS,
        payload: status
    }
}

function setBootstrap(status) {
    return {
        type: userConstants.SET_BOOTSTRAP,
        payload: status
    }
}
