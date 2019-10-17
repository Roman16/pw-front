import { userConstants } from '../constans/request.types';

export function user(state = {}, action) {
    switch (action.type) {
        case userConstants.SET_INFORMATION:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}
