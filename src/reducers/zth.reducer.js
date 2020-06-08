import {zthConstants} from '../constans/actions.type';
import moment from "moment";
import tz from 'moment-timezone';

const initialProductSettings = {
    portfolio: {
        portfolioType: 'create',
        no_portfolio: false
    },
    campaigns: {
        start_date: moment.tz(`${moment(new Date()).format('YYYY-MM-DD')} ${moment().startOf('day').format('HH:mm:ss')}`, 'America/Los_Angeles').toISOString(),
        set_to_paused: false,
        main_keywords: [],
        bidding_strategy: 'DYNAMIC_BIDS_DOWN_ONLY',
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
                productAmount: action.payload
            };

        case zthConstants.ADD_PRODUCTS:
            return {
                ...state,
                selectedProducts: [...state.selectedProducts, ...action.payload].filter(filterItem => ![...state.selectedProducts, ...action.payload].find(findItem => findItem.id === filterItem.parent_id)),
                productAmount: [...state.selectedProducts, ...action.payload].length > state.productAmount ? [...state.selectedProducts, ...action.payload].length : state.productAmount,
                selectedProductsWithSettingsParams: [...state.selectedProducts, ...action.payload].filter(filterItem => ![...state.selectedProducts, ...action.payload].find(findItem => findItem.id === filterItem.parent_id)).map(item => ({product_id: item.id, ...initialProductSettings}))
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
                productAmount: action.payload.available_tokens
            };

        default:
            return state;
    }
}