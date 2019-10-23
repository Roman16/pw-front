import {productsConstants} from '../constans/actions.type';

const defaultOptions = {
    optimization_strategy: 'BoostOverallProfit',
    add_negative_keywords: true,
    optimize_keywords: true,
    create_new_keywords: true,
    optimize_pats: true,
    add_negative_pats: true,
    create_new_pats: true,
};

const initialState = {
    productList: [],
    totalSize: 0,
    selectedAll: false,
    defaultOptimizationOptions: defaultOptions,
    selectedProduct: {
        optimization_strategy: '',
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

        case productsConstants.UPDATE_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload
            };

        case productsConstants.UPDATE_PRODUCT_OPTIONS:
            return {
                ...state,
                defaultOptimizationOptions: {
                    ...state.defaultOptimizationOptions,
                    ...action.payload
                }
            };

        case productsConstants.SELECT_PRODUCT:
            return {
                ...state,
                selectedAll: false,
                selectedProduct: action.payload ? action.payload : state.selectedProduct
            };

        case productsConstants.SELECT_ALL_PRODUCT:
            return {
                ...state,
                selectedAll: !state.selectedAll,
                selectedProduct: {
                    ...action.payload,
                },
            };

        default:
            return state;
    }

}