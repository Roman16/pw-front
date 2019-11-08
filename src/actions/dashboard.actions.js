import {dashboardConstants} from '../constans/actions.type';

export const dashboardActions = {
    switchChart,
    removeSelectedMetric,
    updateMetricList
};

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