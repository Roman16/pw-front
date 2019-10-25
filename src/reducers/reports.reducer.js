import {reportsConstants} from '../constans/actions.type';


const initialState = {
    counts: [],
    data: [],
    totalSize: 0,
    loading: false
};

export function reports(state = initialState, action) {
    switch (action.type) {
        case reportsConstants.START_FETCH_REPORTS_LIST:
            return {
                ...state,
                loading: true
            };

        case reportsConstants.SET_REPORTS_LIST:
            return {
                ...state,
                ...action.payload,
                loading: false
            };

        default:
            return state;
    }

}