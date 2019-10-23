import {reportsConstants} from '../constans/actions.type';
import {reportsServices} from '../services/reports.services';

export const reportsActions = {
    fetchReports,
};

function fetchReports(options) {
    console.log(options);
    return dispatch => {
        options.size ? reportsServices.getAllReports() : reportsServices.getLastReports(options.id)
            .then(res => {
                dispatch({
                    type: reportsConstants.SET_REPORTS_LIST,
                    payload: res
                });
            });
    };
}