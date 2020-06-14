import {zthConstants} from '../constans/actions.type';
import moment from "moment";
import tz from 'moment-timezone';

const initialProductSettings = {
    portfolio: {
        type: 'CreateNew',
        no_portfolio: false
    },
    campaigns: {
        start_date: moment.tz(`${moment(new Date()).format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString(),
        set_to_paused: false,
        main_keywords: [],
        bidding_strategy: 'legacyForSales',
        adjust_bid_by_placements: {}
    },
    brand: {
        competitor_brand_names: []
    },
    relevant_keywords: [],
    negative_keywords: []
};

const initialState = {
    selectedCampaign: 'Sponsored Products',
    productAmount: 1,
    productSliderType: 'soft',
    selectedProducts: [],
    selectedProductsWithSettingsParams: [],
    activeProductIndex: 0,
    paidBatch: {
        available_tokens: null
    },
    invalidField: {
        productIndex: null,
        field: ''
    }
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
                productAmount: action.payload,
                productSliderType: 'user'
            };

        case zthConstants.ADD_PRODUCTS:
            return {
                ...state,
                selectedProducts: [...state.selectedProducts, ...action.payload].filter(filterItem => ![...state.selectedProducts, ...action.payload].find(findItem => findItem.id === filterItem.parent_id)),
                selectedProductsWithSettingsParams: [...state.selectedProducts, ...action.payload].filter(filterItem => ![...state.selectedProducts, ...action.payload].find(findItem => findItem.id === filterItem.parent_id)).map(item => ({product_id: item.id, ...initialProductSettings})),
                ...[...state.selectedProducts, ...action.payload].length > state.productAmount && {
                    productAmount: [...state.selectedProducts, ...action.payload].length,
                    productSliderType: 'soft'
                }
            };

        case zthConstants.REMOVE_PRODUCTS:
            if (action.payload === 'all') {
                return {
                    ...state,
                    selectedProducts: [],
                    selectedProductsWithSettingsParams: [],
                    activeProductIndex: 0,
                    ...state.productSliderType === 'soft' && {productAmount: 1}
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
                    ...state.productSliderType === 'soft' && {productAmount: nevList.length || 1},
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

        case zthConstants.SET_INVALID_FIELD:
            return {
                ...state,
                invalidField: action.payload,
                ...action.payload.productIndex !== null && {activeProductIndex: action.payload.productIndex}
            };

        case zthConstants.SET_PAID_BATCH:
            return {
                ...state,
                paidBatch: action.payload,
                productAmount: action.payload.available_tokens === 0 ? 1 : action.payload.available_tokens
            };


        case zthConstants.CLEAR_SETTINGS:
            return {
                ...initialState
            };

        default:
            return state;
    }
}