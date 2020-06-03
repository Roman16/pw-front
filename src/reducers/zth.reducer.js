import {zthConstants} from '../constans/actions.type';

const initialState = {
    selectedCampaign: 'Sponsored Products',
    productAmount: 1,
    selectedProducts: [],
    selectedProductsWithSettingsParams: [],
    activeProductIndex: 0
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
                selectedProducts: [...state.selectedProducts, ...action.payload].filter(filterItem => ![...state.selectedProducts, ...action.payload].find(findItem => findItem.id === filterItem.parent_id)),
                productAmount: [...state.selectedProducts, ...action.payload].length > state.productAmount ? [...state.selectedProducts, ...action.payload].length : state.productAmount,
                selectedProductsWithSettingsParams: [...state.selectedProducts, ...action.payload].filter(filterItem => ![...state.selectedProducts, ...action.payload].find(findItem => findItem.id === filterItem.parent_id)).map(item => ({id: item.id}))
            };

        case zthConstants.REMOVE_PRODUCTS:
            if (action.payload === 'all') {
                return {
                    ...state,
                    selectedProducts: [],
                    selectedProductsWithSettingsParams: [],
                    activeProductIndex: 0
                };
            } else {
                const nevList = [...state.selectedProducts],
                    newListWithSettings = [...state.selectedProductsWithSettingsParams]
                nevList.splice(action.payload, 1);
                newListWithSettings.splice(action.payload, 1);

                return {
                    ...state,
                    selectedProducts: [...nevList],
                    selectedProductsWithSettingsParams: [...newListWithSettings],
                    activeProductIndex: 0
                };
            }

        case zthConstants.SET_ACTIVE_PRODUCT:
            return {
                ...state,
                activeProductIndex: action.payload
            };

        case zthConstants.UPDATE_ACTIVE_PRODUCT:
            return {
                ...state,
                selectedProductsWithSettingsParams: state.selectedProductsWithSettingsParams.map(((product, index) => {
                    if (index === state.activeProductIndex) {
                        product = {
                            ...product,
                            ...action.payload
                        }
                    }

                    return product;
                }))
            };

        default:
            return state;
    }
}