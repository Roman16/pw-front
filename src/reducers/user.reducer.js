import {userConstants} from '../constans/actions.type'

const defaultImportStatus = {
    analytics: {required_parts_ready: false},
    dayparting: {required_parts_ready: false},
    ppc_automate: {required_parts_ready: false},
    products_info: {required_parts_ready: false},
    zth: {required_parts_ready: false},
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
    importStatus: localStorage.getItem('importStatus') ? JSON.parse(localStorage.getItem('importStatus')) : defaultImportStatus
}

export function user(state = initialState, action) {
    switch (action.type) {
        case userConstants.SET_INFORMATION:
            localStorage.setItem('importStatus', JSON.stringify(action.payload.importStatus || defaultImportStatus))

            return {
                ...initialState,
                ...action.payload,
                notFirstEntry: true,
                lastUserStatusAction: new Date()
            }

        case userConstants.UPDATE_USER:
            localStorage.setItem('importStatus', JSON.stringify(action.payload.importStatus || defaultImportStatus))

            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            }

        case userConstants.RESET_CHANGES_COUNT:
            return {
                ...state,
                notifications: {
                    ...state.notifications,

                    [action.payload]: {
                        ...state.notifications[action.payload],
                        count_from_last_login: 0
                    }
                }
            }

        case userConstants.SET_PPC_STATUS:
            return {
                ...state,
                account_links: [{
                    ...state.account_links[0],
                    amazon_ppc: {
                        ...state.account_links[0].amazon_ppc,
                        is_connected: true,
                        ...action.payload
                    }
                }]
            }

        case userConstants.SET_BOOTSTRAP:
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    account_bootstrap: {
                        bootstrap_in_progress: action.payload
                    }
                }
            }

        case userConstants.UNSET_AMAZON_MWS:
            return {
                ...state,
                account_links: [{
                    ...state.account_links[0],
                    amazon_mws: {
                        ...state.account_links[0].amazon_mws,
                        is_connected: false,
                        status: null
                    }
                }],
                default_accounts: {
                    ...state.default_accounts,
                    amazon_mws: {
                        seller_id: null
                    }
                }
            }

        case userConstants.UNSET_AMAZON_PPC:
            return {
                ...state,
                account_links: [{
                    ...state.account_links[0],
                    amazon_ppc: {
                        ...state.account_links[0].amazon_ppc,
                        is_connected: false,
                        status: null
                    }
                }],
                default_accounts: {
                    ...state.default_accounts,
                    amazon_ppc: {
                        seller_id: null
                    }
                }
            }

        default:
            return state
    }
}
