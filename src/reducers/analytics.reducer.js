import {analyticsConstants} from '../constans/actions.type'
import moment from "moment"
import {metricsListArray} from "../constans/metricsList"

const metricsWithoutOrganic = metricsListArray.filter(
    metric => metric.key !== 'macos' &&
        metric.key !== 'organic_sales' &&
        metric.key !== 'organic_orders'
    ),
    metricsForTargetingsPanel = metricsWithoutOrganic.filter(metric => metric.key !== 'ad_profit')

const metricsStateFromLocalStorage = localStorage.getItem('analyticsMetricsState') && JSON.parse(localStorage.getItem('analyticsMetricsState'))


const initialState = {
    location: 'products',
    mainState: {
        campaignId: undefined,
        productId: undefined,
        adGroupId: undefined,
        portfolioId: undefined,
    },
    metricsState: metricsStateFromLocalStorage ? metricsStateFromLocalStorage : {
        'products': {
            allMetrics: metricsListArray,
            activeMetrics: metricsListArray.slice(0, 2),
            selectedMetrics: metricsListArray.slice(0, 5)
        },
        'portfolios': {
            allMetrics: metricsWithoutOrganic,
            activeMetrics: metricsWithoutOrganic.slice(0, 2),
            selectedMetrics: metricsWithoutOrganic.slice(0, 5)
        },
        'campaigns': {
            allMetrics: metricsWithoutOrganic,
            activeMetrics: metricsWithoutOrganic.slice(0, 2),
            selectedMetrics: metricsWithoutOrganic.slice(0, 5)
        },
        'placements': {
            allMetrics: metricsWithoutOrganic,
            activeMetrics: metricsWithoutOrganic.slice(0, 2),
            selectedMetrics: metricsWithoutOrganic.slice(0, 5)
        },
        'adGroups': {
            allMetrics: metricsWithoutOrganic,
            activeMetrics: metricsWithoutOrganic.slice(0, 2),
            selectedMetrics: metricsWithoutOrganic.slice(0, 5)
        },
        'targetings': {
            allMetrics: metricsForTargetingsPanel,
            activeMetrics: metricsForTargetingsPanel.slice(0, 2),
            selectedMetrics: metricsForTargetingsPanel.slice(0, 5)
        },
        'negativeTargetings': {
            allMetrics: metricsWithoutOrganic,
            activeMetrics: metricsWithoutOrganic.slice(0, 2),
            selectedMetrics: metricsWithoutOrganic.slice(0, 5)
        },
        'productAds': {
            allMetrics: metricsWithoutOrganic,
            activeMetrics: metricsWithoutOrganic.slice(0, 2),
            selectedMetrics: metricsWithoutOrganic.slice(0, 5)
        },
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

        case analyticsConstants.UPDATE_METRICS_STATE:
            localStorage.setItem('analyticsMetricsState', JSON.stringify({
                ...state.metricsState,
                [state.location]: {
                    ...state.metricsState[state.location],
                    ...action.payload
                }
            }))

            return {
                ...state,
                metricsState: {
                    ...state.metricsState,
                    [state.location]: {
                        ...state.metricsState[state.location],
                        ...action.payload
                    }
                }
            }

        default:
            return state
    }
}