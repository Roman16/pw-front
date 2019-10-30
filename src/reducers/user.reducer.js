import { userConstants } from '../constans/actions.type';

const initialState = {
    user: {

    }
};

export function user(state = initialState, action) {
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
