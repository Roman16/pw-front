import {reportsConstants} from '../constans/actions.type';



const initialState = {

};

export function products(state = initialState, action) {
    switch (action.type) {
        case reportsConstants.SET_REPORTS_LIST:
            return {
                ...state,
                productList: action.payload.productList,
                totalSize: action.payload.totalSize
            };

        default:
            return state;
    }

}