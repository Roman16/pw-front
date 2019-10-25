import {reportsConstants} from '../constans/actions.type';
import {reportsServices} from '../services/reports.services';

export const reportsActions = {
    fetchAllReports
};

function fetchAllReports(options) {
    return dispatch => {
        dispatch({
            type: reportsConstants.START_FETCH_REPORTS_LIST,
        });

        reportsServices.getAllReports(options)
            .then(res => {
                dispatch({
                    type: reportsConstants.SET_REPORTS_LIST,
                    payload: res
                });
            });
    };
}
