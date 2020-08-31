import {dashboardConstants} from '../constans/actions.type'
import {metricsListArray} from '../pages/PPCAutomate/Dashboard/Metrics/metricsList'
import moment from 'moment'

let metricClickCount = 0

const metricsFromLocalStorage = localStorage.getItem('selectedMetrics') && JSON.parse(localStorage.getItem('selectedMetrics'))

const initialState = {
    showWeekChart: true,
    showDailyChart: true,
    showOptimizationChart: true,
    selectedProduct: null,
    selectedRangeDate: {
        startDate: moment().add(-29, 'days'),
        endDate: moment()
    },
    allMetrics: metricsListArray,
    activeMetrics: metricsFromLocalStorage ? metricsFromLocalStorage.slice(0, 2) : metricsListArray.slice(0, 2),
    selectedMetrics: metricsFromLocalStorage ? metricsFromLocalStorage : metricsListArray.slice(0, 5)
}

export function dashboard(state = initialState, action) {
    switch (action.type) {
        case dashboardConstants.SWITCH_WEEK_CHART:
            return {
                ...state,
                showWeekChart: action.payload,
                // showDailyChart: (state.showWeekChart && !state.showDailyChart) ? true : state.showDailyChart
            }

        case dashboardConstants.SWITCH_DAILY_CHART:
            return {
                ...state,
                showDailyChart: action.payload,
                // showWeekChart: (state.showDailyChart && !state.showWeekChart) ? true : state.showWeekChart
            }

        case dashboardConstants.SWITCH_OPTIMIZATION_CHART:
            return {
                ...state,
                showOptimizationChart: action.payload,
                // showWeekChart: (state.showDailyChart && !state.showWeekChart) ? true : state.showWeekChart
            }

        case dashboardConstants.REMOVE_SELECTED_METRIC: {
            const newMetricList = state.selectedMetrics.filter(item => item.key !== action.payload.key),
                newActiveMetricsList = state.activeMetrics.map(item => item.key !== action.payload.key && item)

            if (newMetricList.length > 0) {
                if (!newActiveMetricsList[0].key && (newMetricList[0].key !== newActiveMetricsList[1].key)) {
                    newActiveMetricsList[0] = newMetricList[0]
                } else if (!newActiveMetricsList[0].key && (newMetricList[0].key === newActiveMetricsList[1].key)) {
                    newActiveMetricsList[0] = newMetricList[1] ? newMetricList[1] : {}
                } else if (!newActiveMetricsList[1].key && (newMetricList[0].key !== newActiveMetricsList[0].key)) {
                    newActiveMetricsList[1] = newMetricList[0]
                } else if (!newActiveMetricsList[1].key && (newMetricList[0].key === newActiveMetricsList[0].key)) {
                    newActiveMetricsList[1] = newMetricList[1] ? newMetricList[1] : {}
                }
            } else {
                newActiveMetricsList[0] = {}
                newActiveMetricsList[1] = {}
            }

            localStorage.setItem('selectedMetrics', JSON.stringify(newMetricList))

            if (JSON.stringify(state.activeMetrics) !== JSON.stringify(newActiveMetricsList)) {
                return {
                    ...state,
                    selectedMetrics: newMetricList,
                    activeMetrics: newActiveMetricsList
                }
            } else {
                return {
                    ...state,
                    selectedMetrics: newMetricList,
                }
            }
        }

        case dashboardConstants.SET_METRICS_STATISTIC:
            return {
                ...state,
                allMetrics: metricsListArray.map(item => ({
                    ...item,
                    ...(action.payload && action.payload.length > 0 && action.payload.find(metric => metric.metric_key === item.key))
                })),
                selectedMetrics: state.selectedMetrics.map(item => ({
                    ...item,
                    ...metricsListArray.find(metric => metric.key === item.metric_key) || {},
                    ...action.payload.find(metric => metric.metric_key === item.key) || {}
                }))
            }

        case dashboardConstants.UPDATE_METRICS_LIST: {
            let newActiveMetricsList = [...state.activeMetrics]

            if (action.payload.length > 0) {
                if (action.payload.find(item => item.key === state.activeMetrics[0].key) === undefined &&
                    action.payload.find(item => item.key === state.activeMetrics[1].key) === undefined) {
                    newActiveMetricsList = action.payload.slice(0, 2)
                } else if (action.payload.find(item => item.key === state.activeMetrics[0].key) === undefined
                    && action.payload.find(item => item.key === state.activeMetrics[1].key) !== undefined
                    && action.payload[0].key !== state.activeMetrics[1].key) {
                    newActiveMetricsList[0] = action.payload[0]
                } else if (action.payload.find(item => item.key === state.activeMetrics[0].key) === undefined
                    && action.payload.find(item => item.key === state.activeMetrics[1].key) !== undefined
                    && action.payload[0].key === state.activeMetrics[1].key) {
                    newActiveMetricsList[0] = action.payload[1] ? action.payload[1] : {}
                } else if (action.payload.find(item => item.key === state.activeMetrics[1].key) === undefined
                    && action.payload.find(item => item.key === state.activeMetrics[0].key) !== undefined
                    && action.payload[0].key !== state.activeMetrics[0].key) {
                    newActiveMetricsList[1] = action.payload[0]
                } else if (action.payload.find(item => item.key === state.activeMetrics[1].key) === undefined
                    && action.payload.find(item => item.key === state.activeMetrics[0].key) !== undefined
                    && action.payload[0].key === state.activeMetrics[0].key) {
                    newActiveMetricsList[1] = action.payload[1] ? action.payload[1] : {}
                }
            } else {
                newActiveMetricsList[0] = {}
                newActiveMetricsList[1] = {}
            }

            localStorage.setItem('selectedMetrics', JSON.stringify(action.payload))

            if (JSON.stringify(state.activeMetrics) !== JSON.stringify(newActiveMetricsList)) {
                return {
                    ...state,
                    selectedMetrics: action.payload,
                    activeMetrics: newActiveMetricsList
                }
            } else {
                return {
                    ...state,
                    selectedMetrics: action.payload,
                }
            }
        }

        case dashboardConstants.SELECT_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload === state.selectedProduct ? null : action.payload
            }

        case dashboardConstants.SELECTED_RANGE_DATE:
            return {
                ...state,
                selectedRangeDate: action.payload
            }

        case dashboardConstants.ACTIVATE_METRIC:
            let newActiveMetrics = [...state.activeMetrics]
            if (!newActiveMetrics[0].key) {
                metricClickCount = 1

                newActiveMetrics[0] = action.payload
                return {
                    ...state,
                    activeMetrics: newActiveMetrics
                }
            } else if (!newActiveMetrics[1].key) {
                metricClickCount = 0

                newActiveMetrics[1] = action.payload
                return {
                    ...state,
                    activeMetrics: newActiveMetrics
                }
            } else {
                metricClickCount++

                newActiveMetrics[(metricClickCount & 1) ? 0 : 1] = action.payload
                return {
                    ...state,
                    activeMetrics: newActiveMetrics
                }
            }

        case dashboardConstants.DEACTIVATE_METRIC:
            let countActiveMetrics = state.activeMetrics.map(item => item.key).filter(str => str)
            if (countActiveMetrics.length === 1) metricClickCount = 0

            return {
                ...state,
                activeMetrics: state.activeMetrics.map(item => item.key === action.payload.key ? {} : item)
            }

        case dashboardConstants.RE_SET:
            return {
                ...initialState
            }

        case dashboardConstants.SET_PRODUCTS_MARGIN_STATUS:
            return {
                ...state,
                hasMargin: action.payload
            }


        default:
            return state
    }
}
