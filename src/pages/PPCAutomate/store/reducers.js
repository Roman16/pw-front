import { SET_PRODUCT_LIST } from './action';

const defaultState = {
    productList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

const PPCReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_PRODUCT_LIST:
            return {
                ...state,
                productList: action.productList,
            };
        default:
            return state;
    }
};

export default PPCReducer;
