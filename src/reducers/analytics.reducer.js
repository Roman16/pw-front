import {analyticsConstants} from '../constans/actions.type'
import moment from "moment"

const initialState = {
    location: 'products',
    mainState: {
        campaignId: undefined,
        productId: undefined,
        adGroupId: undefined,
        portfolioId: undefined,
    },
    chartState: {
        showWeekChart: true,
        showDailyChart: true,
        showOptimizationChart: true
    },
    selectedRangeDate: {
        startDate: moment().add(-29, 'days'),
        endDate: moment()
    }
}


export function analytics(state = initialState, action) {
    switch (action.type) {
        case analyticsConstants.SET_MAIN_STATE:
            return {
                ...state,
                mainState: action.payload ? action.payload : initialState.mainState
            }

        case analyticsConstants.SET_CHART_STATE:
            return {
                ...state,
                chartState: {...state.chartState, ...action.payload}
            }

        case analyticsConstants.SET_DATE_RANGE:
            return {
                ...state,
                selectedRangeDate: action.payload
            }
        case analyticsConstants.SET_LOCATION:
            return {
                ...state,
                location: action.payload
            }

        default:
            return state
    }
}