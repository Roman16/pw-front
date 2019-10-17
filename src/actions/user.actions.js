import {userConstants} from '../constans/request.types';
import {history} from '../utils/history';

import {userService} from '../services/user.services';

export const userActions = {
    login,
    regist,
    getUserInfo,
    setInformation
};

function login(user) {
    return dispatch => {
        userService.login(user)
            .then(res => {
                dispatch(setInformation(res));

                dispatch(getUserInfo());

                localStorage.setItem('token', res.access_token);
                history.push('/ppc/optimization');
            });
    };
}

function regist(user) {
    return dispatch => {
        userService.regist(user)
            .then(res => {
                dispatch(setInformation(res));

                localStorage.setItem('token', res.access_token);
                history.push('/mws');
            });
    };
}

function getUserInfo() {
    return dispatch => {
        userService.getUserInfo()
            .then(res => {
                dispatch(setInformation(res));
            });
    };
}

function setInformation(user) {
    return {
        type: userConstants.SET_INFORMATION,
        payload: user
    };
}
