import {zthConstants} from '../constans/actions.type';

const initialState = {
    selectedCampaign: '',
    productAmount: 1
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

        default:
            return state;
    }
}