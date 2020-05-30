import {zthConstants} from '../constans/actions.type';

const initialState = {
    selectedCampaign: '',
    productAmount: 1,
    selectedProducts: []
};

export function zth(state = initialState, action) {
    switch (action.type) {
        case zthConstants.SET_CAMPAIGN:
            return {
                ...state,
                selectedCampaign: action.payload
            };

        case zthConstants.SET_PRODUCT_AMOUNT:
            return {
                ...state,
                productAmount: action.payload
            };

        case zthConstants.ADD_PRODUCTS:
            return {
                ...state,
                selectedProducts: [...state.selectedProducts, ...action.payload],
                productAmount: [...state.selectedProducts, ...action.payload].length > state.productAmount ? [...state.selectedProducts, ...action.payload].length : state.productAmount
            };

        case zthConstants.REMOVE_PRODUCTS:
            if (action.payload === 'all') {
                return {
                    ...state,
                    selectedProducts: []
                };
            } else {
                const nevList = [...state.selectedProducts];
                nevList.splice(action.payload, 1);

                return {
                    ...state,
                    selectedProducts: [...nevList]
                };
            }

        default:
            return state;
    }
}