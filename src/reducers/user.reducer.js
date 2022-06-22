import {userConstants} from '../constans/actions.type'

export const defaultImportStatus = {
    analytics: {required_parts_ready: true, required_parts_details: {products: {}, sp: {}, sd: {}, orders: {}}},
    dayparting: {required_parts_ready: true, required_parts_details: {products: {}, sp: {}, sd: {}, orders: {}}},
    ppc_automate: {required_parts_ready: true, required_parts_details: {products: {}, sp: {}, sd: {}, orders: {}}},
    products_info: {required_parts_ready: true, required_parts_details: {products: {}, sp: {}, sd: {}, orders: {}}},
    zth: {required_parts_ready: true, required_parts_details: {products: {}, sp: {}, sd: {}, orders: {}}},
    subscription: {required_parts_ready: true, required_parts_details: {sp: {}}},
}

const initialState = {
    notFirstEntry: false,
    user: {},
    plans: {},
    account_links: [{
        amazon_mws: {
            is_connected: false
        },
        amazon_ppc: {
            is_connected: false
        },
    }],
    default_accounts: {},

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
    amazonRegionAccounts: [],
    fetchingAmazonRegionAccounts: true,
    activeAmazonRegion: localStorage.getItem('activeRegion')  ? JSON.parse(localStorage.getItem('activeRegion')) : undefined,
    activeAmazonMarketplace: localStorage.getItem('activeMarketplace')  ? JSON.parse(localStorage.getItem('activeMarketplace')) : undefined,
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
                user: {
                    ...state.user,
                    ...action.payload
                },
                importStatus: action.payload.importStatus || state.importStatus || defaultImportStatus
            }

        case userConstants.SET_AMAZON_REGION_ACCOUNTS:
            return {
                ...state,
                amazonRegionAccounts: [...action.payload],
                fetchingAmazonRegionAccounts: false
            }

        case userConstants.SET_ACTIVE_REGION:
            localStorage.setItem('activeMarketplace', JSON.stringify(action.payload.marketplace))
            localStorage.setItem('activeRegion', JSON.stringify(action.payload.region))

            return {
                ...state,
                activeAmazonRegion: action.payload.region,
                activeAmazonMarketplace: action.payload.marketplace
            }


        default:
            return state
    }
}
