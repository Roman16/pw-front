import {reportsConstants} from '../constans/actions.type';
import {reportsServices} from '../services/reports.services';

export const reportsActions = {
    fetchAllReports,
    setPageSize
};

function fetchAllReports(options, cancelToken) {
    return dispatch => {
        dispatch({
            type: reportsConstants.START_FETCH_REPORTS_LIST,
        });

        reportsServices.getAllReports(options, cancelToken)
            .then(res => {

                if (res.data.length === 0) {
                    dispatch({
                        type: reportsConstants.SET_REPORTS_LIST,
                        payload: res
                    });
                } else if (options.pageSize >= 100) {
                    [0, 1].forEach((item, index) => {
                        setTimeout(() => {
                            dispatch({
                                type: reportsConstants.SET_REPORTS_LIST,
                                payload: {
                                    ...res,
                                    data: res.data.slice(0, item === 1 ? 200 : 20)
                                }
                            });
                        },  (500 * index));
                    })
                } else {
                    dispatch({
                        type: reportsConstants.SET_REPORTS_LIST,
                        payload: res
                    });
                }
            })
            .catch(e => {
                dispatch({
                    type: reportsConstants.SET_REPORTS_LIST,
                    payload: {
                        data: [],
                        total_size: 0,
                        today_changes: "0",
                        counts: [],
                        counts_with_new: [],
                    }
                });
            })
    };
}

function setPageSize(pageSize) {
    return dispatch => {
        dispatch({
            type: reportsConstants.SET_PAGE_SIZE,
            payload: pageSize
        });
    };
}
