import {analyticsConstants} from '../constans/actions.type'
import moment from "moment"
import _ from 'lodash'

const metricsStateFromLocalStorage = localStorage.getItem('analyticsMetricsState') && JSON.parse(localStorage.getItem('analyticsMetricsState')),
    filtersListFromLocalStorage = localStorage.getItem('analyticsFiltersList') && JSON.parse(localStorage.getItem('analyticsFiltersList')),
    chartStateFromLocalStorage = localStorage.getItem('analyticsChartState') && JSON.parse(localStorage.getItem('analyticsChartState')),
    rangeDateFromLocalStorage = localStorage.getItem('analyticsRangeDate') && JSON.parse(localStorage.getItem('analyticsRangeDate')),
    sortingColumnFromLocalStorage = localStorage.getItem('analyticsSortingColumn') && JSON.parse(localStorage.getItem('analyticsSortingColumn'))

const workplacesList = {
    'overview': [],
    'products': [],
    'products-parents': [],
    'products-regular': [],
    'portfolios': [],
    'campaigns': [],
    'placements': [],
    'searchTerms': [],
    'ad-groups': [],
    'targetings': [],
    'negative-targetings': [],
    'product-ads': [],
}

const defaultChartOptionsValues = {
    showWeekChart: true,
    showDailyChart: true,
    showOptimizationChart: true,
    selectFourMetrics: false,
}


const initialState = {
    location: undefined,
    visibleChart: localStorage.getItem('analyticsViewChart') ? JSON.parse(localStorage.getItem('analyticsViewChart')) : true,
    sortingColumns: sortingColumnFromLocalStorage ? sortingColumnFromLocalStorage : {},
    placementSegment: localStorage.getItem('placementSegmentValue') ? JSON.parse(localStorage.getItem('placementSegmentValue')) : null,
    visibleNavigation: true,
    visibleCreationWindows: {
        campaign: false,
        portfolio: false,
        negativeTargetings: false,
    },
    mainState: {
        campaignId: undefined,
        productId: undefined,
        adGroupId: undefined,
        portfolioId: undefined,
        name: {}
    },
    stateDetails: {},
    metricsData: {},
    metricsState: metricsStateFromLocalStorage ? metricsStateFromLocalStorage : _.mapValues(workplacesList, (value, key) => {
        return ({
            selectedMetrics: undefined,
            activeMetrics: undefined,
        })
    }),
    chartState: chartStateFromLocalStorage ? chartStateFromLocalStorage : _.mapValues(workplacesList, () => ({...defaultChartOptionsValues})),
    filters: filtersListFromLocalStorage ? filtersListFromLocalStorage : workplacesList,
    selectedRangeDate: rangeDateFromLocalStorage ? rangeDateFromLocalStorage : {
        startDate: moment().add(-29, 'days').toISOString(),
        endDate: moment().toISOString()
    },
    portfolioList: [],
    attributionWindow: localStorage.getItem('attributionWindow') || '7'
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
            localStorage.setItem('analyticsRangeDate', JSON.stringify(action.payload))

            return {
                ...state,
                selectedRangeDate: action.payload
            }

        case analyticsConstants.SET_CHART_VIEW:
            localStorage.setItem('analyticsViewChart', JSON.stringify(action.payload))

            return {
                ...state,
                visibleChart: action.payload
            }

        case analyticsConstants.SET_WORKPLACE_VIEW:
            return {
                ...state,
                visibleChart: action.payload,
                visibleNavigation: action.payload,
            }

        case analyticsConstants.SET_LOCATION:
            if (state.visibleNavigation === false) localStorage.setItem('analyticsViewChart', JSON.stringify(true))

            return {
                ...state,
                location: action.payload,
                visibleNavigation: true,
            }

        case analyticsConstants.SET_METRICS_DATA:
            return {
                ...state,
                metricsData: action.payload
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

        case analyticsConstants.SET_FILTERS_LIST:
            localStorage.setItem('analyticsFiltersList', JSON.stringify({
                ...state.filters,
                [state.location]: action.payload
            }))

            if (JSON.stringify(action.payload) !== JSON.stringify(state.filters[state.location])) {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        [state.location]: action.payload
                    }
                }
            }

        case analyticsConstants.SET_SEGMENT_VALUE:
            localStorage.setItem('placementSegmentValue', JSON.stringify(action.payload))

            return {
                ...state,
                placementSegment: action.payload
            }

        case analyticsConstants.SET_STATE_DETAILS:
            return {
                ...state,
                stateDetails: action.payload
            }

        case analyticsConstants.SET_VISIBLE_CREATION_WINDOWS:
            return {
                ...state,
                visibleCreationWindows: {
                    ...state.visibleCreationWindows,
                    ...action.payload
                }
            }

        case analyticsConstants.SET_PORTFOLIOS:
            return {
                ...state,
                portfolioList: action.payload
            }

        case analyticsConstants.SET_ATTRIBUTION_WINDOW:
            localStorage.setItem('attributionWindow', action.payload)

            return {
                ...state,
                attributionWindow: action.payload
            }

        default:
            return state
    }
}
