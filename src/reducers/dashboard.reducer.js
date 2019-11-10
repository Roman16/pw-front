import {dashboardConstants} from '../constans/actions.type';
import {metricsListArray} from '../pages/PPCAutomate/Dashboard/Metrics/metricsList';


const initialState = {
    showWeekChart: true,
    showDailyChart: false,
    allMetrics: metricsListArray,
    selectedMetrics: metricsListArray.slice(0,5)
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

        default:
            return state;
    }
}
