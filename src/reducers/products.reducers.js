import {productsConstants} from '../constans/actions.type';

const initialState = {
    productList: [],
    totalSize: 0,
    selectedProduct: {
        optimization_strategy: ''
    }
};

export function products(state = initialState, action) {
    switch (action.type) {
        case productsConstants.SET_PRODUCT_LIST:
            return {
                ...state,
                productList: action.payload.productList,
                totalSize: action.payload.totalSize
            };

        case productsConstants.UPDATE_PRODUCT_DATA:
            return {
                ...state,
                ...action.payload
            };

        case productsConstants.SELECT_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload ? action.payload : state.selectedProduct
            };

        case productsConstants.UPDATE_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: {
                    ...state.selectedProduct,
                    ...action.payload,
                    id: action.payload.product_id ? action.payload.product_id : state.selectedProduct.id
                }
            };

        default:
            return state;
    }

}