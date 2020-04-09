import {productsConstants, reportsConstants, userConstants} from '../constans/actions.type';
import {history} from '../utils/history';
import {userService} from '../services/user.services';
import {notification} from "../components/Notification";
import moment from "moment";
import {store} from "../store/store";

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
    setPpcStatus
};

function login(user) {
    return dispatch => {
        userService.login(user)
            .then(res => {
                localStorage.setItem('token', res.access_token);

                dispatch(setInformation({
                    user: {
                        email: user.email
                    }
                }));

                dispatch(getUserInfo());
            });
    };
}

function loginWithAmazon(user) {
    return dispatch => {
        userService.loginWithAmazon(user)
            .then(res => {
                dispatch(setInformation(res));

                localStorage.setItem('token', res.access_token);

                dispatch(getUserInfo());
            });
    };
}

function logOut() {
    return dispatch => {
        history.push('/login');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        dispatch(setInformation({
            user: {}
        }));
    };
}

function reSetState() {
    return dispatch => {
        dispatch({
            type: userConstants.USER_LOGOUT
        });
    };
}

function regist(user) {
    return dispatch => {
        userService.regist(user)
            .then(res => {
                dispatch(setInformation({
                    user: {
                        email: user.email
                    }
                }));

                localStorage.setItem('token', res.access_token);

                window.dataLayer && window.dataLayer.push && window.dataLayer.push({
                    'event': 'Registration',
                });

                history.push('/confirm-email')
            });
    };
}

function setMWS(data) {
    return dispatch => {
        dispatch(setInformation(data));

        if (data.account_links) {
            if (!data.account_links[0].amazon_ppc.is_connected) {
                history.push('/ppc');
            } else {
                history.push((data.notifications.account_bootstrap && (data.notifications.account_bootstrap.bootstrap_in_progress || true)) ? '/ppc/optimization-loading' : '/ppc/optimization');
            }
        }
    };
}

function unsetAccount(type) {
    return dispatch => {
        userService[`unset${type}`]()
            .then(() => {
                dispatch({
                    type: userConstants[`UNSET_AMAZON_${type}`],
                });
            })
    };
}

function getUserInfo() {
    return dispatch => {
        userService.getUserInfo().then(res => {
            const user = store.getState().user.user || null;

            if (user && (user.id !== res.user.id)) {
                dispatch({
                    type: productsConstants.SET_PRODUCT_LIST,
                    payload: {
                        result: [],
                        fetching: false
                    }
                });

                dispatch({
                    type: reportsConstants.SET_REPORTS_LIST,
                    payload: {
                        data: [],
                        total_size: 0,
                        today_changes: "0",
                        counts: [],
                        counts_with_new: [],
                    }
                });
            }

            localStorage.setItem('userId', res.user.id);

            dispatch(setInformation(res));
            window.Intercom("boot", {
                app_id: "hkyfju3m",
                name: res.user.name, // Full name
                email: res.user.email, // Email address
                created_at: moment(new Date()).unix()// Signup date as a Unix timestamp
            });

            if (!res.account_links[0].amazon_mws.is_connected) {
                history.push('/mws');
            } else if (!res.account_links[0].amazon_ppc.is_connected) {
                history.push('/ppc');
            } else {
                history.push((res.notifications.account_bootstrap && (res.notifications.account_bootstrap.bootstrap_in_progress || true)) ? '/ppc/optimization-loading' : '/ppc/optimization');
            }
        });
    };
}

function getPersonalUserInfo() {
    return dispatch => {
        userService.getUserInfo()
            .then(res => {
                dispatch(setInformation(res));
            });
    };
}


function getAuthorizedUserInfo() {
    return dispatch => {
        userService.getUserInfo()
            .then(res => {
                dispatch(setInformation(res));

                if (!res.account_links[0].amazon_mws.is_connected) {
                    history.push('/mws');
                } else if (!res.account_links[0].amazon_ppc.is_connected) {
                    history.push('/ppc');
                }
            });
    };
}

function setInformation(user) {

    localStorage.setItem('userId', user.user.id);

    return {
        type: userConstants.SET_INFORMATION,
        payload: user
    };
}

function resetChangesCount(product) {
    return {
        type: userConstants.RESET_CHANGES_COUNT,
        payload: product
    };
}

function updateUserInformation(user) {
    return dispatch => {
        userService.updateInformation(user)
            .then(res => {
                dispatch({
                    type: userConstants.UPDATE_USER,
                    payload: res.user
                });

                notification.success({title: 'Completed'})
            });
    };
}

function setPpcStatus(status) {
    return {
        type: userConstants.SET_PPC_STATUS,
        payload: status
    }
}
