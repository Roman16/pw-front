import {userConstants} from '../constans/actions.type';
import {history} from '../utils/history';
import {userService} from '../services/user.services';
import {notification} from "../components/Notification";
import moment from "moment";

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
    changeUserAvatar,
    reSetState,
    getPersonalUserInfo,
    unsetAccount,
    resetChangesCount
};

function login(user) {
    return dispatch => {
        userService.login(user)
            .then(res => {
                dispatch(setInformation(res));

                localStorage.setItem('token', res.access_token);

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
                dispatch(setInformation(res.data));

                window.dataLayer.push({
                    'event': 'Registration',
                });

                localStorage.setItem('token', res.access_token);

                dispatch(getUserInfo());
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
                history.push('/ppc/optimization');
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
            dispatch(setInformation(res));
            console.log(res);

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
                history.push('/ppc/optimization');
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

function changeUserAvatar(formData) {
    return dispatch => {
        userService.updatePhoto(formData)
            .then(res => {
                dispatch({
                    type: userConstants.UPDATE_USER,
                    payload: res.user
                });
            });
    };
}
