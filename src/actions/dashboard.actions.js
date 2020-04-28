import {dashboardConstants} from '../constans/actions.type';
import {dashboardServices} from '../services/dashboard.services'

export const dashboardActions = {
    switchChart,
    removeSelectedMetric,
    updateMetricList,
    activateMetric,
    deactivateMetric,
    selectDateRange,
    getMetricsStatistics,
    selectProduct,
    reSetDashboard,
    setProductsMarginStatus,
};

function getMetricsStatistics(parameters) {
    return dispatch => {
        dashboardServices.fetchMetricsStatistics(parameters)
            .then((res) => {
                dispatch({
                    type: dashboardConstants.SET_METRICS_STATISTIC,
                    payload: res
                });
            });
    };

}

function switchChart(type, value) {
    const switchType = `SWITCH_${type.toUpperCase()}_CHART`;

    return dispatch => {
        dispatch({
            type: dashboardConstants[switchType],
            payload: value
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

function selectProduct(id) {
    return dispatch => {
        dispatch({
            type: dashboardConstants.SELECT_PRODUCT,
            payload: id
        });
    };
}

function reSetDashboard() {
    return dispatch => {
        dispatch({
            type: dashboardConstants.RE_SET,
        });
    };
}

function setProductsMarginStatus(status) {
    return dispatch => {
        dispatch({
            type: dashboardConstants.SET_PRODUCTS_MARGIN_STATUS,
            payload: status
        });
    };
}