import {analyticsConstants} from '../constans/actions.type'
import {analyticsServices} from "../services/analytics.services"

export const analyticsActions = {
    setMainState,
    setChartState,
    setDateRange,
    setLocation,
    updateMetricsState,
    setMetricsData,
    updateFiltersList,
    switchChartView,
    expandWorkplace,
    setSegmentValue,
    setStateDetails,
    setSortingColumn,
    setVisibleCreateWindow,
    setPortfolioList,
    setAttributionWindow,

    setCompareDate,
    setTableOptions
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

function setCompareDate(date) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_COMPARE_DATE_RANGE,
            payload: date
        })
    }
}

function setTableOptions(date) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_TABLE_OPTIONS,
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

function setMetricsData(data) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_METRICS_DATA,
            payload: data
        })
    }
}

function updateFiltersList(filters) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_FILTERS_LIST,
            payload: filters
        })
    }
}

function switchChartView(value) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_CHART_VIEW,
            payload: value
        })
    }
}

function expandWorkplace(value) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_WORKPLACE_VIEW,
            payload: value
        })
    }
}

function setSegmentValue(value) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_SEGMENT_VALUE,
            payload: value
        })
    }
}

function setStateDetails(data) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_STATE_DETAILS,
            payload: data
        })
    }
}

function setSortingColumn(data) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_SORTING_COLUMN,
            payload: data
        })
    }
}

function setVisibleCreateWindow(window) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_VISIBLE_CREATION_WINDOWS,
            payload: window
        })
    }
}
function setAttributionWindow(value) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_ATTRIBUTION_WINDOW,
            payload: value
        })
    }
}

function setPortfolioList() {
    return dispatch => analyticsServices.fetchPortfoliosForCampaign()
        .then(res => {
            dispatch({
                type: analyticsConstants.SET_PORTFOLIOS,
                payload: res.result
            })
        })
}
