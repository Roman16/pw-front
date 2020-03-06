import {reportsConstants} from '../constans/actions.type';
import {reportsServices} from '../services/reports.services';

export const reportsActions = {
    fetchAllReports,
    setPageSize
};

function fetchAllReports(options, cancelToken) {
    const infinityScrollCount = 20;

    return dispatch => {
        dispatch({
            type: reportsConstants.START_FETCH_REPORTS_LIST,
        });

        reportsServices.getAllReports(options, cancelToken)
            .then(res => {
                // if (options.size >= 100) {
                //     Array.from({length: Math.ceil(res.data.length / infinityScrollCount + 1)}, (item, index) => index).forEach((item, index) => {
                //
                //       setTimeout(() => {
                //             dispatch({
                //                 type: reportsConstants.SET_REPORTS_LIST,
                //                 payload: {
                //                     ...res,
                //                     data: res.data.slice(index * infinityScrollCount, index * infinityScrollCount + infinityScrollCount)
                //                 }
                //             });
                //         }, (index * 200));
                //     })
                // } else {
                    dispatch({
                        type: reportsConstants.SET_REPORTS_LIST,
                        payload: res
                    });
                // }
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
