import {analyticsConstants} from '../constans/actions.type'
import moment from "moment"
import _ from 'lodash'
import {metricsListArray} from "../constans/metricsList"

const metricsStateFromLocalStorage = localStorage.getItem('analyticsMetricsState') && JSON.parse(localStorage.getItem('analyticsMetricsState')),
    columnsBlackListFromLocalStorage = localStorage.getItem('analyticsColumnsBlackList') && JSON.parse(localStorage.getItem('analyticsColumnsBlackList')),
    filtersListFromLocalStorage = localStorage.getItem('analyticsFiltersList') && JSON.parse(localStorage.getItem('analyticsFiltersList')),
    chartStateFromLocalStorage = localStorage.getItem('analyticsChartState') && JSON.parse(localStorage.getItem('analyticsChartState')),
    rangeDateFromLocalStorage = localStorage.getItem('rangeDate') && JSON.parse(localStorage.getItem('rangeDate'))

const workplacesList = {
    'products': [],
    'portfolios': [],
    'campaigns': [],
    'placements': [],
    'adGroups': [],
    'targetings': [],
    'negativeTargetings': [],
    'productAds': []
}


export const metricsWithoutOrganic = metricsListArray.filter(
    metric => metric.key !== 'total_orders' &&
        metric.key !== 'total_orders_pure' &&
        metric.key !== 'organic_orders' &&
        metric.key !== 'total_sales' &&
        metric.key !== 'organic_sales' &&
        metric.key !== 'total_units' &&
        metric.key !== 'total_units_pure' &&
        metric.key !== 'profit' &&
        metric.key !== 'macos' &&
        metric.key !== 'returns' &&
        metric.key !== 'returns_units'
)
export const metricsForTargetingsPanel = metricsWithoutOrganic.filter(metric => metric.key !== 'ad_profit')


const initialState = {
    location: 'products',
    mainState: {
        campaignId: undefined,
        productId: undefined,
        adGroupId: undefined,
        portfolioId: undefined,
    },
    metricsState: metricsStateFromLocalStorage ? metricsStateFromLocalStorage : _.mapValues(workplacesList, (value, key) => {
        const allAvailableMetrics = key === 'targetings' ? [...metricsForTargetingsPanel] : key === 'products' ? [...metricsListArray] : [...metricsWithoutOrganic]

        return ({
            allMetrics: allAvailableMetrics,
            selectedMetrics: allAvailableMetrics.slice(0, 5),
            activeMetrics: allAvailableMetrics.slice(0, 2),
        })
    }),
    chartState: chartStateFromLocalStorage ? chartStateFromLocalStorage : _.mapValues(workplacesList, () => ({
        showWeekChart: true,
        showDailyChart: true,
        showOptimizationChart: true,
        selectFourMetrics: false
    })),
    columnsBlackList: columnsBlackListFromLocalStorage ? columnsBlackListFromLocalStorage : workplacesList,
    filters: filtersListFromLocalStorage ? filtersListFromLocalStorage : workplacesList,
    selectedRangeDate: rangeDateFromLocalStorage ? rangeDateFromLocalStorage : {
        startDate: moment().add(-29, 'days').toISOString(),
        endDate: moment().toISOString()
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
            localStorage.setItem('analyticsChartState', JSON.stringify({
                ...state.chartState,
                [state.location]: action.payload
            }))

            return {
                ...state,
                chartState: {
                    ...state.chartState,
                    [state.location]: action.payload
                }
            }

        case analyticsConstants.SET_DATE_RANGE:
            console.log(action.payload)
            localStorage.setItem('rangeDate', JSON.stringify(action.payload))

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
            localStorage.setItem('analyticsColumnsBlackList', JSON.stringify({
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
            localStorage.setItem('analyticsFiltersList', JSON.stringify({
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