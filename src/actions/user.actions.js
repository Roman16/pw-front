import {productsConstants, reportsConstants, userConstants} from '../constans/actions.type'
import {history} from '../utils/history'
import {userService} from '../services/user.services'
import {notification} from "../components/Notification"
import {store} from "../store/store"

export const userActions = {
    logOut,
    getUserInfo,
    setInformation,
    getAuthorizedUserInfo,
    updateUserInformation,
    getPersonalUserInfo,
    setPpcStatus,
    getImpersonationUserInformation,
    updateUser,
    setAmazonRegionAccounts,
    updateAmazonRegionAccounts,
    setActiveRegion,
    getNotifications,
    getAccountStatus,
    actualizeActiveRegion,
}

function logOut() {
    return dispatch => {
        dispatch(setInformation({
            user: {}
        }))
    }
}

function getUserInfo() {
    return dispatch => {
        userService.getUserPersonalInformation()
            .then((res) => {

                const user = store.getState().user.user || null

                if (user && (user.id !== res.id)) {
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

                localStorage.setItem('userId', res.id)

                dispatch(setInformation(res))
            })
    }
}

function getPersonalUserInfo() {
    return dispatch => {
        userService.getUserInfo()
            .then(({result}) => {
                dispatch(setInformation(result))
            })
    }
}


function getAuthorizedUserInfo() {
    return dispatch => {
        userService.getUserInfo()
            .then(({result}) => {
                dispatch(setInformation(result))
            })
    }
}

function getImpersonationUserInformation() {
    return dispatch => {
        userService.getUserInfo()
            .then(({result}) => {
                const res = result
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
                    history.push('/home')
                }, 500)
            })
    }
}

function setInformation(data) {
    return {
        type: userConstants.SET_INFORMATION,
        payload: data
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


function setAmazonRegionAccounts(data) {
    return {
        type: userConstants.SET_AMAZON_REGION_ACCOUNTS,
        payload: data
    }
}

function updateAmazonRegionAccounts(data) {
    return {
        type: userConstants.UPDATE_AMAZON_REGION_ACCOUNTS,
        payload: data
    }
}

function setActiveRegion(data) {
    return {
        type: userConstants.SET_ACTIVE_REGION,
        payload: data
    }
}


function getNotifications() {
    return dispatch => {
        userService.getNotifications()
            .then(({response}) => {
                dispatch({
                    type: userConstants.SET_NOTIFICATIONS,
                    payload: response
                })
            })
    }
}

function getAccountStatus(id) {
    return dispatch => {
        userService.getAccountStatus(id)
            .then(({result}) => {
                dispatch(setInformation({subscription: result}))
            })
    }
}

function actualizeActiveRegion() {
    return {
        type: userConstants.ACTUALIZE_ACTIVE_REGION,
    }
}




