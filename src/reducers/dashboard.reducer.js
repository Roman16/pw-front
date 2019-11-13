import {dashboardConstants} from '../constans/actions.type';
import {metricsListArray} from '../pages/PPCAutomate/Dashboard/Metrics/metricsList';
import moment from 'moment';

let metricClickCount = 0;

const initialState = {
    showWeekChart: true,
    showDailyChart: false,
    selectedProduct: '',
    selectedRangeDate: {
        startDate: moment(new Date()).subtract(1, 'months').format('YYYY-MM-DD'),
        endDate: moment(new Date()).format('YYYY-MM-DD')
    },
    allMetrics: metricsListArray,
    activeMetrics: metricsListArray.slice(0, 2),
    selectedMetrics: metricsListArray.slice(0, 5)
};

export function dashboard(state = initialState, action) {
    switch (action.type) {
        case dashboardConstants.SWITCH_WEEK_CHART:
            return {
                ...state,
                showWeekChart: !state.showWeekChart,
                // showDailyChart: (state.showWeekChart && !state.showDailyChart) ? true : state.showDailyChart
            };

        case dashboardConstants.SWITCH_DAILY_CHART:
            return {
                ...state,
                showDailyChart: !state.showDailyChart,
                // showWeekChart: (state.showDailyChart && !state.showWeekChart) ? true : state.showWeekChart
            };

        case dashboardConstants.REMOVE_SELECTED_METRIC:
            const newMetricList = state.selectedMetrics.filter(item => item.key !== action.payload.key);

            return {
                ...state,
                selectedMetrics: newMetricList,
                activeMetrics: state.activeMetrics.map(item => item.key === action.payload.key ? {} : item)
            };

        case dashboardConstants.SET_METRICS_STATISTIC:
            return {
                ...state,
                allMetrics: state.allMetrics.map(item => ({
                    ...item,
                    ...action.payload.find(metric => metric.key === item.key)
                })),
                selectedMetrics: state.selectedMetrics.map(item => ({
                    ...item,
                    ...action.payload.find(metric => metric.key === item.key)
                }))
            };

        case dashboardConstants.UPDATE_METRICS_LIST:
            return {
                ...state,
                selectedMetrics: action.payload
            };

        case dashboardConstants.SELECT_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload === state.selectedProduct ? null : action.payload
            };

        case dashboardConstants.SELECTED_RANGE_DATE:
            return {
                ...state,
                selectedRangeDate: action.payload

            };

        case dashboardConstants.ACTIVATE_METRIC:
            metricClickCount++;
            let newActiveMetrics = [...state.activeMetrics];
            newActiveMetrics[(metricClickCount & 1) ? 0 : 1] = action.payload;

            return {
                ...state,
                activeMetrics: newActiveMetrics
            };

        case dashboardConstants.DEACTIVATE_METRIC:
            let countActiveMetrics = state.activeMetrics.map(item => item.key).filter(str => str);
            if (countActiveMetrics.length === 1) metricClickCount = 0;

            return {
                ...state,
                activeMetrics: state.activeMetrics.map(item => item.key === action.payload.key ? {} : item)
            };


        default:
            return state;
    }
}
