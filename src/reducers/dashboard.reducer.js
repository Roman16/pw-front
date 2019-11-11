import {dashboardConstants} from '../constans/actions.type';
import {metricsListArray} from '../pages/PPCAutomate/Dashboard/Metrics/metricsList';
import moment from 'moment';

let metricClickCount = 0;

const initialState = {
    showWeekChart: true,
    showDailyChart: false,
    selectedRangeDate: {
        startDate: moment(new Date()).subtract(1, 'months'),
        endDate: moment(new Date())
    },
    activeMetrics: metricsListArray.slice(0, 2).map(item => item.key),
    allMetrics: metricsListArray,
    selectedMetrics: metricsListArray.slice(0, 5)
};

export function dashboard(state = initialState, action) {
    switch (action.type) {
        case dashboardConstants.SWITCH_WEEK_CHART:
            return {
                ...state,
                showWeekChart: !state.showWeekChart,
                showDailyChart: (state.showWeekChart && !state.showDailyChart) ? true : state.showDailyChart
            };

        case dashboardConstants.SWITCH_DAILY_CHART:
            return {
                ...state,
                showDailyChart: !state.showDailyChart,
                showWeekChart: (state.showDailyChart && !state.showWeekChart) ? true : state.showWeekChart

            };

        case dashboardConstants.REMOVE_SELECTED_METRIC:
            const newMetricList = state.selectedMetrics.filter(item => item.key !== action.payload.key);

            return {
                ...state,
                selectedMetrics: newMetricList
            };

        case dashboardConstants.UPDATE_METRICS_LIST:
            return {
                ...state,
                selectedMetrics: action.payload
            };

        case dashboardConstants.ACTIVATE_METRIC:
            metricClickCount++;

            let newActiveMetrics = [...state.activeMetrics];
            newActiveMetrics[(metricClickCount & 1) ? 0 : 1] = action.payload;

            return {
                ...state,
                activeMetrics: newActiveMetrics
            };

        default:
            return state;
    }
}
