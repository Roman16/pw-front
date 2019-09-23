import {
    SET_PRODUCT_LIST, SET_TOTAL_PRODUCT, SET_ACTIVE_PRODUCT, SET_PRODUCT_ID_DATA,
    SET_PRODUCT_CHANGE_DATA, CHANGE_INVAILD_ERROR, CHANGE_PRODUCT_LIST,
} from './action';

const defaultState = {
    productList: [],
    totalProduct: 0,
    activeProductId: null,
    inValidError: false,
    lastChanges: [],
    dataProductId: {},
};

const PPCReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_PRODUCT_LIST:
            return {
                ...state,
                productList: action.productList,
            };
        case CHANGE_PRODUCT_LIST:

            // eslint-disable-next-line no-case-declarations
            const updatedList = [...state.productList];

            updatedList[action.activeProductIndex] = { ...action.updatedProductItem };


            return {
                ...state,
                productList: updatedList,
            };
        case CHANGE_INVAILD_ERROR:
            return {
                ...state,
                inValidError: action.status,
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
        case SET_PRODUCT_ID_DATA:
            console.log(action.data);


            return {
                ...state,
                dataProductId: {
                    ...state.dataProductId,
                    ...action.data,
                },
            };
        case SET_PRODUCT_CHANGE_DATA:
            console.log(action.data);


            return {
                ...state,
                lastChanges: [
                    ...action.data,
                ],
            };
        default:
            return state;
    }
};

export default PPCReducer;
