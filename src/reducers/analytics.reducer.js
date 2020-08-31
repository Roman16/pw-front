import {analyticsConstants} from '../constans/actions.type';

const initialState = {
    mainState: {
        campaignId: undefined
    }
};


export function analytics(state = initialState, action) {
    switch (action.type) {
        case analyticsConstants.SET_MAIN_STATE:
            return {
                ...state,
                mainState: action.payload ? action.payload : initialState.mainState
            };

        default:
            return state;
    }
}