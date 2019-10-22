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
                    optimization_strategy: action.payload.optimization_strategy || state.defaultOptimizationOptions.optimization_strategy,
                    add_negative_keywords: action.payload.add_negative_keywords || state.defaultOptimizationOptions.add_negative_keywords,
                    optimize_keywords: action.payload.optimize_keywords || state.defaultOptimizationOptions.optimize_keywords,
                    create_new_keywords: action.payload.create_new_keywords || state.defaultOptimizationOptions.create_new_keywords,
                    optimize_pats: action.payload.optimize_pats || state.defaultOptimizationOptions.optimize_pats,
                    add_negative_pats: action.payload.add_negative_pats || state.defaultOptimizationOptions.add_negative_pats,
                    create_new_pats: action.payload.create_new_pats || state.defaultOptimizationOptions.create_new_pats
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