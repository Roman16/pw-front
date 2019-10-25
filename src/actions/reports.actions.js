import {reportsConstants} from '../constans/actions.type';
import {reportsServices} from '../services/reports.services';

export const reportsActions = {
    fetchReports,
    fetchAllReports
};

function fetchReports(options) {
    return dispatch => {
        reportsServices.getLastReports(options.id)
            .then(res => {
                dispatch({
                    type: reportsConstants.SET_REPORTS_LIST,
                    payload: res
                });
            });
    };
}

function fetchAllReports(options) {
    return dispatch => {
        reportsServices.getAllReports(options)
            .then(res => {
                dispatch({
                    type: reportsConstants.SET_REPORTS_LIST,
                    payload: res
                });
            });
    };
}
