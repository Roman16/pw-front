import { SET_PRODUCT_LIST, SET_TOTAL_PRODUCT, SET_ACTIVE_PRODUCT } from './action';

const defaultState = {
    productList: [],
    totalProduct: 0,
    activeProductId: null,
};

const PPCReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_PRODUCT_LIST:
            return {
                ...state,
                productList: action.productList,
            };
        case SET_ACTIVE_PRODUCT:
            return {
                ...state,
                activeProductId: action.activeProductId,
            };
        case SET_TOTAL_PRODUCT:
            return {
                ...state,
                totalProduct: action.totalProduct,
            };
        default:
            return state;
    }
};

export default PPCReducer;
