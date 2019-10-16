import {userConstants} from '../constans/request.types';

export function users(state = {}, action) {
    switch (action.type) {
        case userConstants.LOGIN_SUCCESS:
            return {
                loading: true
            };

        default:
            return state
    }
}