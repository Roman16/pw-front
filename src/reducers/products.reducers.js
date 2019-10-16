import {productsConstants} from '../constans/request.types';

export function products(state = {}, action) {
    switch (action.type) {
        case productsConstants.SET_PRODUCT_LIST:
            return {
                ...action.payload
            };
            break;

        default:
            return state;
            break;
    }

}