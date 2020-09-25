import {analyticsConstants} from '../constans/actions.type'
import moment from "moment"
import {metricsListArray} from "../constans/metricsList"

// const metricsWithoutOrganic = metricsListArray.filter(
//     metric => metric.key !== 'total_orders' &&
//         metric.key !== 'total_orders_pure' &&
//         metric.key !== 'organic_orders' &&
//         metric.key !== 'total_sales' &&
//         metric.key !== 'organic_sales' &&
//         metric.key !== 'total_units' &&
//         metric.key !== 'total_units_pure' &&
//         metric.key !== 'profit' &&
//         metric.key !== 'macos' &&
//         metric.key !== 'returns' &&
//         metric.key !== 'returns_units'
//     ),
//     metricsForTargetingsPanel = metricsWithoutOrganic.filter(metric => metric.key !== 'ad_profit')

const metricsStateFromLocalStorage = localStorage.getItem('analyticsMetricsState') && JSON.parse(localStorage.getItem('analyticsMetricsState')),
    columnsBlackListFromLocalStorage = localStorage.getItem('columnsBlackList') && JSON.parse(localStorage.getItem('columnsBlackList')),
    filtersListFromLocalStorage = localStorage.getItem('filtersList') && JSON.parse(localStorage.getItem('filtersList'))


const initialState = {
    location: 'products',
    mainState: {
        campaignId: undefined,
        productId: undefined,
        adGroupId: undefined,
        portfolioId: undefined,
    },
    metricsState: metricsStateFromLocalStorage ? metricsStateFromLocalStorage : undefined,
    chartState: {
        showWeekChart: true,
        showDailyChart: true,
        showOptimizationChart: true
    },
    columnsBlackList: columnsBlackListFromLocalStorage ? columnsBlackListFromLocalStorage : {
        'products': [],
        'portfolios': [],
        'campaigns': [],
        'placements': [],
        'adGroups': [],
        'targetings': [],
        'negativeTargetings': [],
        'productAds': []
    },
    filters: filtersListFromLocalStorage ? filtersListFromLocalStorage : {
        'products': [],
        'portfolios': [],
        'campaigns': [],
        'placements': [],
        'adGroups': [],
        'targetings': [],
        'negativeTargetings': [],
        'productAds': []
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

        case analyticsConstants.UPDATE_METRICS_STATE:
            localStorage.setItem('analyticsMetricsState', JSON.stringify({
                ...state.metricsState,
                [state.location]: action.payload
            }))

            return {
                ...state,
                metricsState: {
                    ...state.metricsState,
                    [state.location]: action.payload
                }
            }

        case analyticsConstants.SET_COLUMNS_BLACK_LIST:
            localStorage.setItem('columnsBlackList', JSON.stringify({
                ...state.columnsBlackList,
                [state.location]: action.payload
            }))

            return {
                ...state,
                columnsBlackList: {
                    ...state.columnsBlackList,
                    [state.location]: action.payload
                }
            }

        case analyticsConstants.SET_FILTERS_LIST:
            localStorage.setItem('filtersList', JSON.stringify({
                ...state.filters,
                [state.location]: action.payload
            }))

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [state.location]: action.payload
                }
            }


        default:
            return state
    }
}