import {dashboardConstants, productsConstants} from '../constans/actions.type';
import {dashboardServices} from '../services/dashboard.services'

export const dashboardActions = {
    switchChart,
    removeSelectedMetric,
    updateMetricList,
    activateMetric,
    deactivateMetric,
    selectDateRange,
    getMetricsStatistics
};

function getMetricsStatistics(parameters) {
    return dispatch => {
        dashboardServices.fetchMetricsStatistics(parameters)
            .then((res) => {
                dispatch({
                    type: productsConstants.SET_METRICS_STATISTIC,
                    payload: res
                });
            });
    };

}

function switchChart(type) {
    const switchType = `SWITCH_${type.toUpperCase()}_CHART`;

    return dispatch => {
        dispatch({
            type: dashboardConstants[switchType]
        });
    };
}

function removeSelectedMetric(metric) {
    return dispatch => {
        dispatch({
            type: dashboardConstants.REMOVE_SELECTED_METRIC,
            payload: metric
        });
    };
}

function updateMetricList(metrics) {
    return dispatch => {
        dispatch({
            type: dashboardConstants.UPDATE_METRICS_LIST,
            payload: metrics
        });
    };
}

function activateMetric(metric) {
    return dispatch => {
        dispatch({
            type: dashboardConstants.ACTIVATE_METRIC,
            payload: metric
        });
    };
}

function deactivateMetric(metric) {
    return dispatch => {
        dispatch({
            type: dashboardConstants.DEACTIVATE_METRIC,
            payload: metric
        });
    };
}

function selectDateRange(dateRange) {
    return dispatch => {
        dispatch({
            type: dashboardConstants.SELECTED_RANGE_DATE,
            payload: dateRange
        });
    };
}
