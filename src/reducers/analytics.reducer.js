import {analyticsConstants} from '../constans/actions.type';

const initialState = {

};


export function analytics(state = initialState, action) {
    switch (action.type) {
        case analyticsConstants.CLEAR_SETTINGS:
            return {
                ...initialState
            };

        default:
            return state;
    }
}