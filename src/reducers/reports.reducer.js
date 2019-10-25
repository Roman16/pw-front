import {reportsConstants} from '../constans/actions.type';

const initialState = {
    counts:
        {
            'keywords-optimization': {
                subtypesCounts: {
                    'changed-keyword-bid-acos': 0,
                    'changed-keyword-bid-impressions': 0,
                    'paused-keyword-high-acos': 0,
                    'paused-keyword-no-sales': 0,
                }
            },
            'pats-optimization': {
                subtypesCounts: {
                    'changed-pat-bid-acos': 0,
                    'changed-pat-bid-impressions': 0,
                    'paused-manual-pat-high-acos': 0,
                    'paused-manual-pat-no-sales': 0,
                }
            },
            'new-keywords': {
                subtypesCounts: {
                    'created-campaign': 0,
                    'created-ad-group': 0,
                    'created-product-ad': 0,
                    'created-cross-negative-keyword': 0,
                    'created-keyword-cst': 0,
                }
            },
            'new-negative-keywords': {
                subtypesCounts: {
                    'created-negative-keyword-from-cst-high-acos': 0,
                    'created-negative-keyword-from-cst-no-sales': 0,
                }
            },
            'new-pats': {
                subtypesCounts: {
                    'created-cross-negative-pat': 0,
                    'created-pat-cst': 0,
                }
            },
            'new-negative-pats': {
                subtypesCounts: {
                    'created-negative-pat-from-cst-high-acos': 0,
                    'created-negative-pat-from-cst-no-sales': 0,
                }
            }
        },
    data: [],
    totalSize: 0,
    loading: false
};

export function reports(state = initialState, action) {
    switch (action.type) {
        case reportsConstants.START_FETCH_REPORTS_LIST:
            return {
                ...state,
                loading: true
            };

        case reportsConstants.SET_REPORTS_LIST:
            return {
                ...state,
                ...action.payload,
                loading: false
            };

        default:
            return state;
    }

}