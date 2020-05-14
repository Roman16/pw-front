import {productsConstants} from '../constans/actions.type';

const initialState = {
    productList: [],
    totalSize: 0,
    fetching: false,
    isFirstOptimization: true,
    isFirstChangesOptions: true,
    isFirstChangesStrategy: true,
    dontShowStartNotificationAgain: false,
    dontShowStopNotificationAgain: false,
    selectedAll: false,
    onlyOptimization: false,
    onlyOnDayparting: false,
    onlyActiveOnAmazon: false,
    selectedProduct: {
        optimization_strategy: '',
    }
};

export function products(state = initialState, action) {
    switch (action.type) {
        case productsConstants.SET_PRODUCT_LIST:
            return {
                ...state,
                productList: action.payload.result,
                totalSize: action.payload.fetching ? state.totalSize : action.payload.totalSize,
                fetching: action.payload.fetching,
                selectedProduct: action.payload.result && action.payload.result.length > 0 ? action.payload.result[0] : {}
            };

        case productsConstants.UPDATE_SELECTED_PRODUCT:
            const newProductsList = state.productList.map(item => {
                if (item.id === action.payload.id) {
                    if (action.payload.status === "RUNNING") {
                        return {
                            ...item,
                            under_optimization: true,
                        }
                    } else {
                        return {
                            ...item,
                            under_optimization: false,
                        }
                    }
                } else if (action.payload.id === 'all') {
                    if (action.payload.status === "RUNNING") {
                        return {
                            ...item,
                            under_optimization: true,
                        }
                    } else {
                        return {
                            ...item,
                            under_optimization: false,
                        }
                    }
                } else {
                    return item
                }
            });
            return {
                ...state,
                selectedProduct: {
                    ...state.selectedProduct,
                    ...action.payload,
                    product_id: state.selectedProduct.id,
                },
                productList: newProductsList,
                isFirstOptimization: action.payload.status === 'RUNNING' ? false : state.isFirstOptimization
            };

        case productsConstants.UPDATE_PRODUCT_OPTIONS:
            return {
                ...state,
                defaultOptimizationOptions: {
                    ...state.defaultOptimizationOptions,
                    ...action.payload
                }
            };

        case productsConstants.CHANGE_OPTIONS:
            return {
                ...state,
                isFirstChangesOptions: false
            };

        case productsConstants.CHANGE_STRATEGY:
            return {
                ...state,
                isFirstChangesStrategy: false
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
                selectedAll: action.payload,
            };

        case productsConstants.SET_FETCHING_STATE:
            return {
                ...state,
                fetching: action.payload,
            };

        case productsConstants.SHOW_ONLY_OPTIMIZED:
            return {
                ...state,
                onlyOptimization: action.payload
            };
        case productsConstants.SHOW_ONLY_ON_DAYPARTING:
            return {
                ...state,
                onlyOnDayparting: action.payload
            };

        case productsConstants.SHOW_ONLY_ACTIVE:
            return {
                ...state,
                onlyActiveOnAmazon: action.payload
            };

        case productsConstants.SWITCH_START_CONFIRM_WINDOW:
            return {
                ...state,
                dontShowStartNotificationAgain: action.payload
            };

        case productsConstants.SWITCH_STOP_CONFIRM_WINDOW:
            return {
                ...state,
                dontShowStopNotificationAgain: action.payload
            };


        case productsConstants.ACTIVATED_DAYPARTING:
            return {
                ...state,
                productList: state.productList.map(item => {
                    if (item.id === action.payload) {
                        item.hasEnabledDayparting = true;
                    }

                    return item;
                })
            };

        case productsConstants.DEACTIVATED_DAYPARTING:
            return {
                ...state,
                productList: state.productList.map(item => {
                    if (item.id === action.payload) {
                        item.hasEnabledDayparting = false;
                    }

                    return item;
                })
            };

        case productsConstants.CAMPAIGN_BUDGET:
            return {
                ...state,
                productList: state.productList.map(item => {
                    if (item.id === action.payload.id) {
                        item = {...item, ...action.payload}
                    }

                    return item;
                }),
                selectedProduct: {
                    ...state.selectedProduct,
                    dailyBudget: action.payload.dailyBudget
                }
            };

        default:
            return state;
    }

}
