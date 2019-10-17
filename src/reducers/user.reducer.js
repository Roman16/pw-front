import { userConstants } from '../constans/request.types';

export function users(state = {}, action) {
    switch (action.type) {
        case userConstants.SET_INFORMATION:
            return {
                ...state,
                ...action.payload
            };
            break;

        default:
            return state;
            break;
    }
}
