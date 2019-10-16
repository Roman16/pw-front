import {userConstants} from '../constans/request.types';
import {history} from '../utils/history';

import {userService} from '../services/user.services';

export const userActions = {
    login,
};

function login(user) {
    return dispatch => {
        userService.login(user)
            .then(data => {
                dispatch({
                    type: userConstants.LOGIN_SUCCESS,
                    payload: {
                        token: data.access_token
                    }
                });

                history.push('/');
            });
    };
}