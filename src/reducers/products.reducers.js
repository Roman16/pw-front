import {productsConstants} from '../constans/request.types';

export function products(state = {}, action) {
    switch (action.type) {
        case productsConstants.SET_PRODUCT_LIST:
            return {
                ...action.payload
            };

        case productsConstants.UPDATE_PRODUCT_DATA:
            return {
                ...state,
                ...action.payload
            };

            case productsConstants.SELECT_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload
            };

        default:
            return state;
    }

}