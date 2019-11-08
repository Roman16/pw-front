import {dashboardConstants} from '../constans/actions.type';

const initialState = {
    showWeekChart: true,
    showDailyChart: false,
    selectedMetrics: [
        {
            key: 'impressions',
        },
        {
            key: 'clicks',
        },
        {
            key: 'ctr',
        },
        {
            key: 'spend',
        },
        {
            key: 'cpc',
        },
        {
            key: 'orders',
        },
        {
            key: 'ad_orders',
        },
        {
            key: 'organic_orders',
        },
        {
            key: 'total_sales',
        },
        {
            key: 'ad_sales',
        },
        {
            key: 'organic_sales',
        },
        {
            key: 'acos',
        },
    ]
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
