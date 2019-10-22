import {userConstants} from '../constans/actions.type';
import {history} from '../utils/history';

import {userService} from '../services/user.services';

export const userActions = {
    login,
    logOut,
    regist,
    setMWS,
    getUserInfo,
    setInformation
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

function logOut() {
    return dispatch => {
        history.push('/login');

        dispatch({
            type: userConstants.USER_LOGOUT,
        });

        localStorage.removeItem('token');
    };
}

function regist(user) {
    return dispatch => {
        userService.regist(user)
            .then(res => {
                dispatch(setInformation(res.data));

                localStorage.setItem('token', res.data.auth_token);

                dispatch(getUserInfo());
            });
    };
}


function setMWS(data) {
    return dispatch => {
        userService.setMWS(data)
            .then(res => {
                dispatch(setInformation(res));

                if (res.account_links) {
                    if (!res.account_links.amazon_ppc.is_connected) {
                        history.push('/ppc');
                    } else {
                        history.push('/ppc/optimization');
                    }
                }
            });
    };
}


function getUserInfo() {
    return dispatch => {
        userService.getUserInfo()
            .then(res => {
                dispatch(setInformation(res));

                if (!res.account_links.amazon_mws.is_connected) {
                    history.push('/mws');
                } else if (!res.account_links.amazon_ppc.is_connected) {
                    history.push('/ppc');
                } else {
                    history.push('/ppc/optimization');
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
