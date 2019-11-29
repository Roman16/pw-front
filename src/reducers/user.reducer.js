import {userConstants} from '../constans/actions.type';

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
    default_accounts: {}
};

export function user(state = initialState, action) {
    switch (action.type) {
        case userConstants.SET_INFORMATION:
            return {
                ...state,
                ...action.payload,
                notFirstEntry: true
            };

        case userConstants.UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };

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
            };

        case userConstants.UNSET_AMAZON_MWS:
            return {
                ...state,
                account_links: {
                    ...state.account_links,
                    amazon_mws: {
                        ...state.account_links.amazon_mws,
                        is_connected: false
                    }
                }
            };

        case userConstants.UNSET_AMAZON_PPC:
            return {
                ...state,
                account_links: {
                    ...state.account_links,
                    amazon_ppc: {
                        ...state.account_links.amazon_ppc,
                        is_connected: false
                    }
                }
            };

        default:
            return state;
    }
}
