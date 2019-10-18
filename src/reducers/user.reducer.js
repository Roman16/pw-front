import { userConstants } from '../constans/actions.type';

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
