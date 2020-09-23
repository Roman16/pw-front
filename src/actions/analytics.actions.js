import {analyticsConstants} from '../constans/actions.type'

export const analyticsActions = {
    setMainState,
    setChartState,
    setDateRange,
    setLocation,
    updateMetricsState,
    updateMetricsData,
    updateColumnBlackList,
}

function setMainState(state) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_MAIN_STATE,
            payload: state
        })
    }
}

function setChartState(state) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_CHART_STATE,
            payload: state
        })
    }
}

function setDateRange(date) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_DATE_RANGE,
            payload: date
        })
    }
}

function setLocation(key) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_LOCATION,
            payload: key
        })
    }
}

function updateMetricsState(data) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.UPDATE_METRICS_STATE,
            payload: data
        })
    }
}

function updateMetricsData(data) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.UPDATE_METRICS_DATA,
            payload: data
        })
    }
}

function updateColumnBlackList(columnsList) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_COLUMNS_BLACK_LIST,
            payload: columnsList
        })
    }
}