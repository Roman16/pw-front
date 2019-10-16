import {userConstants} from '../constans/request.types';
import {history} from '../utils/history';

import {userService} from '../services/user.services';

export const userActions = {
    login,
    regist,
    setInformation
};

function login(user) {
    return dispatch => {
        userService.login(user).then(data => {
            dispatch(setInformation(user));

            localStorage.setItem('token', data.access_token);
            history.push('/ppc/optimization');
        });
    };
}

function regist(user) {
    return dispatch => {
        userService.regist(user).then(data => {
            dispatch(setInformation(user));

            history.push('/mws');
        });
    };
}

function setInformation(user) {
    return dispatch => {
        userService.regist(user).then(data => {
            dispatch({
                type: userConstants.SET_INFORMATION,
                payload: user
            });
        });
    };
}
