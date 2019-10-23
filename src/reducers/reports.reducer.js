import {reportsConstants} from '../constans/actions.type';


const initialState = {
    reports: []
};

export function reports(state = initialState, action) {
    switch (action.type) {
        case reportsConstants.SET_REPORTS_LIST:
            return {
                ...state,
                reports: action.payloadg,
            };

        default:
            return state;
    }

}