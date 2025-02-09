import {userConstants} from '../constans/actions.type'
import _ from 'lodash'
import {marketplaceIdValues} from "../constans/amazonMarketplaceIdValues"

export const defaultImportStatus = {
    analytics: {required_parts_ready: true, required_parts_details: {products: {}, sp: {}, sd: {}, orders: {}}},
    dayparting: {required_parts_ready: true, required_parts_details: {products: {}, sp: {}, sd: {}, orders: {}}},
    ppc_automate: {required_parts_ready: true, required_parts_details: {products: {}, sp: {}, sd: {}, orders: {}}},
    products_info: {required_parts_ready: true, required_parts_details: {products: {}, sp: {}, sd: {}, orders: {}}},
    zth: {required_parts_ready: true, required_parts_details: {products: {}, sp: {}, sd: {}, orders: {}}},
    subscription: {required_parts_ready: true, required_parts_details: {sp: {}}},
}

export const amazonRegionsSort = (arr) => arr.sort((a, b) => _.findIndex(Object.keys(marketplaceIdValues), key => key === a.marketplace_id) - _.findIndex(Object.keys(marketplaceIdValues), key => key === b.marketplace_id))

const initialState = {
    notFirstEntry: false,
    userDetails: {},
    plans: {},

    subscription: {
        trial: {},
        active_subscription_type: undefined,
        access: {
            analytics: false,
            optimization: false
        }
    },
    notifications: {
        ppc_optimization: {
            count_from_last_login: 0,
            last_notice_date: undefined
        }
    },
    fetchingAmazonRegionAccounts: true,
    amazonRegionAccounts: [],
    activeAmazonRegion: localStorage.getItem('activeRegion') && localStorage.getItem('activeRegion') !== 'undefined' ? JSON.parse(localStorage.getItem('activeRegion')) : null,
    activeAmazonMarketplace: localStorage.getItem('activeMarketplace') && localStorage.getItem('activeMarketplace') !== 'undefined' ? JSON.parse(localStorage.getItem('activeMarketplace')) : null,
    importStatus: localStorage.getItem('importStatus') && localStorage.getItem('importStatus') !== 'undefined' ? JSON.parse(localStorage.getItem('importStatus')) : defaultImportStatus
}

export function user(state = initialState, action) {
    switch (action.type) {
        case userConstants.SET_INFORMATION:
            localStorage.setItem('importStatus', JSON.stringify(action.payload.importStatus || state.importStatus || defaultImportStatus))

            return {
                ...state,
                ...action.payload,
                notFirstEntry: true,
                lastUserStatusAction: new Date()
            }

        case userConstants.UPDATE_USER:
            localStorage.setItem('importStatus', JSON.stringify(action.payload.importStatus || state.importStatus || defaultImportStatus))

            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    ...action.payload
                },
                importStatus: action.payload.importStatus || state.importStatus || defaultImportStatus
            }

        case userConstants.SET_AMAZON_REGION_ACCOUNTS:
            return {
                ...state,
                amazonRegionAccounts: [...action.payload.map(item => ({
                    ...item,
                    amazon_region_account_marketplaces: amazonRegionsSort(item.amazon_region_account_marketplaces)
                }))],
                activeAmazonRegion: state.activeAmazonRegion || action.payload[0] || null,
                activeAmazonMarketplace: state.activeAmazonMarketplace || action.payload[0]?.amazon_region_account_marketplaces[0] || null,
                fetchingAmazonRegionAccounts: false,
            }

        case userConstants.UPDATE_AMAZON_REGION_ACCOUNT_BY_ID:
            return {
                ...state,
                amazonRegionAccounts: [...state.amazonRegionAccounts.map(i => {
                    if (i.id === action.payload.id) {
                        return ({
                            ...i,
                            ...action.payload,
                            amazon_region_account_marketplaces: amazonRegionsSort(action.payload.amazon_region_account_marketplaces)
                        })
                    } else {
                        return i
                    }
                })]
            }
        case userConstants.SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            }

        case userConstants.ACTUALIZE_ACTIVE_REGION:
            const region = _.find(state.amazonRegionAccounts, {id: state.activeAmazonRegion?.id})
            region && localStorage.setItem('activeRegion', JSON.stringify(region))

            return {
                ...state,
                activeAmazonRegion: region || null,
            }

        case userConstants.SET_ACTIVE_REGION:
            action.payload?.marketplace ? localStorage.setItem('activeMarketplace', JSON.stringify(action.payload.marketplace)) : localStorage.removeItem('activeMarketplace')
            action.payload?.region ? localStorage.setItem('activeRegion', JSON.stringify(action.payload.region)) : localStorage.removeItem('activeRegion')

            return {
                ...state,
                activeAmazonRegion: action.payload?.region || null,
                activeAmazonMarketplace: action.payload?.marketplace || null,
                fetchingAmazonRegionAccounts: true,
            }


        default:
            return state
    }
}
