import {userConstants} from '../constans/actions.type';
import {history} from '../utils/history';

import {userService} from '../services/user.services';

export const userActions = {
    login,
    loginWithAmazon,
    logOut,
    regist,
    setMWS,
    getUserInfo,
    setInformation,
    getAuthorizedUserInfo
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
        window.open('/login', '_self');

        dispatch({
            type: userConstants.USER_LOGOUT
        });

        localStorage.clear();
    };
}

function regist(user) {
    return dispatch => {
        userService.regist(user)
            .then(res => {
                dispatch(setInformation(res.data));

                localStorage.setItem('token', res.access_token);

                dispatch(getUserInfo());
            });
    };
}

function setMWS(data) {
    return dispatch => {
        dispatch(setInformation(data));

        if (data.account_links) {
            if (!data.account_links.amazon_ppc.is_connected) {
                history.push('/ppc');
            } else {
                history.push('/ppc/optimization');
            }
        }
    };
}

function getUserInfo() {
    return dispatch => {
        userService.getUserInfo().then(res => {
            dispatch(setInformation(res));

            if (!res.account_links.amazon_mws.is_connected) {
                window.open('/mws', '_self');
            } else if (!res.account_links.amazon_ppc.is_connected) {
                window.open('/ppc', '_self');
            } else {
                window.open('/ppc/optimization', '_self');
            }
        });
    };
}


function getAuthorizedUserInfo() {
    return dispatch => {
        userService.getUserInfo().then(res => {
            dispatch(setInformation(res));

            if (!res.account_links.amazon_mws.is_connected) {
                window.open('/mws', '_self');
            } else if (!res.account_links.amazon_ppc.is_connected) {
                window.open('/ppc', '_self');
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
